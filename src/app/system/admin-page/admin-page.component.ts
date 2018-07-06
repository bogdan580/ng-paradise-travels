import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {UsersService} from '../../shared/services/users.service';
import {UserLoginResponseModel} from '../../shared/models/responseModels/userLoginResponse.model';
import {User} from '../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
import {Address} from '../../shared/models/address.model';

@Component({
  selector: 'wfm-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private usersService: UsersService,
              private router: Router) { }
  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required], this.forbiddenLogins.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email],  this.forbiddenEmails.bind(this)),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'postalCode': new FormControl(null, [Validators.required, Validators.pattern('/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/')]),
      'City': new FormControl(null, [Validators.required]),
      'Region': new FormControl(null, [Validators.required]),
      'Country': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const {login, password, firstName, lastName, postalCode, email, address, city, region, country, role} = this.form.value;
    const addressObj = new Address(address, postalCode, city, region, country);
    const user = new User(login, password, firstName, lastName, addressObj, email, role);
    this.usersService.createNewUser(user).subscribe();
  }

  forbiddenLogins (control: FormControl): Promise<any> {
    return new Promise((resolve, reject)  => {
      this.usersService.existUserLogin(control.value)
        .subscribe((obj: PojoBooleanModel) => {
          console.log(obj.value);
          if (obj.value) {
            resolve({forbiddenLogin: true});
          } else {
            resolve(null);
          }
        });
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject)  => {
      this.usersService.existUserEmail(control.value)
        .subscribe((obj: PojoBooleanModel) => {
          console.log(obj.value);
          if (obj.value) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

}
