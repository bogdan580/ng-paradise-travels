import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
@Component({
  selector: 'wfm-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {
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
