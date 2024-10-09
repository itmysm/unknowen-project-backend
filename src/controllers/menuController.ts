import { Request, Response } from "express";
import { Menu } from "../models/Menu";

// Create Menu
export const createMenu = async (req: Request, res: Response): Promise<void> => {
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
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Menus
export const getAllMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Menu by ID
export const getMenuById = async (req: Request, res: Response): Promise<void> => {
  try {
    const menuId = parseInt(req.params.id);
    const menu = await Menu.findOne({ id: menuId });

    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Menu
export const updateMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, slug, image_slug, id, parentId } = req.body;
    const menu = await Menu.findByIdAndUpdate(req.params.id, { title, description, slug, image_slug, id, parentId }, { new: true });

    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Menu
export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const menuId = parseInt(req.params.id);
    const menu = await Menu.findOne({ id: menuId });

    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};