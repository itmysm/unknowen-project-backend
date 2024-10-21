import mongoose, { Schema, Document } from "mongoose";

interface IQuizzes extends Document {
  id: number;
  title: string;
  description: string;
  questions: object; // Array to store the questions and options
  isTimeBased: boolean | null;
  isTimeBasedPreQuestion: number | null;
}

const quizzesSchema: Schema = new Schema({
  id: { type: Number, required: true },  // New ID field
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: Object, required: true }, // Array to store questions
  isTimeBased: { type: Boolean, default: null },
  isTimeBasedPreQuestion: { type: Number, default: null },
});

export const Quizzes = mongoose.model<IQuizzes>("Quizzes", quizzesSchema);