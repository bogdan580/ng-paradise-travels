import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer} from '../../shared/models/offer.model';

@Component({
  selector: 'wfm-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {

  offers: Offer;
  constructor(private offersService: OffersService) { }

  ngOnInit() {
    this.getOffers();
  }
  getOffers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = oferta;
    });
  }

}
