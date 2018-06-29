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
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
// import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SystemComponent,
    HomeComponent,
    OffersComponent,
   // MenuComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SystemModule
  ],
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
