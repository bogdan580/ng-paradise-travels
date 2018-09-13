import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Jorney} from '../models/jorney.model';


@Injectable({ providedIn: 'root' })
export class JorneyService {
  constructor(private http: HttpClient,
              private configService: ConfigService) {

  }
  getLocalJourneys(): Observable<Jorney[]> {
    return this.http.get<Jorney[]>(this.configService.getBeckendUrl() + '/local-journeys');
  }
}
