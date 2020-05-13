import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
    selector : 'app-main',
    templateUrl : './container.component.html',
    styleUrls : ['./container.component.css']
})
export class ContainerComponent
{
    message: boolean;
    constructor(private router: Router, private service: AuthService) {}
    ngOnInit(): void {
        this.service.sharedMessage.subscribe((message) => (this.message = message));
      }
    logOut() {
        this.service.isAdmin(false);
        localStorage.removeItem('userToken');
        this.router.navigate(['/AdminLogin']);
      }
}