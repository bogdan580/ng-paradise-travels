import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {HomePageComponent} from './home-page/home-page.component';
import {OffersPageComponent} from './offers-page/offers-page.component';
import {OfferPageComponent} from './offer-page/offer-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';

const routes: Routes = [{
  path: '', component: SystemComponent, children: [
    {path: 'home', component: HomePageComponent},
    {path: 'offers', component: OffersPageComponent},
    {path: 'offer', component: OfferPageComponent},
    {path: 'profile', component: ProfilePageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
