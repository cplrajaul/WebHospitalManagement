import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { ResponseModel } from 'src/app/models/responseModel';
import { RoleModel } from 'src/app/models/user-auth-models/role-model';
import { UserService } from 'src/app/services/user-auth-services/user.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styles: [
  ]
})
export class ManageRoleComponent implements OnInit {

  public actionName: string = "Add Role";
  public roleList: RoleModel[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, public userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllRole();
  }
  public roleForm = this.formBuilder.group({
    roleId: ['',],
    roleName: ['', Validators.required]
  })
  onSubmit() {
    if (this.roleForm.value.roleId == null || this.roleForm.value.roleId == '') {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }
  insertRecord() {
    const formData: FormData = new FormData();
    formData.append('RoleId', this.roleForm.value.roleId);
    formData.append('RoleName', this.roleForm.value.roleName);
    this.userService.roleAdd(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
        this.getAllRole();
        this.clearForm()
      } else {
        this.toastr.error(data.responseMessage);
      }
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  updateRecord() {
    const formData: FormData = new FormData();
    formData.append('RoleId', this.roleForm.value.roleId);
    formData.append('RoleName', this.roleForm.value.roleName);
    this.userService.roleUpdate(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
        this.getAllRole();
        this.clearForm();
        this.actionName = "Add Role"
      } else { 
        this.toastr.error(data.responseMessage);
      }
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getAllRole() {
    this.userService.getAllRole().subscribe((data: ResponseModel) => {
      this.roleList = data.dateSet;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  pupulateForm(selectedRecord: RoleModel) {
    this.roleForm.patchValue({
      roleId: selectedRecord.id,
      roleName: selectedRecord.name,
    });
    this.actionName = "Update Role"
  }
  onDelete(selectedRecord: RoleModel) { 
    if (confirm("Are u sure to delete this recored ?")) {
      {
        const formData: FormData = new FormData();
        formData.append('RoleId', selectedRecord.id || '{}');
        formData.append('RoleName',selectedRecord.name || '{}');
        this.userService.deleteRecord(formData).subscribe((data: ResponseModel) => {
          if (data.responseCode == ResponseCode.OK) {
            this.toastr.success(data.responseMessage);
            this.getAllRole();
            this.clearForm();
          } else {
            this.toastr.error(data.responseMessage);
          }
        }, error => {
          console.log("error", error)
          this.toastr.error("Something went wrong please try again later");
        }
        )
      }
    }
  }
  clearForm() {
    this.roleForm.reset();
  }
}
