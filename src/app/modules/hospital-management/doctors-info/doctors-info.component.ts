
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { DoctorsInfoModel } from 'src/app/models/hospital-management-models/doctorsInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DoctorsInfoService } from 'src/app/services/hospital-management-services/doctors-info.service';

@Component({
  selector: 'app-doctors-info',
  templateUrl: './doctors-info.component.html',
  styles: [
  ]
})
export class DoctorsInfoComponent implements OnInit {
  filePath: string = "../../../../assets/dist/img/loding.gif";
  noImage:string = "../../../../assets/dist/img/noImage.png"
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/doctor_images/";
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private doctorService: DoctorsInfoService) { }
  public itemList:DoctorsInfoModel[]=[];
  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }
  getAll(){
    this.doctorService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  handleFileInput(e: any) {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files.length) {
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.doctorsInfoForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  public doctorsInfoForm = this.formBuilder.group({
    doctorId: [0],
    doctorName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
    specialist: ['', [Validators.required, Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.maxLength(15)]],
    address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]],
    qualification: ['', [Validators.required, Validators.maxLength(80)]],
    dutyStartTime: ['',],
    dutyEndTime: [''],
    joinDate: [''],
    resignDate: [''],
    doctorType: ['', [Validators.required]],
    commissionStatus: [0],
    imageName: ['']
  })
  get doctorName() { return this.doctorsInfoForm.get("doctorName") }
  get specialist() { return this.doctorsInfoForm.get("specialist") }

  get phone() { return this.doctorsInfoForm.get("phone") }
  get address() { return this.doctorsInfoForm.get("address") }
  get qualification() { return this.doctorsInfoForm.get("qualification") }
  get doctorType() { return this.doctorsInfoForm.get("doctorType") }
  get commissionStatus() { return this.doctorsInfoForm.get("commissionStatus") }

  pupulateForm(selectedRecord: DoctorsInfoModel) {
    this.doctorsInfoForm.patchValue({
      doctorId: selectedRecord.doctorId,
      doctorName: selectedRecord.doctorName,
      specialist: selectedRecord.specialist,
      phone: selectedRecord.phone,
      address: selectedRecord.address,
      qualification: selectedRecord.qualification,
      dutyStartTime: selectedRecord.dutyStartTime,
      dutyEndTime:  selectedRecord.dutyEndTime,
      joinDate:  selectedRecord.joinDate,
      doctorType: selectedRecord.doctorType,
      commissionStatus: selectedRecord.commissionStatus,
      imageName: selectedRecord.imageName,
      
    
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName;
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
  }

  onSubmit() {
    if(this.doctorsInfoForm.valid){
      if (this.doctorsInfoForm.value.doctorId == 0||this.doctorsInfoForm.value.doctorId == null) {
        this.insert();
      } else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true;
    }
    
  }
  insert() {
    const formData: FormData = new FormData();
    formData.append('DoctorId', this.doctorsInfoForm.value.doctorId);
    formData.append('DoctorName', this.doctorsInfoForm.value.doctorName);
    formData.append('Specialist', this.doctorsInfoForm.value.specialist);
    formData.append('DoctorType', this.doctorsInfoForm.value.doctorType);
    formData.append('Phone', this.doctorsInfoForm.value.phone);
    formData.append('Address', this.doctorsInfoForm.value.address);
    formData.append('Qualification', this.doctorsInfoForm.value.qualification);
    formData.append('DutyStartTime', this.doctorsInfoForm.value.dutyStartTime);
    formData.append('DutyEndTime', this.doctorsInfoForm.value.dutyStartTime);
    formData.append('JoinDate', this.doctorsInfoForm.value.joinDate);
    formData.append('ResignDate', this.doctorsInfoForm.value.resignDate);
    formData.append('CommissionStatus', this.doctorsInfoForm.value.commissionStatus);
    formData.append('Photo', this.fileToUpload);
    formData.append("ImageName", this.doctorsInfoForm.value.imageName);
    this.doctorService.insert(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
        
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data)
    }, err => {
      console.log("error", err);
      this.toastr.error("Something went wrong try again later")
    })
  }
  update() {
    const formData: FormData = new FormData();
    formData.append('DoctorId', this.doctorsInfoForm.value.doctorId);
    formData.append('DoctorName', this.doctorsInfoForm.value.doctorName);
    formData.append('Specialist', this.doctorsInfoForm.value.specialist);
    formData.append('DoctorType', this.doctorsInfoForm.value.doctorType);
    formData.append('Phone', this.doctorsInfoForm.value.phone);
    formData.append('Address', this.doctorsInfoForm.value.address);
    formData.append('Qualification', this.doctorsInfoForm.value.qualification);
    formData.append('DutyStartTime', this.doctorsInfoForm.value.dutyStartTime || '');
    formData.append('DutyEndTime', this.doctorsInfoForm.value.dutyStartTime || '');
    formData.append('JoinDate', this.doctorsInfoForm.value.joinDate || '');
    formData.append('ResignDate', this.doctorsInfoForm.value.resignDate || '');
    formData.append('CommissionStatus', this.doctorsInfoForm.value.commissionStatus || '');
    formData.append('Photo', this.fileToUpload || '');
    formData.append("ImageName", this.doctorsInfoForm.value.imageName  || '');
    this.doctorService.update(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
        
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data)
    }, err => {
      console.log("error", err);
      this.toastr.error("Something went wrong try again later")
    })
  }
  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.doctorService.delete(id).subscribe(
       res=>{
          this.getAll();
         this.toastr.success("Delete succfully");
        
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
    this.doctorsInfoForm.reset();
    this.filePath= "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
   
    this.fileToUpload='';
    this.doctorsInfoForm.get('doctorId')?.setValue('');
    this.doctorsInfoForm.get('doctorName')?.setValue('');
    this.doctorsInfoForm.get('specialist')?.setValue('');
    this.doctorsInfoForm.get('phone')?.setValue('');
    this.doctorsInfoForm.get('address')?.setValue('');
    this.doctorsInfoForm.get('qualification')?.setValue('');
    this.doctorsInfoForm.get('dutyStartTime')?.setValue('');
    this.doctorsInfoForm.get('resignDate')?.setValue('');
    this.doctorsInfoForm.get('doctorType')?.setValue('');
    this.doctorsInfoForm.get('commissionStatus')?.setValue('');
    this.doctorsInfoForm.get('dutyEndTime')?.setValue('');
    this.doctorsInfoForm.get('joinDate')?.setValue('');
    this.doctorsInfoForm.get('imageName')?.setValue('');
  }
  
}
