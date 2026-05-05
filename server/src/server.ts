import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { client as supabase } from "./supabase/client";
import { ClerkData, ReviewData } from "./types/types";

dotenv.config();

// Defining the Express.js
const apiUrl = process.env.API_URL || "http://localhost:8000";
const app = express();
const upload = multer();

// Middleware for processing data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health checking route for the services
app.get("/", async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.storage.getBucket("images");
        const response: AxiosResponse<any, any, {}> = await axios.get(`${apiUrl}/`);
        let dbStatus: string = (error) ? "DB is currently down!" : "DB is running healthy!";

        return res.status(200).json({
            "serverMessage": "Server is running",
            "dbMessage": dbStatus,
        });
    } catch (error) {
        console.log("Error checking Main Server, API, and DB.");
        return res.sendStatus(500);
    }
});

// Webhook user data sending to Supabase
app.post("/clerk", async (req: Request, res: Response) => {
    try {
        const clerkData: ClerkData = req.body;

        // User created
        if (clerkData.eventType === "user.created") {
            const { data, error } = await supabase.from("users").insert({
                id: clerkData.id,
                first_name: clerkData.first_name,
                last_name: clerkData.last_name,
                email: clerkData.email,
                image_url: clerkData.image_url,
            });

            if (error) {
                console.log("Error creating user: ", error);
                return res.sendStatus(500);
            } else {
                console.log("User created successfully.");
                return res.sendStatus(201);
            }
        }

        // User updated
        if (clerkData.eventType === "user.updated") {
            const { data, error } = await supabase.from("users").update({
                first_name: clerkData.first_name,
                last_name: clerkData.last_name,
                image_url: clerkData.image_url,
            }).eq("id", clerkData.id);

            if (error) {
                console.log("Error updating user: ", error);
                return res.sendStatus(500);
            } else {
                console.log("User updated successfully.");
                return res.sendStatus(200);
            }
        }

        // User deleted
        if (clerkData.eventType === "user.deleted") {
            const { data, error } = await supabase.from("users").delete().eq("id", clerkData.id);

            if (error) {
                console.log("Error deleting user: ", error);
                return res.sendStatus(500);
            } else {
                console.log("User deleted succeessfully.");
                return res.sendStatus(200);
            }
        }
    } catch (error) {
        console.log("Error storing the user data using Webhook");
        return res.sendStatus(500);
    }
});

// Uploading the image the Supabase storage
app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const file = req.file;

        // File not found
        if (!file) {
            console.log("File not found!");
            return res.sendStatus(500);
        }

        // Uploading the image to Supabase
        const fileName = `${Date.now()}-${file!.originalname}`;
        const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, file!.buffer!, {
                contentType: file!.mimetype,
            })

        if (error) {
            console.log("File uploading failed!", error);
            return res.sendStatus(500);
        }

        // Getting the public URL of the image
        const publicUrl: string = supabase.storage
            .from("images")
            .getPublicUrl(data.path).data.publicUrl;

        // Getting the processed output from the VeriFace API
        const response: AxiosResponse<any, any, {}> = await axios.post(
            `${apiUrl}/predict`, { publicUrl: publicUrl }
        )

        return res.status(200).json({
            message: response.data.message,
            class: response.data.class,
            confidence: response.data.confidence,
            url: publicUrl,
        });
    } catch (error) {
        console.log("Error uploading the image to Storage");
        return res.sendStatus(500);
    }
});

// Registering the review given by the logged-in users
app.post("/review", async (req: Request, res: Response) => {
    const reviewData: ReviewData = req.body;
    const {data, error} = await supabase.from("reviews").insert({
        name: reviewData.name,
        profession: reviewData.profession,
        place: reviewData.place,
        review: reviewData.review,
    });

    if (error) {
        console.log("Error registering the review: ", error);
        return res.sendStatus(500);
    } else {
        console.log("Review recorded successfully.");
        return res.sendStatus(201);
    }
});

export default app;