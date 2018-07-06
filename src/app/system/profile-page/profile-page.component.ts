import { Component, OnInit } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {ReservationService} from '../../shared/services/reservation.service';
import {Reservation, Convert} from '../../shared/models/reservation.model';
import {Offer} from '../../shared/models/offer.model';

@Component({
  selector: 'wfm-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  message: Message;
  user: User;
  reservs: Array<Reservation>;
  reserv: Reservation;
  constructor(  private router: Router,
                private route: ActivatedRoute,
                private userService: UsersService,
                private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['reservationSuccess']) {
        this.showMessage({
          text: 'Reservation was successful.',
          type: 'success'
        });
      }
    });
    this.userService.getLoggedUser()
      .subscribe((user: User) => {
        console.log('hi');
        console.log(user);
        this.user = user;
      });
  this.getReservation();
  }
  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  getReservation(): void {
    this.reservationService.getReservations().subscribe(oferta => {
      this.reservs = Convert.toReservations(JSON.stringify(oferta));

      this.reserv = this.reservs.find(item => item.user.id === Number(this.user.id));
      console.log(this.reserv);
    });
  }
}

