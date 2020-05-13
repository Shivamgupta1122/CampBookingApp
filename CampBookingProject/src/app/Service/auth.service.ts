import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({    
    providedIn: 'root'    
  })
export class AuthService
{
    private isAdminHeader = new BehaviorSubject(false);
    sharedMessage = this.isAdminHeader.asObservable();    
     Url : string= `https://localhost:44324`
    isAdmin(message: boolean) {
        this.isAdminHeader.next(message);
      }
    constructor(private http: HttpClient) { }
    UserAuthentication(userName: string, password: string) {
        var data =
          'UserName=' + userName + '&Password=' + password + '&grant_type=password';
          console.log('inside service')
          console.log(data)
        var reqHeader = new HttpHeaders({
          'Context-Type': 'application/x-www-form-urlencoded',
        });
        console.log(reqHeader)
        return this.http.post(this.Url+'/token', data, {
          
          headers: reqHeader,
          
        });
        console.log('After post')
        console.log('header')
       
      }
}
