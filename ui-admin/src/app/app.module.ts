import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout.component';
import { FooterComponent } from './footer/footer.component';
import { DatatableComponent } from './admin/datatable/datatable.component';

import { SubmissionService } from './admin/submission.service';
import { IntercomService } from './admin/intercom.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    LogoutComponent,
    FooterComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule.forRoot(),
    AppRoutingModule,
    NgArrayPipesModule,
    NgObjectPipesModule,
    NgxDatatableModule
  ],
  providers: [SubmissionService, IntercomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
