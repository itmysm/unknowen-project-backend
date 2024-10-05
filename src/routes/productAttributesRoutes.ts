import express from 'express';
import {
  getProductTranslation,
  getAllProductTranslations,
  createProductTranslation,
  updateProductTranslation,
  deleteProductTranslation,
  deleteAllProductTranslations
} from '../controllers/productAttributesController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Product Translations
 *     description: API for managing translations of products
 */

/**
 * @swagger
 * /product/translate/{parentId}/{lang}:
 *   get:
 *     summary: Get a specific product translation by productId and language
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *       - in: path
 *         name: lang
 *         schema:
 *           type: string
 *         required: true
 *         description: Language code of the translation (e.g., "en", "fr")
 *     responses:
 *       200:
 *         description: Translation found
 *       404:
 *         description: Translation not found
 */
router.get('/:parentId/:lang', getProductTranslation);

/**
 * @swagger
 * /product/translate/{parentId}:
 *   get:
 *     summary: Get all translations of a specific product
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: A list of translations for the product
 *       404:
 *         description: No translations found
 */
router.get('/:parentId', getAllProductTranslations);

/**
 * @swagger
 * /product/translate/{parentId}:
 *   post:
 *     summary: Create a new translation for a product
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               lang:
 *                 type: string
 *                 description: Language code for the translation
 *               title:
 *                 type: string
 *                 description: The translated title
 *               description:
 *                 type: string
 *                 description: The translated description
 *               meta_keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               meta_description:
 *                 type: array
 *                 items:
 *                   type: string
 *               content:
 *                 type: object
 *                 description: JSON content of the translation
 *     responses:
 *       201:
 *         description: Translation created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:parentId', createProductTranslation);

/**
 * @swagger
 * /product/translate/{parentId}/{lang}:
 *   put:
 *     summary: Update a specific product translation
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *       - in: path
 *         name: lang
 *         schema:
 *           type: string
 *         required: true
 *         description: Language code of the translation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               meta_keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               meta_description:
 *                 type: array
 *                 items:
 *                   type: string
 *               content:
 *                 type: object
 *     responses:
 *       200:
 *         description: Translation updated successfully
 *       404:
 *         description: Translation not found
 *       500:
 *         description: Internal server error
 */
router.put('/:parentId/:lang', updateProductTranslation);

/**
 * @swagger
 * /product/translate/{parentId}/{lang}:
 *   delete:
 *     summary: Delete a specific product translation
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *       - in: path
 *         name: lang
 *         schema:
 *           type: string
 *         required: true
 *         description: Language code of the translation to delete
 *     responses:
 *       200:
 *         description: Translation deleted successfully
 *       404:
 *         description: Translation not found
 */
router.delete('/:parentId/:lang', deleteProductTranslation);

/**
 * @swagger
 * /product/translate/{parentId}:
 *   delete:
 *     summary: Delete all translations for a product
 *     tags: [Product Translations]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: All translations deleted successfully
 *       404:
 *         description: No translations found
 */
router.delete('/:parentId', deleteAllProductTranslations);

export default router;
