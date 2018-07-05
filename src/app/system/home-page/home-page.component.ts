import { Component, OnInit } from '@angular/core';
import {Convert, Offer} from '../../shared/models/offer.model';
import {OffersService} from '../../shared/services/offers.service';

@Component({
  selector: 'wfm-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  offers: Offer;
  constructor(private offersService: OffersService) { }

  ngOnInit() {
    this.get2Offers();
  }
  get2Offers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      console.log(oferta);
      this.offers = Convert.toOffer(JSON.stringify(oferta));
    });
  }

}
