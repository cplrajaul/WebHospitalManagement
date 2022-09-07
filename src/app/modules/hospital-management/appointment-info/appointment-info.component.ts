
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { AppointmentInfoEntryModel } from 'src/app/models/hospital-management-models/appointmentInfoEntryModel';
import { DoctorsInfoModel } from 'src/app/models/hospital-management-models/doctorsInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AppointmentInfoService } from 'src/app/services/hospital-management-services/appointment-info.service';
import { DoctorsInfoService } from 'src/app/services/hospital-management-services/doctors-info.service';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styles: [
  ]
})
export class AppointmentInfoComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private toastr:ToastrService, private appointmentInfoService: AppointmentInfoService, private doctorInfoService:DoctorsInfoService) { }
  public doctorList:DoctorsInfoModel[]=[];
  public formSubmitAttempt: boolean= false;
  public itemList: AppointmentInfoEntryModel[]=[];
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getDoctorList();
  }
  getAll() {
    this.appointmentInfoService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  
  public appointmentInfoForm=this.formBuilder.group({
    appointmentId :[0],
    appointmentDate :['', [Validators.required,Validators.maxLength(15)]],
    doctorId :["", Validators.required], 
    serialNo :[0], 
    appointmentTime :['', Validators.required], 
    patientName:['', Validators.required],
    phoneNo:['', Validators.required],
    nextAppointmentDate :[''], 
    remark :['', Validators.required]
  })

  get appointmentId(){return this.appointmentInfoForm.get("appointmentId")};
  get appointmentDate(){return this.appointmentInfoForm.get("appointmentDate")};
  get doctorId(){return this.appointmentInfoForm.get("doctorId")};
  // get serialNo(){return this.appointmentInfoForm.get("serialNo")};
  get appointmentTime(){return this.appointmentInfoForm.get("appointmentTime")};
  get patientName(){return this.appointmentInfoForm.get("patientName")};
  get phoneNo(){return this.appointmentInfoForm.get("phoneNo")};
  
  get remark(){return this.appointmentInfoForm.get("remark")};


  pupulateForm(selectedRecord: AppointmentInfoEntryModel) {
    this.appointmentInfoForm.patchValue({
      appointmentId: selectedRecord.appointmentId,
      appointmentDate: selectedRecord.appointmentDate,
      doctorId: selectedRecord.doctorId,
      serialNo: selectedRecord.serialNo,
      appointmentTime: selectedRecord.appointmentTime,
      patientName:selectedRecord.patientName,
      phoneNo:selectedRecord.phoneNo,
      nextAppointmentDate: selectedRecord.nextAppointmentDate,
      remark: selectedRecord.remark,
    });
  
  }

  onSubmit(){
    if(this.appointmentInfoForm.valid){
      debugger;
    this.appointmentInfoService.appointmentInfoModel.appointmentId = this.appointmentInfoForm.value.appointmentId || 0;
    this.appointmentInfoService.appointmentInfoModel.appointmentDate = this.appointmentInfoForm.value.appointmentDate;
    this.appointmentInfoService.appointmentInfoModel.doctorId = this.appointmentInfoForm.value.doctorId;
    this.appointmentInfoService.appointmentInfoModel.serialNo = this.appointmentInfoForm.value.serialNo || 0;
    this.appointmentInfoService.appointmentInfoModel.appointmentTime = this.appointmentInfoForm.value.appointmentTime;
    this.appointmentInfoService.appointmentInfoModel.patientName = this.appointmentInfoForm.value.patientName;
    this.appointmentInfoService.appointmentInfoModel.phoneNo = this.appointmentInfoForm.value.phoneNo;
    this.appointmentInfoService.appointmentInfoModel.nextAppointmentDate = this.appointmentInfoForm.value.nextAppointmentDate;
    this.appointmentInfoService.appointmentInfoModel.remark = this.appointmentInfoForm.value.remark;
      if(this.appointmentInfoForm.value.appointmentId==0||this.appointmentInfoForm.value.appointmentId==null){
        this.insert();
      }
      else{
        this.update();
      }
    }else{
      this.formSubmitAttempt=true;
    }
    
  }

  getDoctorList(){
    this.doctorInfoService.getAll().subscribe((data:any) => {
      this.doctorList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }


  insert(){
    this.appointmentInfoService.insert().subscribe((data: ResponseModel)=>{
      if(data.responseCode==ResponseCode.OK){
        this.toastr.success(data.responseMessage)
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();

      }
      else{
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data)
    }, 
    error=>{console.log("error", error);
    this.toastr.error("Something Went Wrong, Please try again")
    })
  }

  update(){
    this.appointmentInfoService.update().subscribe((data: ResponseModel)=>{
      if(data.responseCode==ResponseCode.OK){
        this.toastr.success(data.responseMessage)
        this.getAll();
        this.clearForm();  
        this.closebutton.nativeElement.click();
   
      }
      else{
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data)
    }, 
    error=>{console.log("error", error);
    this.toastr.error("Something Went Wrong, Update Failed. Please try again")
    })
  }
  onDelete(id:number){
    
    if(confirm("Are you want to delete this recored?")){
       this.appointmentInfoService.delete(id).subscribe(
        res=>{
          this.toastr.success("Successfully Deleted")
          this.getAll();
        },
        err=>{
          this.toastr.error("Delete Failed");
          console.log(err)
        }
      )
    }
  }
  clearForm() {
    this.appointmentInfoForm.reset();
    this.formSubmitAttempt=false;
    this.appointmentInfoForm.get('appointmentId')?.setValue('');
    this.appointmentInfoForm.get('appointmentDate')?.setValue('');
    this.appointmentInfoForm.get('doctorId')?.setValue('');
    this.appointmentInfoForm.get('serialNo')?.setValue('');
    this.appointmentInfoForm.get('appointmentTime')?.setValue('');
    this.appointmentInfoForm.get('patientName')?.setValue('');
    this.appointmentInfoForm.get('phoneNo')?.setValue('');
    this.appointmentInfoForm.get('nextAppointmentDate')?.setValue('');
    this.appointmentInfoForm.get('remark')?.setValue('');
   

  } 
}
