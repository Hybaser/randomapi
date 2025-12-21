import { Router } from 'express';
import { randomController } from '../controllers/randomController';
import { userService } from '../services/userService';

const router = Router();

/**
 * @swagger
 * /api/random:
 *   get:
 *     summary: Get random data
 *     description: Returns random data based on query parameters. Supports generating integers, GUIDs, strings, or data from a topic.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: 
 *           type: string
 *         description: The type of random data to generate. Supported values: 'integer', 'guid', 'string'.
 *       - in: query
 *         name: min
 *         schema: 
 *           type: integer
 *         description: Minimum value for integer generation (inclusive).
 *       - in: query
 *         name: max
 *         schema: 
 *           type: integer
 *         description: Maximum value for integer generation (inclusive).
 *       - in: query
 *         name: len
 *         schema: 
 *           type: integer
 *         description: Length of the string to generate.
 *       - in: query
 *         name: special
 *         schema: 
 *           type: boolean
 *         description: Whether to include special characters in the generated string.
 *       - in: query
 *         name: topic
 *         schema: 
 *           type: string
 *         description: Generate data related to a specific topic.
 *     responses:
 *       200:
 *         description: Random data generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result: 
 *                   type: ["string", "integer", "object"]
 *       400:
 *         description: Invalid or missing parameters.
 */
router.get('/api/random', randomController.getRandom.bind(randomController));

/**
 * @swagger
 * /api/random/user:
 *   get:
 *     summary: Get a random user
 *     description: Returns a realistic random user object.
 *     responses:
 *       200:
 *         description: A random user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName: { type: string }
 *                 lastName: { type: string }
 *                 age: { type: integer }
 *                 email: { type: string }
 *                 address:
 *                   type: object
 *                   properties:
 *                     street: { type: string }
 *                     houseNumber: { type: integer }
 *                     zipCode: { type: string }
 *                     city: { type: string }
 *                     country: { type: string }
 */
router.get('/api/random/user', (req, res) => {
    try {
        const user = userService.getRandomUser();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
