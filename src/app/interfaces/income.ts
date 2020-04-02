import { ICategory } from './category';

export interface IIncome {
    name: string;
    description: string;
    category: ICategory;
    image: string;
    value: number;
    currency: string;
    account: object;
    date: string;
}
