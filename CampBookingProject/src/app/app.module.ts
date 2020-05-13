import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './Main/container.component';

import { CampDetailComponent } from './Camp-Detail/camp-detail.component';
import { CampListComponent } from './Camps/camp-list.component';
import { CampNewComponent } from './admin/Camp-Create/camp-new.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampService } from './Service/camp.service';
import { HttpClientModule } from '@angular/common/http';
import { CampUpdateComponent } from './admin/manage-camp/Camp-Update/camp-update.component';
import { BookingService } from './Service/booking.service';
import { CampBookingComponent } from './Camp-Book/camp-book.component';
import { AllCampsComponent } from './admin/manage-camp/all-camps/all-camps.component';
import { EditbookingComponent } from './editbooking/editbooking.component';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './Service/error-handler.service';
import { LoginComponent } from './admin/login/login.component';
import { AuthService } from './Service/auth.service';
import { BookingConfirmComponent } from './Confirm-Boooking/confirmbooking.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    CampNewComponent,
    CampDetailComponent,
    CampListComponent,
    DashboardComponent,
    CampUpdateComponent,
    CampBookingComponent,
    AllCampsComponent,
    EditbookingComponent,
    ManagebookingComponent,
    InternalServerComponent,
    LoginComponent,
    BookingConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
   
  ],
  exports :[
    ContainerComponent,
    CampNewComponent,
    CampDetailComponent,
    CampListComponent,
    DashboardComponent,
    CampUpdateComponent,
    CampBookingComponent,
    AllCampsComponent,
    EditbookingComponent,
    ManagebookingComponent,
    InternalServerComponent,
    LoginComponent,
    BookingConfirmComponent
  ],
  providers: [CampService,BookingService,ErrorHandlerService,AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
