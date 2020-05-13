import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
const routes = [
    { path: 'Camp/AllCampDetails', component: CampListComponent, pathMatch: 'full' },
    { path: "Camp/CreateCamp", component: CampNewComponent, canActivate: [AuthGuard], },
    { path: 'Camp/GetCampDetailsById/:campId', component: CampDetailComponent },
    { path: 'bookCamp/:CampId', component: CampBookingComponent },
    { path: 'allCamps', component: AllCampsComponent, canActivate: [AuthGuard], },
    { path: 'manageBooking', component: ManagebookingComponent },
    { path: 'editbooking/:id', component: EditbookingComponent },
    { path: 'AdminLogin', component: LoginComponent },
    {
        path: 'UpdateCamp/:id', component: CampUpdateComponent, canActivate: [AuthGuard],
    },
    { path: '500', component: InternalServerComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map