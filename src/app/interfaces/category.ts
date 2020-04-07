import { IExpanse } from './expanse';

export interface ICategory {
    type?: string;
    id?: number;
    name: string;
    image: string;
    color?: string;
    sum?: number;
    expenses?: IExpanse[];
    expensesSum?: number;
    children?: ICategory[];
    parent?: ICategory;
}
