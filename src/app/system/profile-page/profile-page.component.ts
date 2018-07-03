import { Component, OnInit } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'wfm-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  message: Message;
  constructor(  private router: Router,
                private route: ActivatedRoute,
                private userService: UsersService
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
      });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
}
