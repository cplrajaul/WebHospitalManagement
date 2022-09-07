import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserModel } from 'src/app/Models/user-auth-models/user-model';
import { UserRolesModal } from 'src/app/models/user-auth-models/user-roles-modal';
import { UserService } from 'src/app/services/user-auth-services/user.service';

@Component({
  selector: 'app-manage-user-account',
  templateUrl: './manage-user-account.component.html',
  styles: [
  ]
})
export class ManageUserAccountComponent implements OnInit {

  public userList:UserModel []=[]
  public userRoles:UserRolesModal [] = []; 
  constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUser().subscribe((data: ResponseModel) => {
      this.userList = data.dateSet;
      console.log(data);
    }, error => { 
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getUserRoles(id: string) {
    this.userService.getUserRoles(id).subscribe((data: UserRolesModal[]) => {
      this.userRoles = data;
      console.log(data);
      debugger;
    }, error => { 
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
}
