import { Component, OnInit } from '@angular/core'
import { Camp } from '../../../Models/camp.model'
import { Router } from '@angular/router'
import { CampService } from '../../../Service/camp.service'
import { BookingService } from '../../../Service/booking.service'
import { ErrorHandlerService } from '../../../Service/error-handler.service'

@Component({
    selector : 'app-all-camps',
    templateUrl : './all-camps.component.html',
    styleUrls : ['./all-camps.component.css']
})
export class AllCampsComponent implements OnInit
{
    public errorMessage: string = '';
    Camps : Camp[]
  loadingComplete : boolean = false

  constructor(
    private campService : CampService ,
    private bookingService : BookingService,
    private route : Router,
    private errorHandler: ErrorHandlerService   

  ) { 

  }

  ngOnInit(): void {
    this.allCamps()
  }

  private allCamps(){
    this.campService.getAllCamps()
    .subscribe((response : Camp[]) => {
      this.Camps = response
      this.loadingComplete = true;
      console.log(response)
    },
    (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
   
  }

  deleteCamp(camp: Camp) {
    this.campService.deleteCamp(camp.id)
      .subscribe((camp : Camp) => {
          console.log(camp)
          console.log('is deleted')
       // this.allCamps();
      });
  }

  updateCamp(camp:Camp){    
    this.route.navigate(['/UpdateCamp', camp.id]);

    console.log("Update Available")
  }

  navigateToCreateCamp(){
    this.route.navigateByUrl('/Camp/CreateCamp');

  }

}