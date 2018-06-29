import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  public getBeckendUrl(): string {
    return 'http://77.55.193.96:8080/paradiseTravels';
  }
}
