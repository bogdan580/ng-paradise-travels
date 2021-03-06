import {Address} from './address.model';

export class User {
  constructor(
    public login: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public address: Address,
    public email: string,
    public role: string,
    public id?: number
  ) {}
}
