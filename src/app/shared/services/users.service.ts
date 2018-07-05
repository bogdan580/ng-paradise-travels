import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {catchError} from 'rxjs/internal/operators';
import {UserLoginResponseModel} from '../models/responseModels/userLoginResponse.model';
import {ConfigService} from './config.service';
import {User} from '../models/user.model';
import {PojoBooleanModel} from '../models/pojoModels/pojoBoolean.model';


@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {

  }

  login(login: string, password: string): Observable<UserLoginResponseModel> {
    return this.http.post<UserLoginResponseModel>( this.configService.getBeckendUrl() + '/login',
        {
          'login': login,
          'password' : password,
        }
    );
  }

  getUserByLogin(login: string): Observable<User> {// poprawic
      return this.http.get<User>(this.configService.getBeckendUrl() + `/users?login=${login}`);
  }

  issetUser(login: String): Observable<Object> {// poprawic
    return this.http.get<PojoBooleanModel>(this.configService.getBeckendUrl() + `/users/is-exist/${login}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.configService.getBeckendUrl() + `/register`, user) ;
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(this.configService.getBeckendUrl() + `/users/logged`
    );
  }
}
