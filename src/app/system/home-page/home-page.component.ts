import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Convert, Offer} from '../../shared/models/offer.model';
import {OffersService} from '../../shared/services/offers.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IImage} from 'ng-simple-slideshow';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'wfm-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  offers: Array<Offer>;

  constructor(private offersService: OffersService, private router: Router) { }
  formA: FormGroup;
  server = environment.server;
  country: Array<string>;

  imageSources: (string | IImage)[] = [
{ url: 'https://thumbs.gfycat.com/VibrantHeavyFrogmouth-size_restricted.gif',
  caption: 'Loading...' }
  ];

  ngOnInit() {
    this.get2Offers();
    this.formA = new FormGroup({
      'location': new FormControl(),
      'datefrom': new FormControl(),
      'dateto': new FormControl(),
    });
    setTimeout(() => {
      console.log('adding an image url dynamically.');
      this.imageSources.pop();
      this.offers.forEach(item => {
        if (item.promoted === true) {
          this.imageSources.push({url: item.pictures[0], caption: item.name, href: this.server + 'offer/' + item.id});
        }
      });
    }, 3000);
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
      this.router.navigate(['/offers'], {
          queryParams: {
            location,
            datefrom,
            dateto
          }
        });
    }

}
