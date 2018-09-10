import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Convert, Offer} from '../../shared/models/offer.model';
import {OffersService} from '../../shared/services/offers.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'wfm-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  offers: Offer;
  myfind: Array<any>;
  search: boolean;
  constructor(private offersService: OffersService) { }
  formA: FormGroup;
  ngOnInit() {
    this.get2Offers();
    this.formA = new FormGroup({
      'location': new FormControl(),
      'datefrom': new FormControl(),
      'dateto': new FormControl(),
      'pricefrom': new FormControl(),
      'priceto': new FormControl()
    });
  }
  get2Offers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      console.log(oferta);
      this.offers = oferta;
    });
  }
  onSubmitSearch() {
    const {location, datefrom, dateto,  pricefrom, priceto} = this.formA.value;
    console.log(this.formA.value);
    console.log(location);
    this.offersService.getSearch(location, datefrom, dateto, pricefrom, priceto).subscribe(research => {
      this.myfind = research;
      this.search = true;
      console.log(this.myfind);
    }
    );
  }

}
