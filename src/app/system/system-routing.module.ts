import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {HomePageComponent} from './home-page/home-page.component';
import {OffersPageComponent} from './offers-page/offers-page.component';
import {OfferPageComponent} from './offer-page/offer-page.component';

const routes: Routes = [{
  path: 'system', component: SystemComponent, children: [
    {path: 'home', component: HomePageComponent},
    {path: 'offers', component: OffersPageComponent},
    {path: 'offer', component: OfferPageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
