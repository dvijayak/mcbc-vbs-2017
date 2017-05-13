import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

import { NotFoundComponent } from './404/404.component';

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
   {
      path: '',
      component: HomeComponent
   },
   // 404 not found
   {
      path: '404',
      component: NotFoundComponent
   },
   {
      path: '**',
      redirectTo: '/404'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
