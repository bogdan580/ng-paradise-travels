import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'firstName': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
