import express from "express";
import bodyParser from "body-parser";
import { client as supabase } from "./client.js";

// Defining the PORT and Express.js
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware for processing the data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health checking route for the services
app.get("/", async (req, res) => {
    const { data, error } = await supabase.storage.getBucket("images");
    let dbStatus = (error) ? "DB is currently down!" : "DB is running healthy!";

    res.json({
        "serverMessage": "Server is running",
        "dbMessage": dbStatus,
        "status": 200,
    });
});

// Uploading and sending the image to Supabase Storage
app.post("/upload", (req, res) => {
    console.log(req.body);
    res.json({
        "message": "Image received successfully!",
        "status": 200,
    });
});

// Making the API alive
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});