import { Component, OnInit } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'wfm-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  message: Message;
  constructor(  private router: Router,
                private route: ActivatedRoute
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
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
}
