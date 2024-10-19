import express from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Quizzes
 *     description: Quiz management API
 */

/**
 * @swagger
 * /quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: A list of quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 */
router.get("/", getAllQuizzes);

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to fetch
 *     responses:
 *       200:
 *         description: Quiz object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Quiz not found
 */
router.get("/:id", getQuizById);

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       201:
 *         description: Quiz created successfully
 */
router.post("/", createQuiz);

/**
 * @swagger
 * /quizzes/{id}:
 *   put:
 *     summary: Update a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 */
router.put("/:id", updateQuiz);

/**
 * @swagger
 * /quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to delete
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 */
router.delete("/:id", deleteQuiz);

export default router;
