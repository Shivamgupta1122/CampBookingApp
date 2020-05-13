import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/Service/booking.service';
import { ErrorHandlerService } from '../Service/error-handler.service';

@Component({
  selector: 'app-editbooking',
  templateUrl: './editbooking.component.html',
  styleUrls: ['./editbooking.component.css'],
})
export class EditbookingComponent implements OnInit {
  referenceNumber: string;
  requiredBooking;
  isFutureBooking:boolean=false;
  public errorMessage: string = '';
  constructor(
    private services: BookingService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}
  /**
   * get reference number of booking to be edited and then call getBookingByReferenceNumber 

   * to fetch booking details of that particular booking

   */

  ngOnInit(): void {

    this.referenceNumber = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.referenceNumber)
    this.services
      .getBookingByReferenceNumber(this.referenceNumber)
      .subscribe((res) => {
        this.isFutureBooking= new Date() < new Date(res["checkInDate"])
        this.requiredBooking = res;
        console.log(this.isFutureBooking)
        console.log(this.requiredBooking)
      },
      (error) =>{
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
/**

 * Delete the booking using its reference number and then navigate to AllCampDetails page

 * @param referenceNumber booking reference number

 */
  DeleteBooking(referenceNumber: string) {
    console.log(referenceNumber)
    this.services.deleteBooking(referenceNumber).subscribe(() => {
      this.router.navigate(['/Camp/AllCampDetails']);
    }),(err: HttpErrorResponse) => {
      window.alert('You are not allowed to cancel past bookings..')
    };
  }
}