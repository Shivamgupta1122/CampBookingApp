import { OnInit, Component } from '@angular/core';
import { CampService } from '../Service/camp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camp } from '../Models/camp.model';
import { BookingService } from '../Service/booking.service';
import { ErrorHandlerService } from '../Service/error-handler.service';
@Component({
    selector : 'app-campbook',
    templateUrl : './camp-book.component.html',
    styleUrls : ['./camp-book.component.css']
})
export class CampBookingComponent implements OnInit
{
  public errorMessage: string = '';
  weekdays : number = 0;
  nonWeekdays : number =0 ;
  weekEndAmnt : number = 0;
  weekDayAmnt : number =0 ;
  TotalAmount : number = 0 ;
    Camp : Camp
    campId:number
    public bookForm:FormGroup;
    capacityControl:FormControl;
    checkinControl:FormControl;
    checkoutControl:FormControl;
    billingaddressControl:FormControl;
    stateControl:FormControl;
    countryControl:FormControl;
    phoneControl:FormControl;
    zipcodeControl:FormControl; 
    guestcontrol : FormControl 
    constructor(private bookingService:BookingService,private campService : CampService,private router:Router,private activatedRouter:ActivatedRoute, private errorHandler: ErrorHandlerService) { }
    file: File;
    base64textString: string
    imageUrl: string | ArrayBuffer ;
    fileName: string = "No file selected" 
    CountWeekDays(checkin, checkout) 
    {
      let bookingCheckin = new Date(checkin);
      let bookingCheckout = new Date(checkout);
      for (let dt: Date = bookingCheckin; dt < bookingCheckout; dt.setDate(dt.getDate() + 1)) 
      {
        if((dt.getDay() >=1) &&(dt.getDay() <= 5))
        {
          this.weekdays ++;
        }
        else
        {
          this.nonWeekdays++;
        }
      }
    }
    ngOnInit(): void {
      this.campId = +this.activatedRouter.snapshot.paramMap.get('CampId')
      console.log("inside booking component ngoninit campid")
      console.log(this.campId)
      this.campService.getCampById((this.campId)).subscribe((response:Camp)=>{
        this.Camp = response
        this.imageUrl = this.Camp.imageURL
        
      })
        this.capacityControl = new FormControl('',[Validators.required]);
        this.checkinControl = new FormControl('',[Validators.required]);
        this.checkoutControl = new FormControl('',[Validators.required]);
        this.billingaddressControl = new FormControl('',[Validators.required])
        this.stateControl = new FormControl('',[Validators.required])
        this.zipcodeControl = new FormControl('',[Validators.required])
        this.phoneControl = new FormControl('',[Validators.required])
        this.countryControl = new FormControl('',[Validators.required])  
        this.guestcontrol = new FormControl('',[Validators.required])
        this.bookForm = new FormGroup({
          TotalNights:this.capacityControl,
          CheckInDate: this.checkinControl,
          CheckOutDate: this.checkoutControl,
          billingaddress: this.billingaddressControl,
          state: this.stateControl,
          zipcode: this.zipcodeControl,
          CellPhone: this.phoneControl,
          country: this.countryControl,
          NumberOfGuests : this.guestcontrol
        })
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }

  OnFormSubmit(){
    if(this.bookForm.untouched)
    {
      window.alert("Fields cannot be blank")
    }
    else
    {
    this.CountWeekDays(this.checkinControl.value, this.checkoutControl.value)
    this.TotalAmount = (((this.weekdays * this.Camp.priceforWeekdays) + (this.nonWeekdays * this.Camp.priceforWeekends) ) * this.guestcontrol.value)
    this.bookForm.value["CampId"] = this.campId
    this.bookForm.value["UserId"] = 1
    this.bookForm.value["FinalAmount"] = this.TotalAmount
    this.bookingService.data = this.bookForm.value
    this.router.navigateByUrl('/confirmbooking')
    }
    
  }
  }
