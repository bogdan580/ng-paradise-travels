import {Hotel} from './hotel.model';

export class Room {
  constructor(
    public description: string,
    public numberOfTwoPersonBed: number,
    public numberOfOnePersonBed: number,
    public price: number,
    public country: string,
    public hotel: Hotel,
    public facility: number,
    public id?: number
  ) {}

}
