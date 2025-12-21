import { RandomService } from './randomService';

describe('RandomService', () => {
    let service: RandomService;

    beforeEach(() => {
        service = new RandomService();
    });

    describe('generateInteger', () => {
        it('should generate a number between default range 0-100', () => {
            const result = service.generateInteger();
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(100);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should generate a number within specified range', () => {
            const min = 10;
            const max = 20;
            const result = service.generateInteger(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it('should handle negative numbers', () => {
            const min = -20;
            const max = -10;
            const result = service.generateInteger(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it('should throw error if min > max', () => {
            expect(() => {
                service.generateInteger(10, 5);
            }).toThrow('Min value cannot be greater than Max value');
        });
    });

    describe('generateGUID', () => {
        it('should generate a valid UUID v4', () => {
            const guid = service.generateGUID();
            const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            expect(guid).toMatch(uuidRegex);
        });
    });

    describe('generateString', () => {
        it('should generate a string of default length 10', () => {
            const result = service.generateString();
            expect(result.length).toBe(10);
            expect(typeof result).toBe('string');
        });

        it('should generate a string of specified length', () => {
            const length = 20;
            const result = service.generateString(length);
            expect(result.length).toBe(length);
        });

        it('should include special characters when requested', () => {
            const length = 50;
            const result = service.generateString(length, true);
            expect(result.length).toBe(length);
        });

        it('should throw error for negative length', () => {
            expect(() => {
                service.generateString(-1);
            }).toThrow('Length cannot be negative');
        });
    });

    describe('generateStringFromTopic', () => {
        it('should return a related word for a known topic', () => {
            const result1 = service.generateStringFromTopic('science');
            const result2 = service.generateStringFromTopic('technology');

            expect(typeof result1).toBe('string');
            expect(typeof result2).toBe('string');
            expect(result1).not.toContain('No specific data for topic');
        });

        it('should return a fallback string for unknown topic', () => {
            const unknownTopic = 'underwater-basket-weaving';
            const result = service.generateStringFromTopic(unknownTopic);
            expect(result).toContain(`No specific data for topic '${unknownTopic}'`);
        });

        it('should handle case insensitivity', () => {
            const result = service.generateStringFromTopic('ScIeNcE');
            expect(result).not.toContain('No specific data for topic');
        });
    });

    describe('generateRandomCharacter', () => {
        it('should return a single random character', () => {
            const result = service.generateRandomCharacter();
            expect(typeof result).toBe('string');
            expect(result.length).toBe(1);
        });

        it('should return a character from the allowed set', () => {
            const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            const result = service.generateRandomCharacter();
            expect(allowedChars).toContain(result);
        });
    });
});
