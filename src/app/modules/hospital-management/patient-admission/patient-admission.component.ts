import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { BedInfoModel } from 'src/app/models/hospital-management-models/bedInfoModel';
import { CabinInfoModel } from 'src/app/models/hospital-management-models/cabinInfoModel';
import { CabinTypeModel } from 'src/app/models/hospital-management-models/cabinTypeModel';
import { DoctorsInfoModel } from 'src/app/models/hospital-management-models/doctorsInfoModel';
import { PatientAdmissionInfoModel } from 'src/app/models/hospital-management-models/patientAdmissionInfoModel';
import { PatientInfoModel } from 'src/app/models/hospital-management-models/patientInfoModel';
import { WardInfoModel } from 'src/app/models/hospital-management-models/wardInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { BedInfoService } from 'src/app/services/hospital-management-services/bed-info.service';
import { CabinInfoService } from 'src/app/services/hospital-management-services/cabin-info.service';
import { CabinTypeService } from 'src/app/services/hospital-management-services/cabin-type.service';
import { DoctorsInfoService } from 'src/app/services/hospital-management-services/doctors-info.service';
import { PatientAdmissionService } from 'src/app/services/hospital-management-services/patient-admission.service';
import { PatientInfoService } from 'src/app/services/hospital-management-services/patient-info.service';
import { WardInfoService } from 'src/app/services/hospital-management-services/ward-info.service';

@Component({
  selector: 'app-patient-admission',
  templateUrl: './patient-admission.component.html',
  styles: [
  ] 
})
export class PatientAdmissionComponent implements OnInit {
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/doctor_images/";
  public formSubmitAttempt: boolean= false;
  public isCabin: boolean= false;
  public isWard: boolean= false;
  public cabinList:CabinInfoModel[]=[]
  public cabinTypeList:CabinTypeModel[]=[]
  public wardList:WardInfoModel[]=[]
  public bedList:BedInfoModel[]=[]
  public doctorList:DoctorsInfoModel[]=[];
  public patientList:PatientInfoModel[]=[];
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closeExPatient') closeExPatient: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private doctorInfoService: DoctorsInfoService,private patientAdmissionService:PatientAdmissionService,
    private cabinTypeService:CabinTypeService,private cabinInfoService:CabinInfoService, private wardInfoService:WardInfoService, private bedInfoService:BedInfoService,
    private patientInfoService: PatientInfoService) { }
  public itemList:PatientAdmissionInfoModel[]=[];
  ngOnInit(): void {
    this.clearForm();
    this.clearExForm();
    this.getAll();
    this.getDoctorList();
    this.getCabinTypeList();
    this.getWardList();
    this.selectCabin();
    this.getPatientList();
  }
  getAll(){
    this.patientAdmissionService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
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
  getCabinTypeList(){
    this.cabinTypeService.getAll().subscribe((data:any) => {
      this.cabinTypeList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getCabinList(cabinTypeId:any){
    this.cabinInfoService.getByTypeId(parseInt(cabinTypeId)).subscribe((data:any) => {
      this.cabinList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getWardList(){
    this.wardInfoService.getAll().subscribe((data:any) => {
      this.wardList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
   getBedList(wardNo:any){
    this.bedInfoService.getByWardNo(parseInt(wardNo)).subscribe((data:any) => {
      this.bedList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getPatientList(){
    this.patientInfoService.getAll().subscribe((data:any) => {
      this.patientList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  selectCabin(){
    this.clearForm();
    this.clearExForm();
    this.isCabin=true;
    this.isWard=false;
    this.formSubmitAttempt = false;
    this.patientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeId')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('cabinTypeId')?.updateValueAndValidity();
    this.patientAdmissionForm.get('cabinId')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('cabinId')?.updateValueAndValidity();
    this.patientAdmissionForm.get('cabinId')?.setValue('');
    this.patientAdmissionForm.get('wardNo')?.setValidators(null);
    this.patientAdmissionForm.get('wardNo')?.updateValueAndValidity();
    this.patientAdmissionForm.get('wardNo')?.setValue('');
    this.patientAdmissionForm.get('bedId')?.setValue('');
    this.patientAdmissionForm.get('bedId')?.setValidators(null);
    this.patientAdmissionForm.get('bedId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.existingPatientAdmissionForm.get('cabinTypeId')?.setValidators([Validators.required]);
    this.existingPatientAdmissionForm.get('cabinTypeId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('cabinId')?.setValue('');
    this.existingPatientAdmissionForm.get('cabinId')?.setValidators([Validators.required]);
    this.existingPatientAdmissionForm.get('cabinId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('wardNo')?.setValue('');
    this.existingPatientAdmissionForm.get('wardNo')?.setValidators(null);
    this.existingPatientAdmissionForm.get('wardNo')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('bedId')?.setValue('');
    this.existingPatientAdmissionForm.get('bedId')?.setValidators(null);
    this.existingPatientAdmissionForm.get('bedId')?.updateValueAndValidity();
  }
  selectWard(){
    this.clearForm();
    this.clearExForm();
    this.isCabin=false;
    this.isWard=true;
    this.formSubmitAttempt = false;
    this.patientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeId')?.setValidators(null);
    this.patientAdmissionForm.get('cabinTypeId')?.updateValueAndValidity();
    this.patientAdmissionForm.get('cabinId')?.setValue('');
    this.patientAdmissionForm.get('cabinId')?.setValidators(null);
    this.patientAdmissionForm.get('cabinId')?.updateValueAndValidity();
    this.patientAdmissionForm.get('wardNo')?.setValue('');
    this.patientAdmissionForm.get('wardNo')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('wardNo')?.updateValueAndValidity();
    this.patientAdmissionForm.get('bedId')?.setValue('');
    this.patientAdmissionForm.get('bedId')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('bedId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.existingPatientAdmissionForm.get('cabinTypeId')?.setValidators(null);
    this.patientAdmissionForm.get('cabinTypeId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('cabinId')?.setValue('');
    this.existingPatientAdmissionForm.get('cabinId')?.setValidators(null);
    this.patientAdmissionForm.get('cabinId')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('wardNo')?.setValue('');
    this.existingPatientAdmissionForm.get('wardNo')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('wardNo')?.updateValueAndValidity();
    this.existingPatientAdmissionForm.get('bedId')?.setValue('');
    this.existingPatientAdmissionForm.get('bedId')?.setValidators([Validators.required]);
    this.patientAdmissionForm.get('bedId')?.updateValueAndValidity();
  }
  handleFileInput(e: any) {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files.length) {
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.patientAdmissionForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
  public patientAdmissionForm = this.formBuilder.group({
    patientAdmissionId: [0],
    cabinTypeId: ['',],
    cabinTypeName: ['',],
    cabinId:['',],
    cabinName: ['',],
    wardNo:[''],
    wardName: ['',],
    bedId:[''],
    bedNo: [''],
    admissionDate: ['', Validators.required],
    doctorId: ['', Validators.required],
    patientId: [0],
    patientName: ['', Validators.required],
    gender: ['', Validators.required],
    age: ['',Validators.required],
    fatherName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['',Validators.required],
    occupation: ['',],
    nationality: ['Bangladeshi',],
    nidCardNo: ['',],
    bloodGroup: [''],
    remarks: [''],
    advanceAmount: [0],
    costPerDay: [0],
    imageName: [''],
  })
  get admissionDate() { return this.patientAdmissionForm.get("admissionDate") }
  get doctorId() { return this.patientAdmissionForm.get("doctorId") }
  get patientName() { return this.patientAdmissionForm.get("patientName") }
  get gender() { return this.patientAdmissionForm.get("gender") }
  get age() { return this.patientAdmissionForm.get("age") }
  get fatherName() { return this.patientAdmissionForm.get("fatherName") }
  get address() { return this.patientAdmissionForm.get("address") }
  get phone() { return this.patientAdmissionForm.get("phone") }
  get cabinTypeId() { return this.patientAdmissionForm.get("cabinTypeId") }
  get cabinId() { return this.patientAdmissionForm.get("cabinId") }
  get wardNo() { return this.patientAdmissionForm.get("wardNo") }
  get bedId() { return this.patientAdmissionForm.get("bedId") }
  public existingPatientAdmissionForm = this.formBuilder.group({
    patientAdmissionId: [0],
    cabinTypeId: ['',],
    cabinTypeName: ['',],
    cabinId:['',],
    cabinName: ['',],
    wardNo:[''],
    wardName: ['',],
    bedId:[''],
    bedNo: [''],
    admissionDate: ['', Validators.required],
    doctorId: ['', Validators.required],
    patientId: ['', Validators.required],
    advanceAmount: [0],
    costPerDay: [0],
  })
  get existingFormDoctorId() { return this.existingPatientAdmissionForm.get("doctorId") }
  get existingFormPatientId() { return this.existingPatientAdmissionForm.get("patientId") }
  get existingFormAdmissionDate() { return this.existingPatientAdmissionForm.get("admissionDate") }
  pupulateForm(selectedRecord: PatientAdmissionInfoModel) {
    this.patientAdmissionForm.patchValue({
      patientAdmissionId: selectedRecord.patientAdmissionId,
      admissionDate: selectedRecord.admissionDate,
      doctorId: selectedRecord.doctorId,
      patientId: selectedRecord.patientId,
      patientName: selectedRecord.patientName,
      gender: selectedRecord.gender,
      age: selectedRecord.age,
      fatherName: selectedRecord.fatherName,
      address: selectedRecord.address,
      phone: selectedRecord.phone,
      occupation: selectedRecord.occupation,
      nationality: selectedRecord.nationality,
      nidCardNo: selectedRecord.nidCardNo,
      bloodGroup: selectedRecord.bloodGroup,
      remarks: selectedRecord.remarks,
      advanceAmount: selectedRecord.advanceAmount,
      costPerDay: selectedRecord.costPerDay,
      cabinTypeId: selectedRecord.cabinTypeId,
      cabinTypeName: selectedRecord.cabinTypeName,
      cabinId: selectedRecord.cabinId,
      cabinName: selectedRecord.cabinName,
      wardNo: selectedRecord.wardNo,
      wardName: selectedRecord.wardName,
      bedId: selectedRecord.bedId,
      bedNo: selectedRecord.bedNo,
      imageName: selectedRecord.imageName,
    });
    if(selectedRecord.imageName!='null' ){
      this.filePath = this.imageSource + selectedRecord.imageName
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
  }
  onSubmitExAdmission(){
    if (this.existingPatientAdmissionForm.valid) {
      this.patientAdmissionService.patientAdmissionModel.patientAdmissionId = this.existingPatientAdmissionForm.value.patientAdmissionId || 0;
      this.patientAdmissionService.patientAdmissionModel.admissionDate = this.existingPatientAdmissionForm.value.admissionDate;
      this.patientAdmissionService.patientAdmissionModel.doctorId = this.existingPatientAdmissionForm.value.doctorId || 0;
      this.patientAdmissionService.patientAdmissionModel.patientId = this.existingPatientAdmissionForm.value.patientId || 0;
      this.patientAdmissionService.patientAdmissionModel.advanceAmount = this.existingPatientAdmissionForm.value.advanceAmount || 0;
      this.patientAdmissionService.patientAdmissionModel.costPerDay = this.existingPatientAdmissionForm.value.costPerDay || 0;
      this.patientAdmissionService.patientAdmissionModel.cabinTypeId = this.existingPatientAdmissionForm.value.cabinTypeId || 0;
      this.patientAdmissionService.patientAdmissionModel.cabinId = this.existingPatientAdmissionForm.value.cabinId || 0;
      this.patientAdmissionService.patientAdmissionModel.wardNo = this.existingPatientAdmissionForm.value.wardNo || 0;
      this.patientAdmissionService.patientAdmissionModel.bedId = this.existingPatientAdmissionForm.value.bedId || 0;
      if (this.existingPatientAdmissionForm.value.patientAdmissionId == 0||this.existingPatientAdmissionForm.value.patientAdmissionId == null) {
        this.insertExAdmition();
      } else {
        this.update();
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
  onSubmit() {
    if (this.patientAdmissionForm.valid) {
      if (this.patientAdmissionForm.value.patientAdmissionId == 0||this.patientAdmissionForm.value.patientAdmissionId == null) {
        this.insert();
      } else {
        this.update();
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
  insertExAdmition() {
    this.patientAdmissionService.insertExAdmition().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
        this.getAll();
        this.closeExPatient.nativeElement.click();
        this.clearForm();
        this.clearExForm();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data)
    }, err => { 
      console.log("error", err);
      this.toastr.error("Something went wrong try again later")
    })
  }
  insert() {
    const formData: FormData = new FormData();
    formData.append('PatientAdmissionId', this.patientAdmissionForm.value.patientAdmissionId);
    formData.append('AdmissionDate', this.patientAdmissionForm.value.admissionDate);
    formData.append('DoctorId', this.patientAdmissionForm.value.doctorId);
    formData.append('PatientId', this.patientAdmissionForm.value.PatientId);
    formData.append('PatientName', this.patientAdmissionForm.value.patientName);
    formData.append('Gender', this.patientAdmissionForm.value.gender);
    formData.append('Age', this.patientAdmissionForm.value.age);
    formData.append('FatherName', this.patientAdmissionForm.value.fatherName);
    formData.append('Address', this.patientAdmissionForm.value.address);
    formData.append('Phone', this.patientAdmissionForm.value.phone);
    formData.append('Occupation', this.patientAdmissionForm.value.occupation);
    formData.append('Nationality', this.patientAdmissionForm.value.nationality);
    formData.append('NidCardNo', this.patientAdmissionForm.value.nidCardNo);
    formData.append('BloodGroup', this.patientAdmissionForm.value.bloodGroup);
    formData.append('Remarks', this.patientAdmissionForm.value.remarks);
    formData.append('AdvanceAmount', this.patientAdmissionForm.value.advanceAmount);
    formData.append('CostPerDay', this.patientAdmissionForm.value.costPerDay);
    formData.append("CabinTypeId", this.patientAdmissionForm.value.cabinTypeId);
    formData.append("CabinTypeName", this.patientAdmissionForm.value.cabinTypeName);
    formData.append("CabinId", this.patientAdmissionForm.value.cabinId);
    formData.append("CabinName", this.patientAdmissionForm.value.cabinName);
    formData.append("WardNo", this.patientAdmissionForm.value.wardNo);
    formData.append("WardName", this.patientAdmissionForm.value.wardName);
    formData.append("BedId", this.patientAdmissionForm.value.bedId);
    formData.append("BedNo", this.patientAdmissionForm.value.bedNo);
    formData.append("ImageName", this.patientAdmissionForm.value.imageName);
    formData.append('Photo', this.fileToUpload);
    this.patientAdmissionService.insert(formData).subscribe((data: ResponseModel) => {
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
    formData.append('PatientAdmissionId', this.patientAdmissionForm.value.patientAdmissionId);
    formData.append('AdmissionDate', this.patientAdmissionForm.value.admissionDate);
    formData.append('DoctorId', this.patientAdmissionForm.value.doctorId);
    formData.append('PatientId', this.patientAdmissionForm.value.PatientId);
    formData.append('PatientName', this.patientAdmissionForm.value.patientName);
    formData.append('Gender', this.patientAdmissionForm.value.gender);
    formData.append('Age', this.patientAdmissionForm.value.age);
    formData.append('FatherName', this.patientAdmissionForm.value.fatherName);
    formData.append('Address', this.patientAdmissionForm.value.address);
    formData.append('Phone', this.patientAdmissionForm.value.phone);
    formData.append('Occupation', this.patientAdmissionForm.value.occupation);
    formData.append('Nationality', this.patientAdmissionForm.value.nationality);
    formData.append('NidCardNo', this.patientAdmissionForm.value.nidCardNo);
    formData.append('BloodGroup', this.patientAdmissionForm.value.bloodGroup);
    formData.append('Remarks', this.patientAdmissionForm.value.remarks);
    formData.append('AdvanceAmount', this.patientAdmissionForm.value.advanceAmount);
    formData.append('CostPerDay', this.patientAdmissionForm.value.costPerDay);
    formData.append("CabinTypeId", this.patientAdmissionForm.value.cabinTypeId);
    formData.append("CabinTypeName", this.patientAdmissionForm.value.cabinTypeName);
    formData.append("CabinId", this.patientAdmissionForm.value.cabinId);
    formData.append("CabinName", this.patientAdmissionForm.value.cabinName);
    formData.append("WardNo", this.patientAdmissionForm.value.wardNo);
    formData.append("WardName", this.patientAdmissionForm.value.wardName);
    formData.append("BedId", this.patientAdmissionForm.value.bedId);
    formData.append("BedNo", this.patientAdmissionForm.value.bedNo);
    formData.append("ImageName", this.patientAdmissionForm.value.imageName);
    formData.append('Photo', this.fileToUpload);
    this.patientAdmissionService.update(formData).subscribe((data: ResponseModel) => {
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
      this.patientAdmissionService.delete(id).subscribe(
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
    this.patientAdmissionForm.reset();
    this.formSubmitAttempt = false;
    this.filePath= "../../../../assets/dist/img/loding.gif";
    
    this.fileToUpload='';
    this.patientAdmissionForm.get('patientAdmissionId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeName')?.setValue('');
    this.patientAdmissionForm.get('cabinId')?.setValue('');
    this.patientAdmissionForm.get('cabinName')?.setValue('');
    this.patientAdmissionForm.get('wardNo')?.setValue('');
    this.patientAdmissionForm.get('wardName')?.setValue('');
    this.patientAdmissionForm.get('bedId')?.setValue('');
    this.patientAdmissionForm.get('bedNo')?.setValue('');
    this.patientAdmissionForm.get('admissionDate')?.setValue('');
    this.patientAdmissionForm.get('doctorId')?.setValue('');
    this.patientAdmissionForm.get('patientId')?.setValue('');
    this.patientAdmissionForm.get('patientName')?.setValue('');
    this.patientAdmissionForm.get('gender')?.setValue('');
    this.patientAdmissionForm.get('age')?.setValue('');
    this.patientAdmissionForm.get('fatherName')?.setValue('');
    this.patientAdmissionForm.get('address')?.setValue('');
    this.patientAdmissionForm.get('phone')?.setValue('');
    this.patientAdmissionForm.get('occupation')?.setValue('');
    this.patientAdmissionForm.get('nationality')?.setValue('');
    this.patientAdmissionForm.get('nidCardNo')?.setValue('');
    this.patientAdmissionForm.get('bloodGroup')?.setValue('');
    this.patientAdmissionForm.get('remarks')?.setValue('');
    this.patientAdmissionForm.get('advanceAmount')?.setValue('');
    this.patientAdmissionForm.get('costPerDay')?.setValue('');
    this.patientAdmissionForm.get('imageName')?.setValue('');

  }
  clearExForm() {
    this.existingPatientAdmissionForm.reset();
    
    this.fileToUpload='';
    this.patientAdmissionForm.get('patientAdmissionId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeId')?.setValue('');
    this.patientAdmissionForm.get('cabinTypeName')?.setValue('');
    this.patientAdmissionForm.get('cabinId')?.setValue('');
    this.patientAdmissionForm.get('cabinName')?.setValue('');
    this.patientAdmissionForm.get('wardNo')?.setValue('');
    this.patientAdmissionForm.get('wardName')?.setValue('');
    this.patientAdmissionForm.get('bedId')?.setValue('');
    this.patientAdmissionForm.get('bedNo')?.setValue('');
    this.patientAdmissionForm.get('admissionDate')?.setValue('');
    this.patientAdmissionForm.get('doctorId')?.setValue('');
    this.patientAdmissionForm.get('patientId')?.setValue('');
    this.patientAdmissionForm.get('advanceAmount')?.setValue('');
    this.patientAdmissionForm.get('costPerDay')?.setValue('');
    this.patientAdmissionForm.get('gender')?.setValue('');
    this.patientAdmissionForm.get('bloodGroup')?.setValue('');
    this.patientAdmissionForm.get('nationality')?.setValue('Bangladeshi');
    this.formSubmitAttempt = false;
  }
  
}