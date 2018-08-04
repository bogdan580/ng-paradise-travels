import {Address} from './address.model';
import {Jorney} from './jorney.model';
import {ReviewModel} from './review.model';

export class Hotel {
    name: string;
    description: string;
    stars: number;
    address: Address;
    localJourneyList: Array<Jorney>;
    reviewList: Array<ReviewModel>;
    id?: number;
    constructor( name,
                 description,
                 stars,
                 address
                 ) {}
}
