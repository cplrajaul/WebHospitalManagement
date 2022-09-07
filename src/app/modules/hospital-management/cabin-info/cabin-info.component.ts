import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { CabinInfoModel } from 'src/app/models/hospital-management-models/cabinInfoModel';
import { CabinTypeModel } from 'src/app/models/hospital-management-models/cabinTypeModel';

import { ResponseModel } from 'src/app/models/responseModel';
import { CabinInfoService } from 'src/app/services/hospital-management-services/cabin-info.service';
import { CabinTypeService } from 'src/app/services/hospital-management-services/cabin-type.service';

@Component({
  selector: 'app-cabin-info',
  templateUrl: './cabin-info.component.html',
  styles: [
  ]
})
export class CabinInfoComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private cabinInfoService: CabinInfoService,
    private cabinTypeService:CabinTypeService ) { }

  public cabinTypeList:CabinTypeModel[]=[];
  public itemList:CabinInfoModel[]=[];
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/cabin_images/";
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getCabinTypeList();
  }

  handleFileInput(e: any) {

    const reader = new FileReader();

    if (e?.target?.files && e?.target?.files.length) {
     
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);

      reader.onload = () => {
        this.filePath = reader.result as string;
        this.cabinInfoEntryForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  getAll() {
    this.cabinInfoService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }



  public cabinInfoEntryForm = this.formBuilder.group({
    cabinId: [0],
    cabinName: ['', Validators.required],
    cabinTypeId: ['', Validators.required],
    cabinSize: ['', Validators.required],
    floorNo: ['', Validators.required],
    costPerDay: ['', Validators.required],
   
    cabinDirection: ['', Validators.required],
    imageName: ['']
  })
  get cabinName() { return this.cabinInfoEntryForm.get("cabinName") };
  get cabinTypeId() { return this.cabinInfoEntryForm.get("cabinTypeId") };
  get cabinSize() { return this.cabinInfoEntryForm.get("cabinSize") };
  get floorNo() { return this.cabinInfoEntryForm.get("floorNo") };
  get costPerDay() { return this.cabinInfoEntryForm.get("costPerDay") };
  
  get cabinDirection() { return this.cabinInfoEntryForm.get("cabinDirection") };


  pupulateForm(selectedRecord: CabinInfoModel) {
    this.cabinInfoEntryForm.patchValue({
      cabinId: selectedRecord.cabinId,
      cabinName: selectedRecord.cabinName,
      cabinTypeId:selectedRecord.cabinTypeId,
      cabinSize:selectedRecord.cabinSize,
      floorNo:selectedRecord.floorNo,
      costPerDay:selectedRecord.costPerDay,
     
      cabinDirection:selectedRecord.cabinDirection,
      imageName:selectedRecord.imageName
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
   
  }


  onSubmit() {
    if(this.cabinInfoEntryForm.valid){
      debugger;
      if (this.cabinInfoEntryForm.value.cabinId == 0 || this.cabinInfoEntryForm.value.cabinId==null) {
        this.insert();
      }
      else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true;
    }
  
    
  }
  getCabinTypeList(){
    this.cabinTypeService.getAll().subscribe((data:any) => {
      this.cabinTypeList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  insert() {
    const formData: FormData = new FormData();
    formData.append('CabinId', this.cabinInfoEntryForm.value.cabinId);
    formData.append('CabinName', this.cabinInfoEntryForm.value.cabinName);
    formData.append('CabinTypeId', this.cabinInfoEntryForm.value.cabinTypeId);
    formData.append('CabinSize', this.cabinInfoEntryForm.value.cabinSize);
    formData.append('FloorNo', this.cabinInfoEntryForm.value.floorNo);
    formData.append('CostPerDay', this.cabinInfoEntryForm.value.costPerDay);
    // formData.append('BookingStatus', this.cabinInfoEntryForm.value.bookingStatus);
    formData.append('CabinDirection', this.cabinInfoEntryForm.value.cabinDirection);
    formData.append('Photo', this.fileToUpload);

    formData.append("ImageName", this.cabinInfoEntryForm.value.imageName);


    this.cabinInfoService.insert(formData).subscribe((data: ResponseModel) => {
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
    const formData: FormData = new FormData();
    formData.append('CabinId', this.cabinInfoEntryForm.value.cabinId);
    formData.append('CabinName', this.cabinInfoEntryForm.value.cabinName);
    formData.append('CabinTypeId', this.cabinInfoEntryForm.value.cabinTypeId);
    formData.append('CabinSize', this.cabinInfoEntryForm.value.cabinSize);
    formData.append('FloorNo', this.cabinInfoEntryForm.value.floorNo);
    formData.append('CostPerDay', this.cabinInfoEntryForm.value.costPerDay);
    // formData.append('BookingStatus', this.cabinInfoEntryForm.value.bookingStatus);
    formData.append('CabinDirection', this.cabinInfoEntryForm.value.cabinDirection);
    debugger;
    formData.append('Photo', this.fileToUpload);

    formData.append("ImageName", this.cabinInfoEntryForm.value.imageName);

    this.cabinInfoService.update(formData).subscribe((data: ResponseModel) => {
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
       this.cabinInfoService.delete(id).subscribe(
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
    this.cabinInfoEntryForm.reset();
    this.filePath= "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
    this.fileToUpload='';
    this.cabinInfoEntryForm.get('cabinId')?.setValue('');
    this.cabinInfoEntryForm.get('cabinName')?.setValue('');
    this.cabinInfoEntryForm.get('cabinTypeId')?.setValue('');
    this.cabinInfoEntryForm.get('cabinSize')?.setValue('');
    this.cabinInfoEntryForm.get('floorNo')?.setValue('');
    this.cabinInfoEntryForm.get('costPerDay')?.setValue('');
    this.cabinInfoEntryForm.get('cabinDirection')?.setValue('');
    this.cabinInfoEntryForm.get('imageName')?.setValue('');

  }

}
