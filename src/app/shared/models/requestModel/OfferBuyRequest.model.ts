export class OfferBuyRequestModel {
  constructor(
    public localJourneyIds: Array<number>,
    public hotelId: number,
    public from: Date,
    public to: Date,
    public numberOfCustomers: number,
    public numberOfOnePersonBed: number,
    public numberOfTwoPersonBed: number
  ) {}

}
