import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Convert, Offer} from '../../shared/models/offer.model';
import {OffersService} from '../../shared/services/offers.service';

@Component({
  selector: 'wfm-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnChanges {
  offers: Offer;

  constructor(private offersService: OffersService) { }

  ngOnChanges(changes: SimpleChanges): void {
  }
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
