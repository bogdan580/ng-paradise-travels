import {Injectable} from '@angular/core';
import {Offer} from '../models/offer.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {ConfigService} from './config.service';
import {UserLoginResponseModel} from '../models/responseModels/userLoginResponse.model';
import {OfferBuyRequestModel} from '../models/requestModel/OfferBuyRequest.model';
import {PojoBooleanModel} from '../models/pojoModels/pojoBoolean.model';
import {Hotel} from '../models/hotel.model';
import {Jorney} from '../models/jorney.model';
import {PojoStringModel} from '../models/pojoModels/pojoString.model';

@Injectable({providedIn: 'root'})
export class OffersService {
  constructor(private http: HttpClient,
              private configService: ConfigService) {

  }

  getOffers(): Observable<Offer> {
    return this.http.get<Offer>(this.configService.getBeckendUrl() + '/offers');
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.configService.getBeckendUrl() + '/hotels');
  }

  getLocalJorneys(): Observable<Jorney[]> {
    return this.http.get<Jorney[]>(this.configService.getBeckendUrl() + '/local-journeys');
  }
  getWeather(city: string): Observable<any> {
    return this.http.get<any>(this.configService.getWeatherUrl() + 'q=' + city + '&units=metric&appid=10c30b170fc663080002c992eca0407b');
  }
  getSearch(location: string, datefrom: Date, dateto: Date, pricefrom: number, priceto: number): Observable<any> {
    let search = '/offers/search?';
    if (datefrom) {
      search = search + '&dateFrom=' + datefrom;
    }
    if (dateto) {
      search = search + '&dateTo=' + dateto;
    }
    if (location) {
      search = search + '&location=' + location;
    }
    if (pricefrom) {
      search = search + '&priceFrom=' + pricefrom;
    }
    if (priceto) {
      search = search + '&priceTo=' + priceto;
    }
    console.log(search);
    return this.http.get<any>(this.configService.getBeckendUrl() + search);
  }
  buy(offerBuyRequestModel: OfferBuyRequestModel): Observable<PojoStringModel> {
    return this.http.post<PojoStringModel>( this.configService.getBeckendUrl() + '/offers/reserveAndPay',
      offerBuyRequestModel
    );
  }
}
