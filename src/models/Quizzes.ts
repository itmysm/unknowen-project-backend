import mongoose, { Schema, Document } from "mongoose";

interface IQuizzes extends Document {
  title: string;
  description: string;
  questions: object; // JSON to store the questions and options
  isTimeBased: boolean | null;
  isTimeBasedPreQuestion: number | null;
}

const quizzesSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: Object, required: true }, // JSON to store questions
  isTimeBased: { type: Boolean, default: null },
  isTimeBasedPreQuestion: { type: Number, default: null },
});

export const Quizzes = mongoose.model<IQuizzes>("Quizzes", quizzesSchema);
