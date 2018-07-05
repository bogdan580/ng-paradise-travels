import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginResponseModel} from '../shared/models/responseModels/userLoginResponse.model';
import {UsersService} from '../shared/services/users.service';
import {PojoBooleanModel} from '../shared/models/pojoModels/pojoBoolean.model';
import {Message} from '../shared/models/message.model';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit {
  constructor (
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.router.navigate(['/system/home']);
  }

  onClickLogout() {
    this.usersService.logout()
      .subscribe((pojoBolleanModel: PojoBooleanModel) => {
        if (pojoBolleanModel.value === true) {
          this.authService.logout();
          this.router.navigate(['/home']);
        }
      });
  }
}
