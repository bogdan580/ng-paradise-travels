import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {UsersService} from '../../shared/services/users.service';
import {UserLoginResponseModel} from '../../shared/models/responseModels/userLoginResponse.model';
import {User} from '../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
import {Address} from '../../shared/models/address.model';
import {Message} from '../../shared/models/message.model';
import {OffersService} from '../../shared/services/offers.service';
import {Hotel} from '../../shared/models/hotel.model';
import {Jorney} from '../../shared/models/jorney.model';
import {Offer} from '../../shared/models/offer.model';
import {PojoNumberModel} from '../../shared/models/pojoModels/pojoNumber.model';
import {ConfigService} from '../../shared/services/config.service';
import {idLocale} from 'ngx-bootstrap';

@Component({
  selector: 'wfm-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  message: Message;
  hotels: Array<Hotel>;
  offers: Array<Offer>;
  users: Array<User>;
  localJorneys: Array<Jorney>;

  constructor(private usersService: UsersService,
              private offersService: OffersService,
              private configService: ConfigService,
              private router: Router,
              private route: ActivatedRoute) {
    this.usersService.getLoggedUser().subscribe((user: User) => {
      console.log('admin user');
      if (user) {
        console.log('Role: ' + user.role);
        console.log(user);
        if (user.role !== 'admin') {
          this.router.navigate(['/profile'], {
            queryParams: {
              notAdmin: true
            }
          });
        }
      } else {
        this.router.navigate(['/auth/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      }

        this.getHotels();
    });
  }

  form: FormGroup;
  formDelUsr: FormGroup;
  formAddLJ: FormGroup;
  formDelJorney: FormGroup;
  formAddOf: FormGroup;
  formDelOf: FormGroup;

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
      'confirmPassword': new FormControl(null, [Validators.required],  this.notSamePasswords.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email],  this.forbiddenEmails.bind(this)),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'postalCode': new FormControl(null, [Validators.required, Validators.pattern('/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/')]),
      'City': new FormControl(null, [Validators.required]),
      'Region': new FormControl(null, [Validators.required]),
      'Country': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required])
    });

    this.formAddLJ = new FormGroup({
      'idHtl': new FormControl(null, [Validators.required]),
      'jorneyName': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'languageGuide': new FormControl(null, [Validators.required]),
      'durationTime': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    });

    this.formAddOf = new FormGroup({
      'nameHotel': new FormControl(null, [Validators.required]),
      'descriptionHotel': new FormControl(null, [Validators.required]),
      'starsHotel': new FormControl(null, [Validators.required]),
      'street': new FormControl(null, [Validators.required]),
      'postal': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'region': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'offerName': new FormControl(null, [Validators.required]),
      'dateFrom': new FormControl(null, [Validators.required]),
      'dateTo': new FormControl(null, [Validators.required]),
      'promoted': new FormControl(null, [Validators.required]),
      'shortDesc': new FormControl(null, [Validators.required]),
      'desc': new FormControl(null, [Validators.required]),
      'pricePerDay': new FormControl(null, [Validators.required])
    });

    this.formDelOf = new FormGroup({
      'idOffer': new FormControl(null, [Validators.required])
    });
    this.formDelUsr = new FormGroup({
      'idUser': new FormControl(null, [Validators.required])
    });
    this.formDelJorney = new FormGroup({
      'idJorney': new FormControl(null, [Validators.required])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  getHotels(): void {
    console.log('getHotels');
    this.offersService.getHotels().subscribe(hotelList => {
      this.hotels = hotelList;
      this.getOffers();
    });
  }

  getOffers(): void {
    console.log('getOffers');
    this.offersService.getOffers().subscribe(offerList => {
      this.offers = offerList;
      this.getLocalJorneys();
    });
  }

  getLocalJorneys(): void {
    console.log('getLocalJorneys');
    this.offersService.getLocalJorneys().subscribe(localJorneysList => {
      this.localJorneys = localJorneysList;
      console.log(this.localJorneys);
      this.getUsers();
    });
  }

  getUsers(): void {
    console.log('getUsers');
    this.usersService.getUsers().subscribe(usersList => {
      this.users = usersList;
    });
  }

  onSubmit() {
    const {login, password, firstName, lastName, postalCode, email, address, city, region, country, role} = this.form.value;
    const addressObj = new Address(address, postalCode, city, region, country);
    const user = new User(login, password, firstName, lastName, addressObj, email, role);
    this.usersService.createNewUser(user).subscribe(() => {
      this.router.navigate(['/admin'], {
        queryParams: {
          changeSave: true
        }
      });
    });
    this.form.reset();
  }

  onSubmitAddOf() {
    const {nameHotel, descriptionHotel, starsHotel, street, postal, city, region, country, offerName, dateFrom,
            dateTo, promoted, shortDesc, desc, pricePerDay} = this.formAddOf.value;
    const address = new Address(street, postal, city, region, country);
    const hotel = new Hotel(null, nameHotel, descriptionHotel, starsHotel, address);
    const offer = new Offer( hotel, dateFrom, dateTo, offerName, promoted, desc, shortDesc, [ ], pricePerDay );
    console.log(`Json: ` + JSON.stringify(offer).toString());
  }

  onSubmitAddLJ() {
    const {idHtl, jorneyName, price, languageGuide, durationTime, description} = this.formAddLJ.value;
    const hotel = new Hotel(idHtl);
    const localJorney = new Jorney(jorneyName, description, price, durationTime, languageGuide, hotel);
    console.log(`Json: ` + JSON.stringify(localJorney).toString());
    this.configService.createNewLJ(localJorney).subscribe( () => {
        this.router.navigate(['/admin'], {
          queryParams: {
            changeSave: true
          }
        });
    }, error1 => {
      this.router.navigate(['/admin'], {
        queryParams: {
          changeSave: false
        }
      });
    });
  }

  onSubmitDelLocalJorney() {
    const {idJorney} = this.formDelJorney.value;
    console.log(`del local jorney ` + idJorney);
    this.configService.deleteLJ(idJorney).subscribe( () => {
      this.router.navigate(['/admin'], {
        queryParams: {
          changeSave: true
        }
      });
    });
  }

  onSubmitDelOf() {
    const {idOffer} = this.formDelOf.value;
    console.log(`del offer ` + idOffer);
  }

  onSubmitDelUsr() {
    const {idUser} = this.formDelUsr.value;
    console.log(`del user ` + idUser);
    this.usersService.deleteUser(idUser).subscribe( () => {
      this.router.navigate(['/admin'], {
        queryParams: {
          changeSave: true
        }
      });
    });
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

  notSamePasswords(control: FormControl): Promise<any> {
    return new Promise((resolve, reject)  => {
      if (control.value === this.form.value.password) {
        resolve(null);
      } else {
        resolve({notSamePasswords: true});
      }
    });
  }

}
