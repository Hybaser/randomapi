import { Router } from 'express';
import { randomController } from '../controllers/randomController';

const router = Router();

/**
 * @swagger
 * /api/random:
 *   get:
 *     summary: Generate random values
 *     description: Generate random integers, GUIDs, strings, or topic-based strings based on query parameters
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [integer, guid, string]
 *         description: Type of random value to generate (optional if topic is provided)
 *       - in: query
 *         name: min
 *         schema:
 *           type: integer
 *         description: Minimum value for integer generation
 *       - in: query
 *         name: max
 *         schema:
 *           type: integer
 *         description: Maximum value for integer generation
 *       - in: query
 *         name: len
 *         schema:
 *           type: integer
 *         description: Length of random string
 *       - in: query
 *         name: special
 *         schema:
 *           type: boolean
 *         description: Include special characters in random string
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Topic to generate a related string for
 *     responses:
 *       200:
 *         description: Successful generation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: The generated value (number or string)
 *       400:
 *         description: Bad request (invalid parameters)
 */
router.get('/random', randomController.getRandom.bind(randomController));

/**
 * @swagger
 * /api/time/utc:
 *   get:
 *     summary: Get current UTC time
 *     description: Returns the current date and time in UTC format.
 *     responses:
 *       200:
 *         description: Current UTC time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utc_time:
 *                   type: string
 *                   format: date-time
 *                   description: The current UTC time.
 */
router.get('/time/utc', randomController.getUtcTime.bind(randomController));

export default router;
