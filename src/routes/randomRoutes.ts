import { Router } from 'express';
import { randomController } from '../controllers/randomController';
import { userService } from '../services/userService';

const router = Router();

/**
 * @swagger
 * /api/random: ... (rest of the file is unchanged)
 */
router.get('/random', randomController.getRandom.bind(randomController));

export default router;