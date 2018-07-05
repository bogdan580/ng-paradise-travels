import {Address} from './address.model';
import {Jorney} from './jorney';
import {ReviewModel} from './review.model';

export interface Hotel {
    name: string;
    description: string;
    stars: number;
    address: Address;
    localJourneyList: Array<Jorney>;
    reviewList: Array<ReviewModel>;
    id?: number;

}
