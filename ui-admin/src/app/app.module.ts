import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout.component';
import { FooterComponent } from './footer/footer.component';
import { ChildService } from '../../../ui/src/app/models/child.service';
import { VolunteerService } from '../../../ui/src/app/models/volunteer.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    LogoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule.forRoot(),
    AppRoutingModule,
    NgArrayPipesModule,
    NgObjectPipesModule,
  ],
  providers: [ChildService, VolunteerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
