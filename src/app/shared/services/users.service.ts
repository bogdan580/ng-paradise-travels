import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserByLogin(login: string): Observable<User> {
      return this.http.get<User>(`http://localhost:3000/users?login=${login}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users`, user) ;
  }
}
