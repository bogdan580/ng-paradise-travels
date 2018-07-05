import {Address} from './address.model';
import {Jorney} from './jorney';

export interface Hotel {
    name: string;
    description: string;
    stars: number;
    address: Address;
    localJourneyList: Array<Jorney>;
    id?: number;

}
