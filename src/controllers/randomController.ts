import { Request, Response } from 'express';
import { randomService } from '../services/randomService';
import { z } from 'zod';

// Define Zod schemas for validation
const integerSchema = z.object({
    min: z.string().transform(Number).pipe(z.number()).optional(),
    max: z.string().transform(Number).pipe(z.number()).optional(),
    type: z.literal('integer'),
});

const stringSchema = z.object({
    len: z.string().transform(Number).pipe(z.number().min(0)).optional(),
    special: z.string().transform((val) => val === 'true').optional(),
    type: z.literal('string'),
});

const topicSchema = z.object({
    topic: z.string().min(1),
    type: z.literal('topic'), // Optional, but can be inferred if topic is present
});

const guidSchema = z.object({
    type: z.literal('guid'),
});

export class RandomController {
    public getRandom(req: Request, res: Response): void {
        try {
            const type = req.query.type as string;

            // Handle topic based generation (can be separate from type if needed, but requirements say if topic is given)
            if (req.query.topic) {
                const result = randomService.generateStringFromTopic(req.query.topic as string);
                res.json({ result });
                return;
            }

            switch (type) {
                case 'integer': {
                    const params = integerSchema.parse({ ...req.query, type: 'integer' });
                    const result = randomService.generateInteger(params.min, params.max);
                    res.json({ result });
                    return;
                }
                case 'guid': {
                    const result = randomService.generateGUID();
                    res.json({ result });
                    return;
                }
                case 'string': {
                    const params = stringSchema.parse({ ...req.query, type: 'string' });
                    const result = randomService.generateString(params.len, params.special);
                    res.json({ result });
                    return;
                }
                default: {
                    res.status(400).json({
                        error: 'Invalid or missing type parameter. Supported types: integer, guid, string. Or provide a topic parameter.'
                    });
                    return;
                }
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues });
                return;
            }
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export const randomController = new RandomController();
