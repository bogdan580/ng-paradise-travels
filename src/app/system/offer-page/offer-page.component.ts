import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
import {Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'wfm-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {

  offers: Array<Offer>;
  oferty: Offer;
  public selectedId: any;
  constructor(private offersService: OffersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.
    route.
    params.
    subscribe(params => {
      console.log(params);
      this.selectedId = params;
      console.log(this.selectedId);
      console.log(this.selectedId.id);
    });
    this.getOffers();
  }
  getOffers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = Convert.toOffers(JSON.stringify(oferta));
      this.oferty = this.offers.find(item => item.id === Number(this.selectedId.id));
      console.log(this.selectedId.id);
      console.log(this.oferty);
    });
  }

}
