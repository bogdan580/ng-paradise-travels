import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({
          text: 'Teraz możesz wejść do panelu',
          type: 'success'
        });
      }
    });
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    console.log('click');
    this.usersService.getUserByLogin(formData.login)
      .subscribe((user: User) => {
        console.log(user);
        if (user[0]) {
          if (user[0].password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user[0]));
            this.authService.login();
            // this.router.navigate(['']);
          } else {
            this.showMessage({
              text: 'Hasło nie prawidlowe',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Nie ma takiego usera',
            type: 'danger'
          });
        }
      });
  }
}

