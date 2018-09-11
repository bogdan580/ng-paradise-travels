import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  imports: [
    SlideshowModule,
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  exports: [
    CommonModule,
    SharedModule],
  declarations: [
    HomePageComponent,
    OffersPageComponent,
    OfferPageComponent,
    ProfilePageComponent,
    AdminPageComponent]
})
export class SystemModule {}
