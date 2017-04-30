import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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

@NgModule({
   // All components in the application must be declared here upfront
   declarations: [
      AppComponent
      , LogoutComponent
      , RegistrationsComponent
      , ChildRowComponent, HomeComponent, MainnavComponent, FooterComponent, HeaderComponent
   ],
   imports: [
      BrowserModule,
      FormsModule, // import the FormsModule before binding
      HttpModule
   ],
   providers: [
      ChildService
      , VolunteerService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
