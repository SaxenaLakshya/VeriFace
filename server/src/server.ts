import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { client as supabase } from "./supabase/client";

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
        "status": 200,
    });
});

export default app;