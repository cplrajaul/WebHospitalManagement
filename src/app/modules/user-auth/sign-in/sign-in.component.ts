import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserModel } from 'src/app/Models/user-auth-models/user-model';
import { UserService } from 'src/app/services/user-auth-services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }
  public signInForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })

  get userName(){ return this.signInForm.get('userName')};
  get password(){ return this.signInForm.get('password')};

  isCheckedValue:boolean = false;
  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.isCheckedValue = true; 
    }
  }
  onSubmit() { 
    console.log("on submit")
    let userName = this.signInForm.controls["userName"].value;
    let password = this.signInForm.controls["password"].value;
    let isChecked = this.isCheckedValue;
    this.userService.singIn(userName, password, isChecked).subscribe((data: ResponseModel) => {

      if (data.responseCode == 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dateSet));
        // let user = data.dateSet as User;
        // if (user.roles.indexOf('Admin') > -1)
           this.router.navigate([""]);
           location.reload();
        // else {

        //   this.router.navigate(["/user-management"]);
        // }
      }else{
        this.toastr.error(data.responseMessage);
      }
      console.log("response", data);
    }, error => {
     
      console.log("error", error)
    })
  }

}
