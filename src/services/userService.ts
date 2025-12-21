import { randomService } from './randomService';

interface User {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    address: {
        street: string;
        houseNumber: number;
        zipCode: string;
        city: string;
        country: string;
    };
}

export class UserService {
    private readonly firstNames: string[] = [
        'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia',
        'Kevin', 'Laura', 'Michael', 'Nora', 'Oliver', 'Penelope', 'Quentin', 'Rachel', 'Steven', 'Tina'
    ];

    private readonly lastNames: string[] = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
    ];

    private readonly cities: string[] = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
        'London', 'Paris', 'Tokyo', 'Berlin', 'Rome', 'Madrid', 'Moscow', 'Beijing', 'Sydney', 'Rio de Janeiro'
    ];

    private readonly countries: string[] = [
        'USA', 'Canada', 'UK', 'France', 'Germany', 'Italy', 'Spain', 'Russia', 'China', 'Japan', 'Australia', 'Brazil'
    ];

    private getRandomElement<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private generateEmail(firstName: string, lastName: string): string {
        return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    }

    private generateAddress(city: string, country: string): {
        street: string;
        houseNumber: number;
        zipCode: string;
        city: string;
        country: string;
    } {
        const streetName = this.getRandomElement(['Main St', 'Oak Ave', 'Pine Ln', 'Maple Dr', 'Elm St', 'Cedar Rd']);
        const houseNumber = randomService.generateInteger(1, 999);
        const zipCode = randomService.generateString(5, false);

        return {
            street: streetName,
            houseNumber,
            zipCode,
            city,
            country
        };
    }

    public getRandomUser(): User {
        const firstName = this.getRandomElement(this.firstNames);
        const lastName = this.getRandomElement(this.lastNames);
        const age = randomService.generateInteger(18, 80);
        const email = this.generateEmail(firstName, lastName);
        const city = this.getRandomElement(this.cities);
        const country = this.getRandomElement(this.countries);

        return {
            firstName,
            lastName,
            age,
            email,
            address: this.generateAddress(city, country)
        };
    }
}

export const userService = new UserService();
