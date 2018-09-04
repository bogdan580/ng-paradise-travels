import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  public getBeckendUrl(): string {
    // return 'http://localhost:8080/paradiseTravels';
     return 'http://77.55.193.96:8080/paradiseTravels';
  }
  public getWeatherUrl(): string {
    return 'https://api.openweathermap.org/data/2.5/forecast?';
  }
}
