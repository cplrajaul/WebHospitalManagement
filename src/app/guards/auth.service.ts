import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../Helper/constants';
import { UserModel } from '../Models/user-auth-models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
    if (user && user.userName) {
      return true;
    } else {
      this.router.navigate(["sign-in"]);
      return false;
    } 
  }
}
