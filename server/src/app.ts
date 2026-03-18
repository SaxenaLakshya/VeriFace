import express, { Express } from "express";
import routes from "./routes";

const app: Express = express();

// Middleware
app.use(express.json());

export default app;