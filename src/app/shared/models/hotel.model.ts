import {Address} from './address.model';

export interface Hotel {
    name: string;
    description: string;
    stars: number;
    paddress: Address;
    id?: number;

}
