import { Request, Response } from "express";
import { Quizzes } from "../models/Quizzes";

// Get all quizzes
export const getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await Quizzes.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific quiz by ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId = parseInt(req.params.id); // Parse the ID as a number
    const quiz = await Quizzes.findOne({ id: quizId }); // Query using the custom "id" field

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title, description, questions, isTimeBased, isTimeBasedPreQuestion } = req.body;

    const newQuiz = new Quizzes({
      id,  // New ID field
      title,
      description,
      questions,
      isTimeBased,
      isTimeBasedPreQuestion,
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId = parseInt(req.params.id); // Parse the ID as a number
    const { title, description, questions, isTimeBased, isTimeBasedPreQuestion } = req.body;

    const updatedQuiz = await Quizzes.findOneAndUpdate(
      { id: quizId }, // Query using the custom "id" field
      { title, description, questions, isTimeBased, isTimeBasedPreQuestion },
      { new: true }
    );

    if (!updatedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId = parseInt(req.params.id); // Parse the ID as a number
    const deletedQuiz = await Quizzes.findOneAndDelete({ id: quizId }); // Query using the custom "id" field

    if (!deletedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
