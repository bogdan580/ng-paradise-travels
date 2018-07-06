import {Injectable} from '@angular/core';
import {Offer} from '../models/offer.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {ConfigService} from './config.service';
import {UserLoginResponseModel} from '../models/responseModels/userLoginResponse.model';
import {OfferBuyRequestModel} from '../models/requestModel/OfferBuyRequest.model';
import {PojoBooleanModel} from '../models/pojoModels/pojoBoolean.model';

@Injectable({ providedIn: 'root' })
export class OffersService {
  constructor(private http: HttpClient,
              private configService: ConfigService) {

  }

  getOffers(): Observable<Offer> {
    return this.http.get<Offer>(this.configService.getBeckendUrl() + '/offers');
  }

  buy(offerBuyRequestModel: OfferBuyRequestModel): Observable<PojoBooleanModel> {
    return this.http.post<PojoBooleanModel>( this.configService.getBeckendUrl() + '/offers/buy',
      offerBuyRequestModel
    );
  }
}
