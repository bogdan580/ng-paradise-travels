import {Hotel} from './hotel.model';

export class Offer {
  constructor(
    public hotel: Hotel,
    public dateFrom: string,
    public dateTo: string,
    public name: string,
    public promoted: boolean,
    public description: string,
    public shortDescription: string,
    public id?: number
  ) {}

}
