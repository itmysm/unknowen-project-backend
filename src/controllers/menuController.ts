import { Request, Response } from "express";
import { Menu } from "../models/Menu";

// Create Menu
export const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, slug, image_slug, parentId, id } = req.body;
    const newMenu = new Menu({
      id,
      title,
      description,
      slug,
      image_slug,
      parentId,
    });
    const savedMenu = await newMenu.save();
    return res.status(201).json(savedMenu); // Explicitly returning the response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get All Menus
export const getAllMenus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menus = await Menu.find();
    return res.json(menus); // Explicitly returning the response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get Menu by ID
export const getMenuById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    return res.json(menu); // Explicitly returning the response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update Menu
export const updateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, slug, image_slug, id, parentId } = req.body;
    const menu = await Menu.findByIdAndUpdate(req.params.id, { title, description, slug, image_slug, id, parentId }, { new: true });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    return res.json(menu);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Menu
export const deleteMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    return res.json({ message: "Menu deleted" }); // Explicitly returning the response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
