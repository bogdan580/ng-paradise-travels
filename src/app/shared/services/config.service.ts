import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Jorney} from '../models/jorney.model';
import {PojoNumberModel} from '../models/pojoModels/pojoNumber.model';
import {PojoBooleanModel} from '../models/pojoModels/pojoBoolean.model';
import {Offer} from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor( private http: HttpClient) {}

  public getBeckendUrl(): string {
    //  return 'http://localhost:8080/paradiseTravels';
     return 'http://77.55.193.96:8080/paradiseTravels';
  }
  public getWeatherUrl(): string {
    return 'https://api.openweathermap.org/data/2.5/forecast?';
  }

  createNewLJ(jorney: Jorney): Observable<any> {
    return this.http.post<any>(this.getBeckendUrl() + `/local-journeys`, jorney) ;
  }
  deleteLJ(id: number): Observable<any> {
    return this.http.delete( this.getBeckendUrl() + `/local-journejs/` + id);
  }

  addNewOffer(offer: Offer): Observable<any> {
    return this.http.post<any>(this.getBeckendUrl() + `/offers`, offer);
  }

}
