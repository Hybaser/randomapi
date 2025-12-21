import request from 'supertest';
import app from './app';

describe('Random API Integration Tests', () => {
    describe('GET /api/random', () => {
        it('should return health check status', async () => {
            const res = await request(app).get('/health');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ status: 'ok' });
        });

        it('should generate an integer', async () => {
            const res = await request(app).get('/api/random').query({ type: 'integer', min: 10, max: 20 });
            expect(res.status).toBe(200);
            expect(res.body.result).toBeGreaterThanOrEqual(10);
            expect(res.body.result).toBeLessThanOrEqual(20);
        });

        it('should generate a guid', async () => {
            const res = await request(app).get('/api/random').query({ type: 'guid' });
            expect(res.status).toBe(200);
            expect(res.body.result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        it('should generate a string', async () => {
            const res = await request(app).get('/api/random').query({ type: 'string', len: 15 });
            expect(res.status).toBe(200);
            expect(res.body.result).toHaveLength(15);
        });

        it('should generate a string from topic', async () => {
            const res = await request(app).get('/api/random').query({ topic: 'science' });
            expect(res.status).toBe(200);
            expect(typeof res.body.result).toBe('string');
        });

        it('should return error for invalid min/max', async () => {
            const res = await request(app).get('/api/random').query({ type: 'integer', min: 20, max: 10 });
            expect(res.status).toBe(400); // 400 because Service throws error caught by controller
        });

        it('should return validation error for invalid param types', async () => {
            const res = await request(app).get('/api/random').query({ type: 'integer', min: 'abc' });
            expect(res.status).toBe(400); // Zod validation error
        });

        it('should return error for missing/invalid type', async () => {
            const res = await request(app).get('/api/random');
            expect(res.status).toBe(400);
        });
    });

    describe('GET /api/random/user', () => {
        it('should return a random user object', async () => {
            const res = await request(app).get('/api/random/user');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('firstName');
            expect(res.body).toHaveProperty('lastName');
            expect(res.body).toHaveProperty('age');
            expect(res.body).toHaveProperty('email');
            expect(res.body.address).toHaveProperty('street');
            expect(res.body.address).toHaveProperty('houseNumber');
            expect(res.body.address).toHaveProperty('zipCode');
            expect(res.body.address).toHaveProperty('city');
            expect(res.body.address).toHaveProperty('country');
            expect(typeof res.body.firstName).toBe('string');
            expect(typeof res.body.lastName).toBe('string');
            expect(typeof res.body.age).toBe('number');
            expect(typeof res.body.email).toBe('string');
            expect(typeof res.body.address.street).toBe('string');
            expect(typeof res.body.address.houseNumber).toBe('number');
            expect(typeof res.body.address.zipCode).toBe('string');
            expect(typeof res.body.address.city).toBe('string');
            expect(typeof res.body.address.country).toBe('string');
        });
    });
});
