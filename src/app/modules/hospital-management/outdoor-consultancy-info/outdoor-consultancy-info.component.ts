
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { DoctorsInfoModel } from 'src/app/models/hospital-management-models/doctorsInfoModel';
import { OutdoorConsultancyModel } from 'src/app/models/hospital-management-models/outdoorConsultancyModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DoctorsInfoService } from 'src/app/services/hospital-management-services/doctors-info.service';
import { OutdoorConsultancyInfoService } from 'src/app/services/hospital-management-services/outdoor-consultancy-info.service';

@Component({
  selector: 'app-outdoor-consultancy-info',
  templateUrl: './outdoor-consultancy-info.component.html',
  styles: [
  ]
})
export class OutdoorConsultancyInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private outdoorConsultancyService:OutdoorConsultancyInfoService,
    private doctorInfoService:DoctorsInfoService) { }

  public doctorList:DoctorsInfoModel[]=[]; 
 
  public itemList:OutdoorConsultancyModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getDoctorList();
  }
  getAll(){
    this.outdoorConsultancyService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })

  }



  public outdoorConsultancyForm = this.formBuilder.group({
    outDoorId: [0,],
    doctorId: ['', Validators.required],
    serialNo: [0],
    entryDate: ['', Validators.required],
    patientName: ['', Validators.required],
    gender: ['', Validators.required],
    age: ['', Validators.required],
    prescription: ['', ],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    testifications: [''],

  })
  get doctorId() { return this.outdoorConsultancyForm.get("doctorId") };
  // get serialNo() { return this.outdoorConsultancyForm.get("serialNo") };
  get entryDate() { return this.outdoorConsultancyForm.get("entryDate") };
  get patientName() { return this.outdoorConsultancyForm.get("patientName") };
  get gender() { return this.outdoorConsultancyForm.get("gender") };
  get age() { return this.outdoorConsultancyForm.get("age") };
  get prescription(){return this.outdoorConsultancyForm.get("prescription")};
  get testifications(){return this.outdoorConsultancyForm.get("testifications")};
  get address() { return this.outdoorConsultancyForm.get("address") };
  get phone() { return this.outdoorConsultancyForm.get("phone") };
  

  pupulateForm(selectedRecord: OutdoorConsultancyModel) {
    this.outdoorConsultancyForm.patchValue({
      outDoorId: selectedRecord.outDoorId,
      doctorId: selectedRecord.doctorId,
      serialNo: selectedRecord.serialNo,
      entryDate:selectedRecord.entryDate,
      patientName: selectedRecord.patientName,
      gender: selectedRecord.gender,
      age: selectedRecord.age,
      prescription: selectedRecord.prescription,
      address: selectedRecord.address,
      phone: selectedRecord.phone,
      testifications: selectedRecord.testifications,
    });
   
  }


  onSubmit() {
    if (this.outdoorConsultancyForm.valid) {
     this.outdoorConsultancyService.outdoorCOnsultancyModel.outDoorId = this.outdoorConsultancyForm.value.outDoorId || 0;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.doctorId = this.outdoorConsultancyForm.value.doctorId  || 0;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.serialNo = this.outdoorConsultancyForm.value.serialNo || 0;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.entryDate = this.outdoorConsultancyForm.value.entryDate;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.patientName = this.outdoorConsultancyForm.value.patientName;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.gender = this.outdoorConsultancyForm.value.gender;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.age = this.outdoorConsultancyForm.value.age || 0;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.prescription = this.outdoorConsultancyForm.value.prescription;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.address = this.outdoorConsultancyForm.value.address;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.phone = this.outdoorConsultancyForm.value.phone;
     this.outdoorConsultancyService.outdoorCOnsultancyModel.testifications = this.outdoorConsultancyForm.value.testifications;
    if (this.outdoorConsultancyForm.value.outDoorId == 0||this.outdoorConsultancyForm.value.outDoorId == null) {
      this.insert();
    } else {
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
     this.outdoorConsultancyService.insert().subscribe((data:ResponseModel)=>{
      if(data.responseCode==ResponseCode.OK){
        
        this.getAll();
        this.clearForm();
        this.closebutton.nativeElement.click();
      }else{
        this.toastr.error(data.responseMessage);
      }
      console.log("response",data);
     },error=>{
       console.log("error",error);
       this.toastr.error("Something Went Wrong, Update Failed. Please try again")
     })
   }


   update(){
    this.outdoorConsultancyService.update().subscribe((data:ResponseModel)=>{
     if(data.responseCode==ResponseCode.OK){
    
       this.toastr.success(data.responseMessage);
       this.getAll();
       this.clearForm();
       this.closebutton.nativeElement.click();
     }else{
       this.toastr.error(data.responseMessage);
     }
     console.log("response",data);
    },error=>{
      console.log("error",error);
    })
  }

  onDelete(id:number){
    if(confirm("Are u sure to delete this record ?")){
      this.outdoorConsultancyService.delete(id).subscribe(
       res=>{          
         this.toastr.success("Delete successfully");
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
    this.outdoorConsultancyForm.reset();
    this.formSubmitAttempt=false;
    
    this.outdoorConsultancyForm.get('outDoorId')?.setValue('');
    this.outdoorConsultancyForm.get('doctorId')?.setValue('');
    this.outdoorConsultancyForm.get('serialNo')?.setValue('');
    this.outdoorConsultancyForm.get('entryDate')?.setValue('');
    this.outdoorConsultancyForm.get('patientName')?.setValue('');
    this.outdoorConsultancyForm.get('gender')?.setValue('');
    this.outdoorConsultancyForm.get('age')?.setValue('');
    this.outdoorConsultancyForm.get('prescription')?.setValue('');
    this.outdoorConsultancyForm.get('address')?.setValue('');
    this.outdoorConsultancyForm.get('phone')?.setValue('');
    this.outdoorConsultancyForm.get('testifications')?.setValue('');
  }


}
