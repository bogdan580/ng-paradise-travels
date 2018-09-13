import { Component, OnInit } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {ReservationService} from '../../shared/services/reservation.service';
import {Reservation, Convert} from '../../shared/models/reservation.model';
import {Offer} from '../../shared/models/offer.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../shared/models/address.model';
import {PojoBooleanModel} from '../../shared/models/pojoModels/pojoBoolean.model';
import {add} from 'ngx-bootstrap/chronos';
import {Jorney} from '../../shared/models/jorney.model';
import {JorneyService} from '../../shared/services/jorney.service';
import {OffersService} from '../../shared/services/offers.service';
import {Hotel} from '../../shared/models/hotel.model';

@Component({
  selector: 'wfm-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  message: Message;
  user: User ;
  reservs: Array<Reservation>;
  reserver: Reservation [];
  journey: Array<Jorney>;
  hotels: Array<Hotel>;
  list: Array<Jorney> = new Array<Jorney>();
  lis2: Array<Jorney> = new Array<Jorney>();
  isNull: boolean;
  invoiceAdress: string;
  constructor(  private router: Router,
                private route: ActivatedRoute,
                private usersService: UsersService,
                private reservationService: ReservationService,
                private journeyService: JorneyService,
                private offersService: OffersService
  ) {
    this.usersService.getLoggedUser()
    .subscribe((user: User) => {
      console.log('getLoggedUser');
      console.log(user);
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/auth/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      }
    });
  }

  formU: FormGroup;
  formA: FormGroup;
  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['reservationSuccess']) {
        this.showMessage({
          text: 'Reservation successful.',
          type: 'success'
        });
      } else if (params['notAdmin']) {
        this.showMessage({
          text: 'You are NOT ADMIN.',
          type: 'danger'
        });
      } else if (params['changeSave']) {
        this.showMessage({
          text: 'Change was saved',
          type: 'success'
        });
      } else if (params['paid'] && params['error']) {
        this.showMessage({
          text: 'Paid not successful',
          type: 'danger'
        });
      } else if (params['paid']) {
        this.showMessage({
          text: 'Paid successful',
          type: 'success'
        });
      }
    });
    this.getReservation();
    this.formU = new FormGroup({
      'password': new FormControl(null, [ Validators.minLength(6)]),
      'oldPassword': new FormControl(null, [Validators.required], this.notSamePasswords.bind(this)),
      'email': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl()
    });
    this.formA = new FormGroup({
      'address': new FormControl(),
      'zip': new FormControl(),
      'city': new FormControl(),
      'region': new FormControl(),
      'country': new FormControl()
    });
  }
  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmitUser() {
    const {password, firstName, lastName,  email} = this.formU.value;
    // console.log(this.formU.value);
    const user = new User( this.user.login,
      password ? password : this.user.password,
      firstName ? firstName : this.user.firstName,
      lastName ? lastName : this.user.lastName,
      this.user.address,
      email ? email : this.user.email,
      this.user.role, this.user.id);
    console.log(`Json: ` + JSON.stringify(user).toString());
    this.usersService.updateUser(user).subscribe(() => {
      this.user = user;
      this.router.navigate(['/profile'], {
        queryParams: {
          changeSave: true
        }
      });
    });
  }

  onSubmitAddress() {
    const {address, zip, city,  region, country} = this.formA.value;
    console.log(this.formA.value);
    const userAddress = new Address(address ? address : this.user.address.address,
      zip ? zip : this.user.address.postalCode,
      city ? city : this.user.address.city,
      region ? region : this.user.address.region,
      country ? country : this.user.address.country,
      this.user.address.id);
    // console.log(`Json: ` + JSON.stringify(userAddress).toString());
    this.usersService.updateAddress(userAddress).subscribe(() => {
      this.user.address = userAddress;
      this.router.navigate(['/profile'], {
        queryParams: {
          changeSave: true
        }
      });
    });
  }

  getReservation(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservs = Convert.toReservations(JSON.stringify(reservations));
      console.log(this.reservs);
      // this.reserv = this.reservs.find(item => item.user.id === Number(this.user.id));
      this.reserver = this.reservs.filter(item => item.user.id === Number(this.user.id));
      if (this.reserver.length === 0) {
        this.isNull = true;
      }
      console.log(this.reservs);
      // console.log(this.reserv);
      console.log(this.reserver);
      console.log(this.isNull);
      this.invoiceAdress = 'http://77.55.193.96:8080/paradiseTravels/invoices/reservation/';
      this.getJourney();
    });
  }
  getJourney(): void {
      this.offersService.getHotels().subscribe( hotels => {
        this.hotels = hotels;
        console.log(this.hotels);
        for (let lista of this.hotels) {
          for (let localJurney of lista.localJourneyList) {
            this.list.push(localJurney);
          }
        }
        console.log(this.list);
        this.list.sort((a, b ) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
        console.log(this.list);
        for (let lista of this.reserver) {
          for (let localJurney of lista.localJourneyList) {
            this.lis2.push(this.list[localJurney - 1]);
          }
          // lista.localJourneyList.push(this.lis2);
        }
        console.log(this.lis2);
        console.log(this.reserver);
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
      if (control.value === this.user.password) {
        resolve(null);
      } else {
        resolve({notSamePasswords: true});
      }
    });
  }
}

