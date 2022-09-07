import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { DepartmentInfoModel } from 'src/app/models/hr-management-models/depatmentModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DepartmentService } from 'src/app/services/hr-management-service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: [
  ]
})
export class DepartmentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private deptInfoFormService: DepartmentService) { }

  public itemList: DepartmentInfoModel[] = [];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
  
 

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }
  getAll() {
    this.deptInfoFormService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })

  }

  public deptInfoForm = this.formBuilder.group({
    departmentId: [0],
    departmentName: ['', Validators.required],
  })

  get departmentName() { return this.deptInfoForm.get("departmentName") };
 

  pupulateForm(selectedRecord: DepartmentInfoModel) {
    this.deptInfoForm.patchValue({
      departmentId: selectedRecord.departmentId,
      departmentName: selectedRecord.departmentName,
  });

  }

  onSubmit() {
    if(this.deptInfoForm.valid){
      this.deptInfoFormService.departmentInfoModel.departmentId = this.deptInfoForm.value.departmentId || 0;
      this.deptInfoFormService.departmentInfoModel.departmentName = this.deptInfoForm.value.departmentName;  
      if (this.deptInfoForm.value.departmentId == 0 || this.deptInfoForm.value.departmentId == null) {
        this.insert();
      }
      else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true;
    }

   
  };

  insert() {
    this.deptInfoFormService.insert().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Dept Info Save successfully");
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
    
      }
      else {
        this.toastr.error("Invalid Entry", data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Try Again");
    })
  }

  update() {
    this.deptInfoFormService.update().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Dept Info Updated successfully");
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
        
      }
      else {
        this.toastr.error("Invalid Entry", data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Something is wrong. Please Try Again");
    })
  }

  onDelete(id: any) {
    if (confirm("Are u sure to delete this recored ?")) {
      this.deptInfoFormService.delete(id).subscribe(
        res => {
          this.toastr.success("Delete successfully")
          this.getAll();
        },
        err => {
          this.toastr.success("Delete Failed")
          console.log(err)
        }
      )
    }
  }

  clearForm() {
    this.deptInfoForm.reset();
    this.formSubmitAttempt=false;
    this.deptInfoForm.get('departmentId')?.setValue('');
    this.deptInfoForm.get('departmentName')?.setValue('');
  }

}
