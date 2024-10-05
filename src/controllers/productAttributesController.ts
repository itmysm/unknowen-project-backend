import { Request, Response } from 'express';
import { ProductAttributes } from '../models/Products_Translations';

// Get a specific translation by parentId and lang
export const getProductTranslation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { parentId, lang } = req.params;
    const translation = await ProductAttributes.findOne({ product_id: parseInt(parentId), lang });
    if (!translation) {
      return res.status(404).json({ message: 'Translation not found' });
    }
    return res.status(200).json(translation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllProductTranslations = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { parentId } = req.params;
    const translations = await ProductAttributes.find({ product_id: parseInt(parentId) });
    return res.status(200).json(translations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Register a new translation for a product
export const createProductTranslation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lang, title, description, meta_keywords, meta_description, content, id } = req.body;
    const product_id = parseInt(req.params.parentId);

    if (!product_id || !lang || !title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
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
    return res.status(201).json(savedTranslation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const updateProductTranslation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { parentId, lang } = req.params;
    const updatedData = req.body;

    const updatedTranslation = await ProductAttributes.findOneAndUpdate(
      { parentId: parseInt(parentId), lang },
      updatedData,
      { new: true }
    );

    if (!updatedTranslation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    return res.status(200).json(updatedTranslation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a specific translation
export const deleteProductTranslation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { parentId, lang } = req.params;
    const deletedTranslation = await ProductAttributes.findOneAndDelete({ parentId: parseInt(parentId), lang });

    if (!deletedTranslation) {
      return res.status(404).json({ message: 'Translation not found' });
    }

    return res.status(200).json({ message: 'Translation deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteAllProductTranslations = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { parentId } = req.params;
    await ProductAttributes.deleteMany({ parentId: parseInt(parentId) });
    return res.status(200).json({ message: 'All translations deleted for product' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
