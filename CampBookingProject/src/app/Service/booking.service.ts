import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Booking } from '../Models/booking.model';

@Injectable()

export class BookingService{
   public data;
   readonly Url= "https://localhost:44324/Api"
   private currentUserSubject: BehaviorSubject<Booking>;
   public currentBooking: Observable<Booking>;
   constructor(private http: HttpClient) { }
   postBooking(booking:Booking)
   {
       return this.http.post<any>(this.Url+'/Booking/InitiateBooking', booking)
   }
  
   deleteBooking(bookingRefNo:string){
      return this.http.delete<any>(this.Url+`/Booking/CancelBooking/${bookingRefNo}`)
   }
   getBookingByReferenceNumber(bookingRefNo:string){
    return this.http.get<any>(this.Url+`/Booking/GetBooking/${bookingRefNo}`)
 }
    getBookingById(bookingId:string)
    {                           
        return this.http.get<Booking>(this.Url+`/${bookingId}`);
    }

    bookCamp(data) {
        console.log(data)
   //use angular http to save data
    return this.http.post(this.Url + '/Booking/InitiateBooking',data);
}
}