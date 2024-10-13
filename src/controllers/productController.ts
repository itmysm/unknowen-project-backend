import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Menu } from "../models/Menu";

// Create Product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang, subCategories } = req.body;

    // Ensure all required fields are provided
    if (!id || !title || !description || !slug || !image_slug || views === undefined || !categoryId || !productType || !directPath || !isMultiLang || !subCategories) {
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
      isMultiLang,
      subCategories,
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
    const { title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang, subCategories } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) }, // Query by `id`, not `_id`
      { title, description, slug, image_slug, views, related, categoryId, productType, directPath, isMultiLang, subCategories },
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

// Get all products by main category and split by subcategories
export const getProductsByMainCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mainCategoryId = parseInt(req.params.categoryId);

    // Fetch all products where the main category ID matches
    const products = await Product.find({ categoryId: mainCategoryId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this main category" });
    }

    // Fetch subcategories (ids >= 100) from the Menu table
    const subCategories = await Menu.find({ id: { $gte: 100 } });

    // Create a map of subcategoryId -> subcategoryTitle
    const subcategoryMap = subCategories.reduce((acc: any, subcategory) => {
      acc[subcategory.id] = subcategory.title; // Assuming `title` is the subcategory name in Menu
      return acc;
    }, {});

    // Group products by their subcategories
    const groupedBySubcategory = products.reduce((acc: any, product) => {
      product.subCategories.forEach((subcategoryId: number) => {
        // Use the real subcategory title from the subcategoryMap
        const subcategoryTitle = subcategoryMap[subcategoryId] || `Subcategory ${subcategoryId}`;

        if (!acc[subcategoryTitle]) {
          acc[subcategoryTitle] = [];
        }
        acc[subcategoryTitle].push(product);
      });

      return acc;
    }, {});

    // Send the grouped products in the response
    return res.status(200).json(groupedBySubcategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
