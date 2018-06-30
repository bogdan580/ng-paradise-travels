import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserLoginResponseModel} from '../../models/responseModels/userLoginResponse.model';
import {ConfigService} from '../config.service';
import {catchError} from 'rxjs/internal/operators';


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

  getUserByLogin(login: string): Observable<User> {
      return this.http.get<User>(`http://localhost:3000/users?login=${login}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users`, user) ;
  }
}