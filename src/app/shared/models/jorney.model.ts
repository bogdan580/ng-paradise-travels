import {PojoNumberModel} from './pojoModels/pojoNumber.model';
import {Hotel} from './hotel.model';

export class Jorney {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public durationTimeMin: number,
    public languageGuide: string,
    public hotel?: Hotel,
    public id?: number
  ) {
  }

}
