import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

const routes: Routes = [
   {
      path: 'faq',
      component: FaqComponent
   },
   {
      path: 'register',
      component: RegisterComponent
   },
   {
      path: 'volunteer',
      component: VolunteerComponent
   },
   // The empty path must be the last, so that instead of 404's
   // we simply redirect to the home page
   {
      path: '',
      component: HomeComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
