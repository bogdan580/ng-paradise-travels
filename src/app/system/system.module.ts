import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersPageComponent } from './offers-page/offers-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, SystemRoutingModule],
  exports: [CommonModule, SharedModule],
  declarations: [HomePageComponent, OffersPageComponent]
})
export class SystemModule {}
