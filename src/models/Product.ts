import { ProductTypes } from "@/types/shared";
import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  id: number;
  title: string;
  description: string;
  slug: string;
  image_slug: string;
  views: number;
  related?: [];
  categoryId: number;
  productType: ProductTypes;
  directPath: string;
}

const productSchema: Schema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  image_slug: { type: String, required: true },
  views: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  productType: { type: String, required: true },
  related: { type: Array },
  directPath: {type: String}
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
