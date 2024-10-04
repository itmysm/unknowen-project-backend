import { Request, Response } from "express";
import { Product } from "../models/Product";

// Create Product
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, title, description, slug, image_slug, views, related, categoryId, productType, directPath } = req.body;

    // Ensure all required fields are provided
    if (!id || !title || !description || !slug || !image_slug || views === undefined || !categoryId || !productType || !directPath) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const newProduct = new Product({
      id,
      title,
      description,
      slug,
      image_slug,
      views,
      related,
      categoryId,
      productType,
      directPath,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId }); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, slug, image_slug, views, related, categoryId, productType, directPath } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, slug, image_slug, views, related, categoryId, productType, directPath },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
