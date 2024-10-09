import { Request, Response } from 'express';
import { ProductAttributes } from '../models/Products_Translations';

// Get a specific translation by parentId and lang
export const getProductTranslation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId, lang } = req.params;
    const translation = await ProductAttributes.findOne({ product_id: parseInt(parentId), lang });

    if (!translation) {
      res.status(404).json({ message: 'Translation not found' });
      return;
    }
    res.status(200).json(translation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProductTranslations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId } = req.params;
    const translations = await ProductAttributes.find({ product_id: parseInt(parentId) });
    res.status(200).json(translations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new translation for a product
export const createProductTranslation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lang, title, description, meta_keywords, meta_description, content, id } = req.body;
    const product_id = parseInt(req.params.parentId);

    if (!product_id || !lang || !title || !description) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newTranslation = new ProductAttributes({
      id,
      product_id,
      lang,
      title,
      description,
      meta_keywords,
      meta_description,
      content,
    });

    const savedTranslation = await newTranslation.save();
    res.status(201).json(savedTranslation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProductTranslation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId, lang } = req.params;
    const updatedData = req.body;

    const updatedTranslation = await ProductAttributes.findOneAndUpdate(
      { product_id: parseInt(parentId), lang },
      updatedData,
      { new: true }
    );

    if (!updatedTranslation) {
      res.status(404).json({ message: 'Translation not found' });
      return;
    }

    res.status(200).json(updatedTranslation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific translation
export const deleteProductTranslation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId, lang } = req.params;
    const deletedTranslation = await ProductAttributes.findOneAndDelete({ product_id: parseInt(parentId), lang });

    if (!deletedTranslation) {
      res.status(404).json({ message: 'Translation not found' });
      return;
    }

    res.status(200).json({ message: 'Translation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllProductTranslations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parentId } = req.params;
    await ProductAttributes.deleteMany({ product_id: parseInt(parentId) });
    res.status(200).json({ message: 'All translations deleted for product' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};