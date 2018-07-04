import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';

import {User} from '../../shared/models/user.model';
import {Address} from '../../shared/models/address.model';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';

@Component({
  selector: 'wfm-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required], this.forbiddenLogins.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const {login, password, firstName, postalCode, email} = this.form.value;
    const address = new Address(null, postalCode, null, null, null);
    const user = new User(login, password, firstName, address, email);

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
      this.userService.issetUser(control.value)
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


}
