import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { DesignationInfoModel } from 'src/app/models/hr-management-models/designation-model';
import { ResponseModel } from 'src/app/models/responseModel';
import { DesignationService } from 'src/app/services/hr-management-service/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styles: [
  ]
})
export class DesignationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private desigInfoService: DesignationService) { }

  public itemList: DesignationInfoModel[] = [];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;



  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }
  getAll() {
    this.desigInfoService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })

  }

  public designationForm = this.formBuilder.group({
    designationId: [0],
    designationName: ['', Validators.required],
   
  })

  get designationName() { return this.designationForm.get("designationName") };
  

  pupulateForm(selectedRecord: DesignationInfoModel) {
    this.designationForm.patchValue({
      designationId: selectedRecord.designationId,
      designationName: selectedRecord.designationName,
    
      
    });
   
  }

  onSubmit() {
    if(this.designationForm.valid){
      this.desigInfoService.designationModel.designationId = this.designationForm.value.designationId || 0;
      this.desigInfoService.designationModel.designationName = this.designationForm.value.designationName;
      if (this.designationForm.value.designationId == 0 || this.designationForm.value.designationId == null) {
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
    this.desigInfoService.insert().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Dept Info Save successfully");
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();;
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
    this.desigInfoService.update().subscribe((data: ResponseModel) => {
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
      this.desigInfoService.delete(id).subscribe(
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
    this.designationForm.reset();
    this.formSubmitAttempt=false;
    this.designationForm.get('designationId')?.setValue('');
    this.designationName?.get('designationName')?.setValue('');
  }

}
