import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { WardInfoModel } from 'src/app/models/hospital-management-models/wardInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { WardInfoService } from 'src/app/services/hospital-management-services/ward-info.service';

@Component({
  selector: 'app-ward-info',
  templateUrl: './ward-info.component.html',
  styles: [
  ]
})
export class WardInfoComponent implements OnInit {

  public wardList:WardInfoModel[]=[];
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/ward_images/";
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private wardinfoService: WardInfoService) { }
  
  ngOnInit(): void { 
    this.clearForm();
    this.getAll();
  }
 

  handleFileInput(e: any) {

    const reader = new FileReader();

    if (e?.target?.files && e?.target?.files.length) {
     
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);

      reader.onload = () => {
        this.filePath = reader.result as string;
        this.wardinfo_form.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  pupulateForm(selectedRecord: WardInfoModel) 
  {
    this.wardinfo_form.patchValue({
       wardNo:selectedRecord.wardNo,
        wardName:selectedRecord.wardName,
        wardCost:selectedRecord.wardCost,
        // bookingStatus:selectedRecord.bookingStatus,
        floorNo:selectedRecord.floorNo,
        imageName:selectedRecord.imageName     
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }

  }

  public wardinfo_form = this.formBuilder.group({
    wardNo: [0,],
    wardName: ['', Validators.required],
    wardCost: ['', Validators.required],
    // bookingStatus: ['', Validators.required],
    floorNo: ['', Validators.required],
    imageName: ['',]

  })


  get wardName() { return this.wardinfo_form.get("wardName") };
  get wardCost() { return this.wardinfo_form.get("wardCost") };
  // get bookingStatus() { return this.wardinfo_form.get("bookingStatus") };
  get floorNo() { return this.wardinfo_form.get("floorNo") };

getAll(){
this.wardinfoService.getAll().subscribe((data: any) => {
      this.wardList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }



  onSubmit() {
    if (this.wardinfo_form.valid){
      if (this.wardinfo_form.value.wardNo == 0||this.wardinfo_form.value.wardNo ==null) {
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

    const formData: FormData = new FormData();   

    formData.append("WardNo", this.wardinfo_form.value.wardNo);
    formData.append("WardName", this.wardinfo_form.value.wardName);
    formData.append("WardCost", this.wardinfo_form.value.wardCost);
    // formData.append("BookingStatus", this.wardinfo_form.value.bookingStatus);
    formData.append("FloorNo", this.wardinfo_form.value.floorNo);
    debugger;
    formData.append('Photo', this.fileToUpload);
    formData.append("ImageName", this.wardinfo_form.value.imageName);

    
    this.wardinfoService.insert(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Ward Save Successfully");
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
      }
      else {
        this.toastr.error(data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Try Again");
    }
    )
  }
  update() {
    const formData: FormData = new FormData();     
    formData.append("WardNo", this.wardinfo_form.value.wardNo || '');
    formData.append("WardName", this.wardinfo_form.value.wardName || '');
    formData.append("WardCost", this.wardinfo_form.value.wardCost || '');
    // formData.append("BookingStatus", this.wardinfo_form.value.bookingStatus);
    formData.append("FloorNo", this.wardinfo_form.value.floorNo || '');
    formData.append('Photo', this.fileToUpload || '');
    formData.append("ImageName", this.wardinfo_form.value.imageName  || '');

    
    this.wardinfoService.update(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Ward Update Successfully");
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
      }
      else {
        this.toastr.error(data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Try Again");
    }
    )
  }

  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.wardinfoService.delete(id).subscribe(
       res=>{          
         this.toastr.success("Delete succfully");
         this.getAll();
        
       },
       err=>
       {
        this.toastr.error("Delete Failed")
         console.log(err)
        }
     )
   }
  }
  clearForm() {
    this.wardinfo_form.reset();
    this.filePath = "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt = false;
    this.fileToUpload='';
    this.wardinfo_form.get('wardNo')?.setValue('');
    this.wardinfo_form.get('wardName')?.setValue('');
    this.wardinfo_form.get('wardCost')?.setValue('');
    this.wardinfo_form.get('floorNo')?.setValue('');
    this.wardinfo_form.get('imageName')?.setValue('');
  }


}
