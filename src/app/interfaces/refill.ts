import { ICategory } from './category';

export interface IRefill {
    name: string;
    description: string;
    category: ICategory;
    image: string;
    value: number;
    unitValue: number;
    mileage: number;
    fuel: number;
    car: string;
    currency: string;
    account: object;
    date: string;
}
