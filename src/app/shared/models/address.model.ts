export class Address {
  constructor(
    public address: string,
    public postalCode: string,
    public city: string,
    public region: string,
    public country: string,
    public id?: number
  ) {}

}
