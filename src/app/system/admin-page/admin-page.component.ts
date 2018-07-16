import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {UsersService} from '../../shared/services/users.service';
import {UserLoginResponseModel} from '../../shared/models/responseModels/userLoginResponse.model';
import {User} from '../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
import {Address} from '../../shared/models/address.model';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'wfm-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  message: Message;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) {
    usersService.getLoggedUser().subscribe((obj: User) => {
      console.log(obj.role);
      if (obj.role !== 'admin') {
        this.router.navigate(['/profile'], {
          queryParams: {
            notAdmin: true
          }
        });
      }
    });

  }
  form: FormGroup;
  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['changeSave']) {
        this.showMessage({
          text: 'Change was saved',
          type: 'success'
        });
      }
    });
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

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
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
