import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  //   this.form = new FormGroup({
  //     'email': new FormControl(),
  //     'password': new FormControl()
  //   });
   }

  // onSubmit() {
  //   console.log(this.form);
  // }
}

