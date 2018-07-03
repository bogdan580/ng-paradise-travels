import {Room} from './room.model';
import {User} from './user.model';
import {Offer} from './offer.model';

export class Reservation {
  constructor(
    public room: Room,
    public user: User,
    public offer: Offer,
    public name: string,
    public dateFrom: string,
    public dateTo: string,
    public price: number,
    public status: string,
    public id?: number
  ) {}

}
