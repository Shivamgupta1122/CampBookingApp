import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../Service/booking.service';
import { CampService } from '../Service/camp.service';
import { Camp } from '../Models/camp.model';

@Component({
    selector: 'app-confirmbooking',
    templateUrl : './confirmbooking.component.html',
    styleUrls : ['./confirmbooking.component.css']
})
export class BookingConfirmComponent implements OnInit
{
    camp : any;
    data;
    constructor(
        private route: ActivatedRoute,
        private bookingService: BookingService,
        private campService : CampService,
        private readonly router : Router
    ){}
    ngOnInit(){
        this.data = this.bookingService.data
        console.log(this.data)
        this.campService.getCampById(this.data.CampId).subscribe((response)=>
        {
            this.camp = response;
            console.log(this.camp)
        })
    }
  
    bookCamp(data)
    {
        this.bookingService.bookCamp(this.data).subscribe((response)=>{
            window.alert("Your booking Reference number is:"+response);
            this.router.navigate(['/dashboard']);
          })
    }
    editCamp(camp : Camp)
    {
        this.router.navigate(['/bookCamp',camp.id]);
    }
}