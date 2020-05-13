import { Component, OnInit } from "@angular/core";
import { userInfo } from 'os';

@Component({
    selector : 'app-user',
    templateUrl : './user.component.html',
    styleUrls : ['./user.component.css']
})
export class UserComponent implements OnInit
{
    selectedFilter:any = null
    constructor() { } 
    ngOnInit(): void {
    }
}