///<reference path="../../shared/models/requestModel/OfferBuyRequest.model.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {OffersService} from '../../shared/services/offers.service';
import {Offer, Convert} from '../../shared/models/offer.model';
import {Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Jorney} from '../../shared/models/jorney.model';
import {OfferBuyRequestModel} from '../../shared/models/requestModel/OfferBuyRequest.model';
import {UserLoginResponseModel} from '../../shared/models/responseModels/userLoginResponse.model';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
// import * as domain from 'domain';
import {setOffsetToUTC} from 'ngx-bootstrap/chronos/units/offset';
import {PojoStringModel} from '../../shared/models/pojoModels/pojoString.model';
import {UsersService} from '../../shared/services/users.service';


function numberOfBedValidator(control: AbstractControl) {
      const numberOfOnePersonBed = control.get('numberOfOnePersonBed').value;
      const numberOfTwoPersonBed = control.get('numberOfTwoPersonBed').value;
      const numberOfCustomers = control.get('numberOfCustomers').value;

      if (numberOfOnePersonBed + numberOfTwoPersonBed * 2 !== numberOfCustomers ) {
        return {
          numberOfBed: {
            parsedDomain: 'xxx'
          }
        };
      }
      return null;
}

@Component({
  selector: 'wfm-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {

  offers: Array<Offer>;
  oferty: Offer;
  hotelStars: number[];
  forecast: Array<any>;
  cityName: string;
  isLogged = false;
  public selectedId: any;
  constructor(private offersService: OffersService,
              private userService: UsersService,
              private route: ActivatedRoute, private router: Router, ) {
  }

  @Input() form: FormGroup;

  ngOnInit() {
    this.loadScript('https://widgets.skyscanner.net/widget-server/js/loader.js');
    this.
    route.
    params.
    subscribe(params => {
      this.selectedId = params;
    });
    this.getOffers();
    this.form = new FormGroup({
      'numberOfCustomers': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      'from': new FormControl(null, [Validators.required]),
      'to': new FormControl(null, [Validators.required]),
      'numberOfOnePersonBed': new FormControl(null, [Validators.required]),
      'numberOfTwoPersonBed': new FormControl(null, [Validators.required]),
    }, [numberOfBedValidator]);
    this.userService.getLoggedUser().subscribe(user => {
      if (user) {
        this.isLogged = true;
      }
    });
  }
  getOffers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = Convert.toOffers(JSON.stringify(oferta));

      this.oferty = this.offers.find(item => item.id === Number(this.selectedId.id));
    console.log(this.oferty);
      this.hotelStars = new Array(this.oferty.hotel.stars);
      this.addJourneysFormControl(this.oferty.hotel.localJourneyList);
      this.cityName = this.oferty.hotel.address.city;
      this.getForecast();
    });
  }
  getForecast(): void {
    this.offersService.getWeather(this.oferty.hotel.address.city).subscribe(pogoda => {
      this.forecast = pogoda;
      console.log(this.forecast);
      console.log(this.oferty.hotel.address.city);
    });
  }
  addJourneysFormControl(jorneys: Jorney[]) {
    for (const journey of jorneys) {
      this.form.addControl('journey.' + journey.id, new FormControl(null, []));
    }
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  onSubmit() {
    const offerBuyRequestModel = new OfferBuyRequestModel(new Array<number>(), null, null, null, null, null, null);

    for (const key of Object.keys(this.form.value)) {
      const val = this.form.value[key];

      if (key.startsWith('journey') && val === true) {
        const arr = key.split('.');
        const journeyId = arr[1];

        offerBuyRequestModel.localJourneyIds.push(Number(journeyId));
      }
    }


    offerBuyRequestModel.offerId = this.oferty.id;

    const {numberOfCustomers, from, to, numberOfOnePersonBed, numberOfTwoPersonBed} = this.form.value;
    offerBuyRequestModel.numberOfCustomers = numberOfCustomers;
    offerBuyRequestModel.from = from;
    offerBuyRequestModel.to = to;
    offerBuyRequestModel.numberOfOnePersonBed = numberOfOnePersonBed;
    offerBuyRequestModel.numberOfTwoPersonBed = numberOfTwoPersonBed;

    this.offersService.buy(offerBuyRequestModel).subscribe((pojoStringModel: PojoStringModel) => {
      window.location.href = pojoStringModel.value;
    });
  }

  totalPrice() {
    let totalPrice = this.oferty.pricePerDayPerPerson * this.form.get('numberOfCustomers').value;

    let diffInDay = this.form.get('to').value;

    if (this.form.get('to').value != null && this.form.get('from').value != null) {
      const diff = Math.abs(new Date(this.form.get('to').value).getTime() - new Date(this.form.get('from').value).getTime());
      diffInDay = Math.ceil(diff / (1000 * 3600 * 24));
    }
    diffInDay++;

    totalPrice = totalPrice * diffInDay;

    for (const key of Object.keys(this.form.value)) {
      const val = this.form.value[key];

      if (key.startsWith('journey') && val === true) {
        const arr = key.split('.');
        const journeyId = Number(arr[1]);

        const localJurney = this.oferty.hotel.localJourneyList.find(item => item.id === journeyId);
        totalPrice = totalPrice + localJurney.price * this.form.get('numberOfCustomers').value;
      }
    }

    return totalPrice;
  }
}
