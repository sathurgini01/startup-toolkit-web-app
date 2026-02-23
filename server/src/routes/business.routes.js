import { Router } from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
} from "../controllers/idea.controller.js";

const router = Router();

// Idea CRUD
router.post("/ideas", createIdea);
router.get("/ideas", getIdeas);
router.get("/ideas/:id", getIdeaById);
router.put("/ideas/:id", updateIdea);
router.delete("/ideas/:id", deleteIdea);

export default router;