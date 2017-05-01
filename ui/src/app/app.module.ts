import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'ng2-materialize';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LogoutComponent } from './logout.component';
import { RegistrationsComponent } from './registrations.component';
import { ChildRowComponent } from './child-row.component';

import { ChildService } from './child.service';
import { VolunteerService } from './volunteer.service';

import { HomeComponent } from './home/home.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

@NgModule({
   // All components in the application must be declared here upfront
   declarations: [
      AppComponent
      , LogoutComponent
      , RegistrationsComponent
      , ChildRowComponent, HomeComponent, MainnavComponent, FooterComponent, HeaderComponent, FaqComponent, RegisterComponent, VolunteerComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule, // import the FormsModule before binding
      HttpModule,
      MaterializeModule.forRoot(),
      AppRoutingModule
   ],
   providers: [
      ChildService
      , VolunteerService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
