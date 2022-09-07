import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { BedInfoModel } from 'src/app/models/hospital-management-models/bedInfoModel';
import { WardInfoModel } from 'src/app/models/hospital-management-models/wardInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { BedInfoService } from 'src/app/services/hospital-management-services/bed-info.service';
import { WardInfoService } from 'src/app/services/hospital-management-services/ward-info.service';

@Component({
  selector: 'app-bed-info',
  templateUrl: './bed-info.component.html',
  styles: [
  ]
})
export class BedInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private bedService: BedInfoService, private wardInfoService:WardInfoService) { }

  
  public itemList:BedInfoModel[]=[];
  public wardList:WardInfoModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getWardList();
  }

 

  getAll() {
    this.bedService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getWardList() {
    this.wardInfoService.getAll().subscribe((data:any) => {
      this.wardList = data;
      console.log(data);
      
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }


  public bedForm = this.formBuilder.group({
    bedId: [0],
    bedNo: ['', Validators.required],
    wardNo:['', Validators.required]
    
  })
 
  get bedNo() { return this.bedForm.get("bedNo") };
  get wardNo() { return this.bedForm.get("wardNo") };


  pupulateForm(selectedRecord: BedInfoModel) {
    this.bedForm.patchValue({
      bedId: selectedRecord.bedId,
      bedNo: selectedRecord.bedNo,
      wardNo:selectedRecord.wardNo
      
    });
  }
  onSubmit() {
    if(this.bedForm.valid){
      this.bedService.bedInfoModel.bedId=this.bedForm.value.bedId || 0;
      this.bedService.bedInfoModel.bedNo=this.bedForm.value.bedNo;
      this.bedService.bedInfoModel.wardNo=this.bedForm.value.wardNo || 0;
      if (this.bedForm.value.bedId == 0 || this.bedForm.value.bedId==null) {
        this.insert();
      }
      else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true;
    }
    
  }
  
  insert() {
    this.bedService.insert().subscribe((data: ResponseModel) => {
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
    this.bedService.update().subscribe((data: ResponseModel) => {
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
       this.bedService.delete(id).subscribe(
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
    this.bedForm.reset();
    this.formSubmitAttempt=false;
    
    this.bedForm.get('bedId')?.setValue('');
    this.bedForm.get('bedNo')?.setValue('');
    this.bedForm.get('wardNo')?.setValue('');

  }


}
