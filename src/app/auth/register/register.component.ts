///<reference path="../../shared/models/user.model.ts"/>
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';

import {User} from '../../shared/models/user.model';
import {Address} from '../../shared/models/address.model';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
import {HelperService} from '../../shared/services/helper.service';

@Component({
  selector: 'wfm-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router,
    private userService: UsersService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required], this.forbiddenLogins.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email],  this.forbiddenEmails.bind(this)),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const {login, password, firstName, lastName, postalCode, email} = this.form.value;
    const user = new User(login, password, firstName, lastName, null, email, 'user');

    this.userService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/auth/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  forbiddenLogins (control: FormControl): Promise<any> {
    return new Promise((resolve, reject)  => {
      this.userService.existUserLogin(control.value)
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
      this.userService.existUserEmail(control.value)
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
