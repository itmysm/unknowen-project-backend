import { Request, Response } from "express";
import { Quizzes } from "../models/Quizzes";

// Get all quizzes
export const getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await Quizzes.find();
    res.status(200).json(quizzes);
    return
  } catch (err) {
    res.status(500).json({ message: err.message });
    return
  }
};

// Get a specific quiz by ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId = req.params.id;
    const quiz = await Quizzes.findById(quizId);

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return
    }
    res.status(200).json(quiz);
    return
  } catch (err) {
    res.status(500).json({ message: err.message });
    return
  }
};

// Create a new quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, questions, isTimeBased, isTimeBasedPreQuestion } = req.body;

    const newQuiz = new Quizzes({
      title,
      description,
      questions,
      isTimeBased,
      isTimeBasedPreQuestion,
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
    return
  }
  catch (err) {
    res.status(500).json({ message: err.message });
    return
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, questions, isTimeBased, isTimeBasedPreQuestion } = req.body;

    const updatedQuiz = await Quizzes.findByIdAndUpdate(
      req.params.id,
      { title, description, questions, isTimeBased, isTimeBasedPreQuestion },
      { new: true }
    );

    if (!updatedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return
    }

    res.status(200).json(updatedQuiz);
    return
  } catch (err) {
    res.status(500).json({ message: err.message });
    return
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedQuiz = await Quizzes.findByIdAndDelete(req.params.id);

    if (!deletedQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return
    }

    res.status(200).json({ message: "Quiz deleted" });
    return
  } catch (err) {
    res.status(500).json({ message: err.message });
    return
  }
};
