import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private storage:StorageService
  ) {}

 async canActivate() {
    var x=false;
    await this.authentication.isLogado().then((d)=>{
      x = d
    });
    if (!x) {
    
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}