import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import businessRoutes from "./routes/business.routes.js";

import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --------------------
// Static files (Toolkit downloads)
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve files inside: server/public as /downloads/*
app.use("/downloads", express.static(path.join(__dirname, "../public")));

// --------------------
// Health Check
// --------------------
app.get("/api/health", (req, res) => {
  res.json({ message: "API is working ✅" });
});

// --------------------
// Business Routes
// --------------------
app.use("/api/business", businessRoutes);

// --------------------
// Error Handling
// --------------------
app.use(notFound);
app.use(errorHandler);

export default app;