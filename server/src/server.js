import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { seedIfEmpty } from "./config/seed.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Start server with proper async handling
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB Connected ✅");

    // Seed default toolkits & mentors if empty
    await seedIfEmpty();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 🚀`);
    });

  } catch (error) {
    console.error("Server startup failed ❌:", error.message);
    process.exit(1);
  }
};

startServer();