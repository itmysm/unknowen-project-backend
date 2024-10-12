import { Request, Response } from "express";
import { Product } from "../models/Product";

// Create Product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang } = req.body;

    // Ensure all required fields are provided
    if (!id || !title || !description || !slug || !image_slug || views === undefined || !categoryId || !productType || !directPath || !isMultiLang) {
      res.status(400).json({ message: "All required fields must be provided." });
      return;
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
      isMultiLang
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) }, // Query by `id`, not `_id`
      { title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
