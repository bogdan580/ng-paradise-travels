import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'wfm-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {

  offers: Array<Offer>;

  constructor(private offersService: OffersService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  formS: FormGroup;
  ngOnInit() {
    this.getOffers();
    this.formS = new FormGroup({
      'location': new FormControl(),
      'datefrom': new FormControl(),
      'dateto': new FormControl(),
      'pricefrom': new FormControl(),
      'priceto': new FormControl()
    });
  }
  getOffers(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const location = params['location'];
      const datefrom = params['datefrom'];
      const dateto = params['dateto'];
      this.offersService.getSearch(location, datefrom, dateto, null, null).subscribe(researchOffers => {
        this.offers = researchOffers;
      });
    });
  }
  onSubmitSearch() {
    const {location, datefrom, dateto,  pricefrom, priceto} = this.formS.value;
    console.log(this.formS.value);
    console.log(location);
    this.offersService.getSearch(location, datefrom, dateto, pricefrom, priceto).subscribe(researchOffers => {
      this.offers = researchOffers;
    });
  }

}
