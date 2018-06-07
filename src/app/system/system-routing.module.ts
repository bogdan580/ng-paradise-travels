import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {HomePageComponent} from './home-page/home-page.component';
import {OffersPageComponent} from './offers-page/offers-page.component';

const routes: Routes = [{
  path: 'system', component: SystemComponent, children: [
    {path: 'home', component: HomePageComponent},
    {path: 'offers', component: OffersPageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
