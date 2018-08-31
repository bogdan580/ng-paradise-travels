import {Hotel} from './hotel.model';
import {Jorney} from './jorney.model';

export class Offer {
  constructor(public hotel: Hotel,
              public dateFrom: string,
              public dateTo: string,
              public name: string,
              public promoted: boolean,
              public description: string,
              public shortDescription: string,
              public pricePerDayPerPerson: number,
              public id?: number
  ) {
  }
}

export namespace Convert {
  export function toOffer(json: string): Offer {
    return JSON.parse(json);
  }
  export function toOffers(json: string): Offer[] {
    return JSON.parse(json);
  }
  export function ToJson(value: Offer): string {
    return JSON.stringify(value, null, 2);
  }
}
