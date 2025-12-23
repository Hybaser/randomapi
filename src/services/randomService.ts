import { v4 as uuidv4 } from 'uuid';

export class RandomService {
    private readonly topicDictionary: Record<string, string[]> = {
        science: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Genetics', 'Quantum Mechanics'],
        technology: ['Artificial Intelligence', 'Blockchain', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Robotics'],
        art: ['Impressionism', 'Surrealism', 'Cubism', 'Renaissance', 'Abstract', 'Baroque'],
        history: ['Ancient Rome', 'World War II', 'Industrial Revolution', 'The Cold War', 'The Renaissance', 'The Middle Ages'],
        nature: ['Forest', 'Ocean', 'Mountain', 'Desert', 'Rainforest', 'Savanna'],
    };

    private readonly destinations: string[] = [
        'Tokyo', 'Paris', 'New York', 'London', 'Dubai', 'Singapore', 'Barcelona', 'Rome', 'Istanbul', 'Bangkok',
        'Amsterdam', 'Sydney', 'Hong Kong', 'Los Angeles', 'Berlin', 'Madrid', 'Toronto', 'Vienna', 'Prague', 'Lisbon',
        'Dublin', 'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Reykjavik', 'Athens', 'Budapest', 'Warsaw', 'Krakow',
        'Moscow', 'St Petersburg', 'Beijing', 'Shanghai', 'Seoul', 'Osaka', 'Kyoto', 'Mumbai', 'Delhi', 'Bangalore',
        'Cairo', 'Cape Town', 'Marrakech', 'Casablanca', 'Nairobi', 'Lagos', 'Accra', 'Johannesburg', 'Buenos Aires', 'Rio de Janeiro',
        'São Paulo', 'Lima', 'Bogotá', 'Santiago', 'Mexico City', 'Cancun', 'Havana', 'San Juan', 'Vancouver', 'Montreal',
        'Seattle', 'San Francisco', 'Las Vegas', 'Miami', 'Chicago', 'Boston', 'Washington DC', 'Philadelphia', 'Denver', 'Austin',
        'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington', 'Queenstown', 'Bali', 'Phuket', 'Hanoi', 'Ho Chi Minh City',
        'Kuala Lumpur', 'Manila', 'Jakarta', 'Colombo', 'Kathmandu', 'Maldives', 'Seychelles', 'Mauritius', 'Santorini', 'Mykonos',
        'Venice', 'Florence', 'Milan', 'Naples', 'Zurich', 'Geneva', 'Brussels', 'Bruges', 'Luxembourg', 'Monaco', 'Nice', 'Lyon'
    ];

    /**
     * Generates a random integer between min and max (inclusive).
     * @param min Minimum value (default: 0)
     * @param max Maximum value (default: 100)
     * @returns Random integer
     */
    public generateInteger(min: number = 0, max: number = 100): number {
        if (min > max) {
            throw new Error('Min value cannot be greater than Max value');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random GUID/UUID (v4).
     * @returns UUID string
     */
    public generateGUID(): string {
        return uuidv4();
    }

    /**
     * Generates a random string of specified length.
     * @param length Length of the string (default: 10)
     * @param useSpecialChars Whether to include special characters (default: false)
     * @returns Random string
     */
    public generateString(length: number = 10, useSpecialChars: boolean = false): string {
        if (length < 0) {
            throw new Error('Length cannot be negative');
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allowedChars = useSpecialChars ? chars + specialChars : chars;

        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            result += allowedChars[randomIndex];
        }
        return result;
    }

    /**
     * Generates a random string based on a given topic.
     * @param topic The topic to generate a string for
     * @returns A random string related to the topic, or a generic message if topic not found.
     */
    public generateStringFromTopic(topic: string): string {
        const normalizedTopic = topic.toLowerCase();
        const words = this.topicDictionary[normalizedTopic];

        if (words && words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }

        return `No specific data for topic '${topic}'. Random word: ` + this.generateString(8);
    }

    /**
     * Generates a random flight destination city name.
     * @returns A random city name
     */
    public generateDestination(): string {
        const randomIndex = Math.floor(Math.random() * this.destinations.length);
        return this.destinations[randomIndex];
    }
}

export const randomService = new RandomService();
