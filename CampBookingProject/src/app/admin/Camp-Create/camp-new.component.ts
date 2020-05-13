import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms'
import { Camp } from '../../Models/camp.model';
import { CampService } from '../../Service/camp.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
    selector : 'app-newcamp',
    templateUrl : './camp-new.component.html',
    styleUrls : ['./camp-new.component.css']
})
export class CampNewComponent implements OnInit
{
  public campForm:FormGroup;
  weekDayControl : FormControl;
  weekendControl : FormControl;
  capacityControl:FormControl;
  descriptionControl:FormControl;
  titleControl:FormControl;
  imageControl:FormControl;
  file: File;
   base64textString: string
   imageUrl: string | ArrayBuffer ;
   fileName: string = "No file selected" 
   enterImage:boolean=true;

  constructor(private services:CampService,private router:Router) { }
  ngOnInit() {
    this.weekDayControl = new FormControl('',[Validators.required]);
    this.weekendControl = new FormControl('', [Validators.required])
    this.capacityControl = new FormControl('',[Validators.required]);
    this.descriptionControl = new FormControl('',[Validators.required]);
    this.titleControl = new FormControl('',[Validators.required]);
    this.imageControl = new FormControl('')
    this.campForm = new FormGroup({

      Capacity:this.capacityControl,
      PriceForWeekDays : this.weekDayControl,
      PriceForWeekends : this.weekendControl,
      Description: this.descriptionControl,
      Title: this.titleControl,
      ImageURL: new FormControl('')
    })
  }
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
  OnFormSubmit(){
    this.campForm.value["ImageURL"] = 'data:image/jpg;base64,' + this.base64textString;
    console.log(this.campForm.value)
    this.services.createCamp(this.campForm.value).subscribe(()=>{
      this.router.navigateByUrl('/dashboard')
    });
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };

  }
}