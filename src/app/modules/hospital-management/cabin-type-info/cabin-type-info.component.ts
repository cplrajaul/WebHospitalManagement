import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { CabinTypeModel } from 'src/app/models/hospital-management-models/cabinTypeModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CabinTypeService } from 'src/app/services/hospital-management-services/cabin-type.service';

@Component({
  selector: 'app-cabin-type-info',
  templateUrl: './cabin-type-info.component.html',
  styles: [
  ]
})
export class CabinTypeInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private cabinTypeService: CabinTypeService) { }

  
  public itemList:CabinTypeModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }

 

  getAll() {
    this.cabinTypeService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }



  public cabinTypeForm = this.formBuilder.group({
    cabinTypeId: [0],
    cabinTypeName: ['', Validators.required],
    
  })
 
  get cabinTypeName() { return this.cabinTypeForm.get("cabinTypeName") };
 


  pupulateForm(selectedRecord: CabinTypeModel) {
    this.cabinTypeForm.patchValue({
      cabinTypeId: selectedRecord.cabinTypeId,
      cabinTypeName: selectedRecord.cabinTypeName,
      
    });
  }
  onSubmit() {
    if(this.cabinTypeForm.valid){
      this.cabinTypeService.cabinTypeModel.cabinTypeId=this.cabinTypeForm.value.cabinTypeId || 0;
      this.cabinTypeService.cabinTypeModel.cabinTypeName=this.cabinTypeForm.value.cabinTypeName;
      if (this.cabinTypeForm.value.cabinTypeId == 0 || this.cabinTypeForm.value.cabinTypeId==null) {
        this.insert();
      }
      else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true
    }
    
  }
  
  insert() {
    this.cabinTypeService.insert().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
       
        this.getAll();
        this.clearForm();
        
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data);
    }, error => {
      console.log("error", error);
      this.toastr.error("Something went wrong please try again later");
    }
    )

  }

  update() {
    this.cabinTypeService.update().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
      
        this.getAll();
        this.clearForm();
        
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data);
    }, error => {
      console.log("error", error);
      this.toastr.error("Something went worng please try again later");
    }
    )
  }
  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
       this.cabinTypeService.delete(id).subscribe(
        res=>{
          // this.service.refreshList();
          this.getAll();   
          this.clearForm();
          this.toastr.success("Information Delete successfully")
        },
        err=>{
          this.toastr.error("Delete Failed");
          console.log(err)
        }
      )
    }
  }

  clearForm() {
    this.cabinTypeForm.reset();
    this.formSubmitAttempt=false;
    this.cabinTypeForm.get('cabinTypeId')?.setValue('');
    this.cabinTypeForm.get('cabinTypeName')?.setValue('');
  }

}
