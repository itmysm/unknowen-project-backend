import express from 'express';
import { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu } from '../controllers/menuController';

const router = express.Router();

router.post('/menus', createMenu);
router.get('/menus', getAllMenus);
router.get('/menus/:id', getMenuById);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

export default router;
