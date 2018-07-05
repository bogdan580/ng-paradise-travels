import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {SystemModule} from './system/system.module';
import {SystemComponent} from './system/system.component';
import {ConfigService} from './shared/services/config.service';
import {OffersService} from './shared/services/offers.service';


@NgModule({
  declarations: [
    AppComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SystemModule
  ],
  providers: [UsersService, AuthService, ConfigService, OffersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
