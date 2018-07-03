import {Address} from './address.model';

export class Hotel {
  constructor(
    public name: string,
    public description: string,
    public stars: number,
    public address: Address,
    public id?: number
  ) {}

}
