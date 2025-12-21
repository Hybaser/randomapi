import { Router } from 'express';
import { randomController } from '../controllers/randomController';
import { userService } from '../services/userService';

const router = Router();

/**
 * @swagger
 * /api/random: ... (rest of the file is unchanged)
 */
router.get('/random', randomController.getRandom.bind(randomController));

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
