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
import * as domain from 'domain';
import {setOffsetToUTC} from 'ngx-bootstrap/chronos/units/offset';


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
  public selectedId: any;
  constructor(private offersService: OffersService, private route: ActivatedRoute, private router: Router, ) {
  }

  @Input() form: FormGroup;

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

    this.form = new FormGroup({
      'numberOfCustomers': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      'from': new FormControl(null, [Validators.required]),
      'to': new FormControl(null, [Validators.required]),
      'numberOfOnePersonBed': new FormControl(null, [Validators.required]),
      'numberOfTwoPersonBed': new FormControl(null, [Validators.required]),
    }, [numberOfBedValidator]);

  }
  getOffers(): void {
    this.offersService.getOffers().subscribe(oferta => {
      this.offers = Convert.toOffers(JSON.stringify(oferta));

      this.oferty = this.offers.find(item => item.id === Number(this.selectedId.id));
      console.log(this.selectedId.id);
      console.log(this.oferty);
      this.hotelStars = new Array(this.oferty.hotel.stars);
      this.addJourneysFormControl(this.oferty.hotel.localJourneyList);

    });
  }

  addJourneysFormControl(jorneys: Jorney[]) {
    for (const journey of jorneys) {
      this.form.addControl('journey.' + journey.id, new FormControl(null, []));
    }
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

    console.log(this.form.value);
    offerBuyRequestModel.offerId = this.oferty.id;

    const {numberOfCustomers, from, to, numberOfOnePersonBed, numberOfTwoPersonBed} = this.form.value;
    offerBuyRequestModel.numberOfCustomers = numberOfCustomers;
    offerBuyRequestModel.from = from;
    offerBuyRequestModel.to = to;
    offerBuyRequestModel.numberOfOnePersonBed = numberOfOnePersonBed;
    offerBuyRequestModel.numberOfTwoPersonBed = numberOfTwoPersonBed;

    this.offersService.buy(offerBuyRequestModel).subscribe((pojoBooleanModel: PojoBooleanModel) => {
      console.log(pojoBooleanModel);
      alert('oferta zakupiona!');
      this.router.navigate(['/profile']);
    });
  }

  totalPrice() {
    let totalPrice = this.oferty.pricePerDayPerPerson * this.form.get('numberOfCustomers').value;

    let diffInDay = this.form.get('to').value;

    if (this.form.get('to').value != null && this.form.get('from').value != null) {
      const diff = Math.abs(new Date(this.form.get('to').value).getTime() - new Date(this.form.get('from').value).getTime());
      diffInDay = Math.ceil(diff / (1000 * 3600 * 24));
    }
    console.log(diffInDay);

    totalPrice = totalPrice * diffInDay;

    return totalPrice;
  }
}
