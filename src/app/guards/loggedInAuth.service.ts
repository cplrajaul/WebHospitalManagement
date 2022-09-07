import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Constants } from "../Helper/constants";

@Injectable({
    providedIn: 'root'
  })
export class LoggedInAuthGuard  implements CanActivate {

    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const user = JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
      if (user && user.userName) {
        this.router.navigate([""]);
        return false;
      } else {
        return true;
      } 
    }
  }