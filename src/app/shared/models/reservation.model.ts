import {Room} from './room.model';
import {User} from './user.model';
import {Offer} from './offer.model';

export interface Reservation {

    room: Room;
    user: User;
    offer: Offer;
    numberOfOnePersonBed: number;
    numberOfTwoPersonBed: number;
    dateFrom: Date;
    dateTo: Date;
    price: number;
    priceTotal: number;
    reservationStatus: string;
    id?: number;
    pepoleCount: number;
}
export namespace Convert {
  export function toReservation(json: string): Reservation {
    return JSON.parse(json);
  }
  export function toReservations(json: string): Reservation[] {
    return JSON.parse(json);
  }
  export function ToJson(value: Reservation): string {
    return JSON.stringify(value, null, 2);
  }
}
