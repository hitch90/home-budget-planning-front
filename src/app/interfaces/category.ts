import {IExpanse} from './expanse';

export interface ICategory {
    id?: number;
    name: string;
    image: string;
    color?: string;
    sum?: number;
    expenses?: IExpanse[];
}
