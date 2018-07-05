import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'wfm-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {

  offers: Array<Offer>;
  oferty: Offer;
  public id: number;
  constructor(private offersService: OffersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
      });
    this.getOffers(this.id);
  }
  getOffers(id: number): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = Convert.toOffers(JSON.stringify(oferta));
      this.oferty = this.offers.find(item => item.id === 1);
      console.log(this.oferty);
    });
  }

}
