import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './404/404.component';

@NgModule({
   // All components in the application must be declared here upfront
   declarations: [
      AppComponent,
      HomeComponent,
      FooterComponent,
      HeaderComponent,
      FaqComponent,
      RegisterComponent,
      VolunteerComponent,
      ModalComponent,
      NotFoundComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpModule,
      MaterializeModule.forRoot(),
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent],
   entryComponents: [ModalComponent],
})
export class AppModule { }
