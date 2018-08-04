import {Address} from './address.model';

export class Jorney {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public durationTimeMin: number,
    public languageGuide: string,
    public id?: number
  ) {
  }

}
