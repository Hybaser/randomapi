import { Router } from 'express';
import { randomController } from '../controllers/randomController';
import { userService } from '../services/userService';

const router = Router();

/**
 * @swagger
 * /api/random:
 *   get:
 *     summary: Get a random value based on type or topic
 *     description: Returns a random integer, GUID, string, or a string based on a topic.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: 
 *           type: string
 *           enum: [integer, guid, string]
 *         required: false
 *         description: The type of random value to generate.
 *       - in: query
 *         name: min
 *         schema: 
 *           type: integer
 *         required: false
 *         description: Minimum value for integer generation.
 *       - in: query
 *         name: max
 *         schema: 
 *           type: integer
 *         required: false
 *         description: Maximum value for integer generation.
 *       - in: query
 *         name: len
 *         schema: 
 *           type: integer
 *         required: false
 *         description: Length of the string to generate.
 *       - in: query
 *         name: special
 *         schema: 
 *           type: boolean
 *         required: false
 *         description: Whether to include special characters in the string.
 *       - in: query
 *         name: topic
 *         schema: 
 *           type: string
 *         required: false
 *         description: A topic to generate a related string from.
 *     responses:
 *       200:
 *         description: A random value.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result: { type: string | integer }
 *       400:
 *         description: Invalid parameters or missing type.
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
router.get('/api/user', (req, res) => {
    try {
        const user = userService.getRandomUser();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
