import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { Constants } from './Helper/constants';
import { UserModel } from './Models/user-auth-models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public loaderMessage: string = "loading test";
  title = 'webAuth';
  public hideNav: boolean = false;
  constructor(private router: Router) {
    // router.events.subscribe((url:any) =>{
    //      if(router.url=='/sign-in' || router.url=='/sign-up'){
    //       this.hideNav=true;
    //      }
          
    //     });
  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): UserModel {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}') as UserModel;
  }

  // get isAdmin(): boolean {
  //   return this.user.roles.indexOf('Admin') > -1;
  // }
  // get isUser(): boolean {
  //   return this.user.roles.indexOf('User') > -1 && !this.isAdmin;
  // }
}
