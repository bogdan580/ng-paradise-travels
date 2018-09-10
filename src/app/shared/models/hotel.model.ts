import {Address} from './address.model';
import {Jorney} from './jorney.model';
import {ReviewModel} from './review.model';

export class Hotel {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public stars?: number,
      public address?: Address,
      public localJourneyList?: Array<Jorney>,
      public reviewList?: Array<ReviewModel>
    ) {}
}
