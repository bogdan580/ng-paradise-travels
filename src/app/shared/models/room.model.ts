import {Hotel} from './hotel.model';

export interface Room {
    description: string;
    numberOfTwoPersonBed: number;
    numberOfOnePersonBed: number;
    price: number;
    country: string;
    hotel: Hotel;
    facility: number;
    id?: number;

}
