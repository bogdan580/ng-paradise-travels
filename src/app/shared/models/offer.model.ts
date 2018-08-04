import {Hotel} from './hotel.model';
import {Jorney} from './jorney.model';

export class Offer {
    hotel: Hotel;
    dateFrom: string;
    dateTo: string;
    name: string;
    promoted: boolean;
    description: string;
    shortDescription: string;
    pricePerDayPerPerson: number;
    id?: number;
    constructor(hotel, dateFrom, dateTo, name, promoted, description, shortDescription, pricePerDayPerPerson) {}
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
