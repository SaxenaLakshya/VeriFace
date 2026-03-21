import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { client as supabase } from "./supabase/client";
import { ClerkData } from "./types/types";

// Defining the Express.js
const app = express();

// Middleware for processing data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health checking route for the services
app.get("/", async (req: Request, res: Response) => {
    const { data, error } = await supabase.storage.getBucket("images");
    let dbStatus: string = (error) ? "DB is currently down!" : "DB is running healthy!";

    res.json({
        "serverMessage": "Server is running",
        "dbMessage": dbStatus,
    }).sendStatus(200);
});

// Webhook user data sending to Supabase
app.post("/clerk", async (req: Request, res: Response) => {
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
            res.sendStatus(500);
        } else {
            console.log("User created successfully.");
            res.sendStatus(201);
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
            res.sendStatus(500);
        } else {
            console.log("User updated successfully.");
            res.sendStatus(200);
        }
    }

    // User deleted
    if (clerkData.eventType === "user.deleted") {
        const { data, error } = await supabase.from("users").delete().eq("id", clerkData.id);

        if (error) {
            console.log("Error deleting user: ", error);
            res.sendStatus(500);
        } else {
            console.log("User deleted succeessfully.");
            res.sendStatus(200);
        }
    }
});

export default app;