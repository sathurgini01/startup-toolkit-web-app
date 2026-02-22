require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// Global middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Startup Toolkit Backend running ✅",
    environment: process.env.NODE_ENV,
  });
});

const PORT = process.env.PORT || 5000;

// Start server only AFTER DB connects
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();