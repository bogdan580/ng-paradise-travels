import {Room} from './room.model';
import {User} from './user.model';
import {Offer} from './offer.model';

export interface Reservation {

    room: Room;
    user: User;
    offer: Offer;
    name: string;
    dateFrom: string;
    dateTo: string;
    pprice: number;
    status: string;
    id?: number;

}
