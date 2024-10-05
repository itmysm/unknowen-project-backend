import mongoose, { Schema, Document } from "mongoose";

interface IProductAttributes extends Document {
  id: number;
  title: string;
  description: string;
  lang: string;
  product_id: number;
  meta_keywords: string[];
  meta_description: string[];
  content: Record<string, any>;
}

const productAttributesSchema: Schema = new Schema({
  id: {type: Number, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  lang: { type: String, required: true },
  product_id: { type: Number, required: true },
  meta_keywords: { type: [String], required: true },
  meta_description: { type: [String], required: true },
  content: { type: Object, required: true }
});

export const ProductAttributes = mongoose.model<IProductAttributes>("ProductAttributes", productAttributesSchema);
