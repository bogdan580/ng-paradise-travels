import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginResponseModel} from '../shared/models/responseModels/userLoginResponse.model';
import {UsersService} from '../shared/services/users.service';
import {PojoBooleanModel} from '../shared/models/pojoModels/pojoBoolean.model';
import {Message} from '../shared/models/message.model';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit {
  user: User;
  isAdm: boolean;
  isLog: boolean;
  constructor (
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
   // this.router.navigate(['/home']);
    this.usersService.getLoggedUser()
      .subscribe((user: User) => {
        console.log('sys comp');
        if (user) {
          console.log(user);
          this.user = user;
          this.Check(this.user.role);
          this.isLog = true;
          console.log(this.user.role);
        }
      });
  }

  onClickLogout() {
    this.usersService.logout()
      .subscribe((pojoBolleanModel: PojoBooleanModel) => {
        if (pojoBolleanModel.value === true) {
          this.authService.logout();
          this.isAdm = false;
          this.isLog = false;
          this.router.navigate(['/home']);
        }
      });
  }
  Check(role: string): boolean {
    if (role === 'admin') {
      this.isAdm = true;
    } else {
      this.isAdm = false;
    }
    return this.isAdm;
  }
}
