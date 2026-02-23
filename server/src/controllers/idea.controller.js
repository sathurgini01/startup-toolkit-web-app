import Idea from "../models/ideaModel.js";

// Create
export const createIdea = async (req, res) => {
  const idea = await Idea.create(req.body);
  res.status(201).json(idea);
};

// Get All
export const getIdeas = async (req, res) => {
  const ideas = await Idea.find().sort({ createdAt: -1 });
  res.json(ideas);
};

// Get One
export const getIdeaById = async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  res.json(idea);
};

// Update
export const updateIdea = async (req, res) => {
  const idea = await Idea.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(idea);
};

// Delete
export const deleteIdea = async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  res.json({ message: "Idea deleted" });
};