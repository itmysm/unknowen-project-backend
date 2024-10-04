import mongoose, { Schema, Document } from "mongoose";

interface IMenu extends Document {
  id: number;
  title: string;
  description?: string;
  slug: string;
  image_slug?: string;
  parentId: number;
}

const menuSchema: Schema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  image_slug: { type: String, required: true },
  parentId: { type: Number, required: true },
});

export const Menu = mongoose.model<IMenu>("Menu", menuSchema);
