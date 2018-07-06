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

  constructor(private offersService: OffersService) { }
  @Input() form: FormGroup;
  ngOnInit() {
    this.get2Offers();
    this.form = new FormGroup({
      'numberOfCustomers': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      'data': new FormControl(null, [Validators.required]),
      'destination': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
    });
  }
  get2Offers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      console.log(oferta);
      this.offers = oferta;
    });
  }
}
