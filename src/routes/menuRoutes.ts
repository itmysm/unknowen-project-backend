import express from "express";
import { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu } from "../controllers/menuController";

const router = express.Router();

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get all menus
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get("/menus", getAllMenus);

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Create a new menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu created successfully
 */
router.post("/menus", createMenu);

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Get menu by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to fetch
 *     responses:
 *       200:
 *         description: Menu object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 */
router.get("/menus/:id", getMenuById);

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Update a menu
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *       404:
 *         description: Menu not found
 */
router.put("/menus/:id", updateMenu);

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu to delete
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *       404:
 *         description: Menu not found
 */
router.delete("/menus/:id", deleteMenu);

export default router;
