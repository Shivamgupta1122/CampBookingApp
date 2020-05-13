import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampNewComponent } from './admin/Camp-Create/camp-new.component';
import { CampListComponent } from './Camps/camp-list.component';
import { CampDetailComponent } from './Camp-Detail/camp-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampBookingComponent } from './Camp-Book/camp-book.component';
import { AllCampsComponent } from './admin/manage-camp/all-camps/all-camps.component';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import { EditbookingComponent } from './editbooking/editbooking.component';
import { CampUpdateComponent } from './admin/manage-camp/Camp-Update/camp-update.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { AuthGuard } from './admin/login/auth.guard';
import { LoginComponent } from './admin/login/login.component';
import { BookingConfirmComponent } from './Confirm-Boooking/confirmbooking.component';




const routes: Routes = [
  
  {path:'Camp/AllDashboardCamps',component:CampListComponent, pathMatch: 'full'},
  {path : 'Camp/AllCampDetails', component:AllCampsComponent},
  {path : "Camp/CreateCamp",component : CampNewComponent, canActivate: [AuthGuard]},
  {path:'Camp/GetCampDetailsById/:campId',component:CampDetailComponent},
  {path : 'bookCamp/:CampId',component : CampBookingComponent},
  {path:'allCamps' ,component:AllCampsComponent, canActivate: [AuthGuard]},
  { path: 'manageBooking', component: ManagebookingComponent },
  {path : 'confirmbooking',component:BookingConfirmComponent},
  { path: 'editbooking/:id', component: EditbookingComponent },
  
  { path: 'AdminLogin', component: LoginComponent },
  {
    path: 'UpdateCamp/:id',component: CampUpdateComponent, canActivate: [AuthGuard] },
  { path: '500', component: InternalServerComponent },
  {path : "dashboard",component : DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
