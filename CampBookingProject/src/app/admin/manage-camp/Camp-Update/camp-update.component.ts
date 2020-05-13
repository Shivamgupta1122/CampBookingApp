import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camp } from '../../../Models/camp.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CampService } from '../../../Service/camp.service';
import { ErrorHandlerService } from '../../../Service/error-handler.service';

@Component({
    selector : 'app-campupdate',
    templateUrl : './camp-update.component.html',
    styleUrls : ['./camp-update.component.css']
})
export class CampUpdateComponent implements OnInit
{
  public errorMessage: string = '';
  Camp : Camp
  campId:number
  public campForm:FormGroup;
  weekdayControl:FormControl;
  weekendControl:FormControl;
  capacityControl:FormControl;
  descriptionControl:FormControl;
  titleControl:FormControl;
  imageControl:FormControl;
  textControl:FormControl;
  file: File;
   base64textString: string
   imageUrl: string | ArrayBuffer;
   fileName: string = "No file selected" 
   enterImage:boolean=true;
  constructor(private services:CampService,private router:Router,private activatedRouter:ActivatedRoute, private errorHandler: ErrorHandlerService) { }
 /**
  * Get the campId from the activated route snapshot and then get the details of that camp by its
  * campId
  */
  ngOnInit() {

    this.campId= +this.activatedRouter.snapshot.paramMap.get('id')
    console.log('inside Update Camp Component')
    console.log(this.campId)
    this.services.getCampById((this.campId)).subscribe((response:Camp)=>{
      this.Camp = response
      this.imageUrl = this.Camp.imageURL
      console.log(this.Camp)
    })
    this.weekdayControl = new FormControl('',[Validators.required]);
    this.weekendControl = new FormControl('',[Validators.required])
    this.capacityControl = new FormControl('',[Validators.required]);
    this.descriptionControl = new FormControl('',[Validators.required]);
    this.titleControl = new FormControl('',[Validators.required]);
    this.textControl = new FormControl('',[Validators.required]);
    this.imageControl = new FormControl('')
    this.campForm = new FormGroup({
      PriceForWeekDays: this.weekdayControl,
      PriceForWeekends : this.weekendControl,
      Capacity:this.capacityControl,
      Description: this.descriptionControl,
      Title: this.titleControl,
      ImageURL: new FormControl('')
    })
    
  }
  /**
   * Handle the image input 
   */
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }
  onFileChange(file: File) {
    if (file) {
      this.enterImage = false
      this.fileName = file.name
      this.file = file
      const reader = new FileReader()
      const reader2 = new FileReader()
      reader.onload =this.handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file);
      reader2.readAsDataURL(file)
      reader2.onload = event => {
          this.imageUrl = reader2.result;
        };
    }
  }
 /**
  * get the form data and then post the data to UpdateCamp() method
  */
  OnFormSubmit(){
    if(!this.base64textString){
      this.campForm.value["ImageURL"] = this.imageUrl
    }
    else{
    this.campForm.value["ImageURL"] = 'data:image/jpg;base64,' + this.base64textString;
    }
    this.campForm.value["id"] = this.campId
    console.log("Before subscribe")
    console.log(this.campForm.value)
    this.services.updateCamp(this.campForm.value)    
    .subscribe(()=>{
      console.log("Inside subscribe")
      console.log(this.campForm.value)
      this.router.navigate(['/dashboard']);
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}