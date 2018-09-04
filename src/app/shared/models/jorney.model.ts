import {Address} from './address.model';
import {Hotel} from './hotel.model';

export class Jorney {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public durationTimeMin: number,
    public languageGuide: string,
    public hotelsList?: Array<Hotel>,
    public id?: number
  ) {
  }

}
