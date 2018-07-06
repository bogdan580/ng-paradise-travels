import {Injectable} from '@angular/core';
import {Offer} from '../models/offer.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Reservation} from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient,
              private configService: ConfigService) {

  }

  getReservations(): Observable<Reservation> {
    return this.http.get<Reservation>(this.configService.getBeckendUrl() + '/reservations');
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.configService.getBeckendUrl() + '/reservations/' + String(id));
  }

}
