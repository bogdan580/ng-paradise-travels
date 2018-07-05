import {Hotel} from './hotel.model';

export interface Offer {
    hotel: Hotel;
    dateFrom: string;
    dateTo: string;
    name: string;
    promoted: boolean;
    description: string;
    shortDescription: string;
    id?: number;

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
