import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import businessRoutes from "./routes/business.routes.js";

import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/business", businessRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;