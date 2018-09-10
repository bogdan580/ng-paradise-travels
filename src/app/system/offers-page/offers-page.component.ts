import { Component, OnInit } from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'wfm-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {
  offers: Offer;
  myfind: Array<any>;
  search: boolean;
  constructor(private offersService: OffersService, private router: Router) { }
  formS: FormGroup;
  ngOnInit() {
   this.getOffers();
    this.search = false;
    this.formS = new FormGroup({
      'location': new FormControl(),
      'datefrom': new FormControl(),
      'dateto': new FormControl(),
      'pricefrom': new FormControl(),
      'priceto': new FormControl()
    });
  }
  getOffers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = oferta;
    });
  }

  onSubmitSearch() {
    const {location, datefrom, dateto,  pricefrom, priceto} = this.formS.value;
    console.log(this.formS.value);
    console.log(location);
    this.offersService.getSearch(location, datefrom, dateto, pricefrom, priceto).subscribe(research => {
      this.myfind = research;
      this.search = true;
    console.log(this.myfind); }
    );
  }

}
