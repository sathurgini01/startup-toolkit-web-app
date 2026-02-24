import { Router } from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
} from "../controllers/idea.controller.js";

import { listToolkits, getToolkitById } from "../controllers/toolkit.controller.js";
import { listMentors } from "../controllers/mentor.controller.js";
import {
  createMentorRequest,
  listMentorRequests,
  updateMentorRequestStatus
} from "../controllers/mentorRequest.controller.js";

import {
  initTrackerForIdea,
  getTrackerByIdea,
  updateTrackerItem
} from "../controllers/tracker.controller.js";

import { getBusinessHome } from "../controllers/home.controller.js";

const router = Router();

// ✅ Home summary (B1)
router.get("/home", getBusinessHome);

// ✅ Idea CRUD (B2/B3/B4)
router.post("/ideas", createIdea);
router.get("/ideas", getIdeas);
router.get("/ideas/:id", getIdeaById);
router.put("/ideas/:id", updateIdea);
router.delete("/ideas/:id", deleteIdea);

// ✅ Toolkits (B6/B6.1)
router.get("/toolkits", listToolkits);
router.get("/toolkits/:toolkitId", getToolkitById);

// ✅ Mentors (B7)
router.get("/mentors", listMentors);

// ✅ Mentor Requests (B8)
router.post("/mentor-requests", createMentorRequest);
router.get("/mentor-requests", listMentorRequests);
router.put("/mentor-requests/:id", updateMentorRequestStatus);

// ✅ Tracker (B9)
router.post("/trackers/init/:ideaId", initTrackerForIdea);
router.get("/trackers", getTrackerByIdea);
router.put("/trackers/:trackerId/items/:itemId", updateTrackerItem);

export default router;