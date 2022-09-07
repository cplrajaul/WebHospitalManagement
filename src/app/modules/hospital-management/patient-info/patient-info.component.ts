import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { PatientInfoModel } from 'src/app/models/hospital-management-models/patientInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientInfoService } from 'src/app/services/hospital-management-services/patient-info.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styles: [
  ]
})
export class PatientInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private patientInfoservice: PatientInfoService) { }

  public patientList: PatientInfoModel[] = [];
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource: string = Constants.API_KEY + "images/patient_images/";
  public formSubmitAttempt: boolean = false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this. clearForm();
    this.getAll();
  }
  handleFileInput(e: any) {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files.length) {
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.PaitentInformationfrom.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  getAll() {
    this.patientInfoservice.getAll().subscribe((data: any) => {
      this.patientList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  public PaitentInformationfrom = this.formBuilder.group({
    patientId: [0,],
    patientName: ['', Validators.required],
    gender: ['', Validators.required],
    fatherName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    occupation: [''],
    nationality: [''],
    nidCardNo: [''],
    bloodGroup: [''],
    age: ['',Validators.required],
    isAdmit: [''],
    imageName: ['']
  })
  get patientName() { return this.PaitentInformationfrom.get("patientName") };
  get gender() { return this.PaitentInformationfrom.get("gender") };
  get fatherName() { return this.PaitentInformationfrom.get("fatherName") };
  get address() { return this.PaitentInformationfrom.get("address") };
  get phone() { return this.PaitentInformationfrom.get("phone") };
  get age() { return this.PaitentInformationfrom.get("age") }

  pupulateForm(selectedRecord: PatientInfoModel) {
    this.PaitentInformationfrom.patchValue({
      patientId: selectedRecord.patientId,
      patientName: selectedRecord.patientName,
      gender: selectedRecord.gender,
      fatherName: selectedRecord.fatherName,
      address: selectedRecord.address,
      phone: selectedRecord.phone,
      occupation: selectedRecord.occupation,
      nationality: selectedRecord.nationality,
      nidCardNo: selectedRecord.nidCardNo,
      bloodGroup: selectedRecord.bloodGroup,
      age: selectedRecord.age,
      isAdmit: selectedRecord.isAdmit,
      imageName: selectedRecord.imageName,
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
  }
  onSubmit() {
  
    if (this.PaitentInformationfrom.valid) {
      if (this.PaitentInformationfrom.value.patientId == 0 || this.PaitentInformationfrom.value.patientId == null) {
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
    const formdata: FormData = new FormData();
    formdata.append('PatientId', this.PaitentInformationfrom.value.patientId);
    formdata.append('PatientName', this.PaitentInformationfrom.value.patientName);
    formdata.append('Gender', this.PaitentInformationfrom.value.gender);
    formdata.append('FatherName', this.PaitentInformationfrom.value.fatherName);
    formdata.append('Address', this.PaitentInformationfrom.value.address);
    formdata.append('Phone', this.PaitentInformationfrom.value.phone);
    formdata.append('Occupation', this.PaitentInformationfrom.value.occupation);
    formdata.append('Nationality', this.PaitentInformationfrom.value.nationality);
    formdata.append('NIDCardNo', this.PaitentInformationfrom.value.nidCardNo);
    formdata.append('BloodGroup', this.PaitentInformationfrom.value.bloodGroup);
    formdata.append('Age', this.PaitentInformationfrom.value.age);
    formdata.append('IsAdmit', this.PaitentInformationfrom.value.isAdmit);
    formdata.append('Photo', this.fileToUpload);
    formdata.append("ImageName", this.PaitentInformationfrom.value.imageName);


    this.patientInfoservice.insert(formdata).subscribe((data: ResponseModel) => {
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
    const formdata: FormData = new FormData();
    formdata.append('PatientId', this.PaitentInformationfrom.value.patientId);
    formdata.append('PatientName', this.PaitentInformationfrom.value.patientName);
    formdata.append('Gender', this.PaitentInformationfrom.value.gender);
    formdata.append('FatherName', this.PaitentInformationfrom.value.fatherName);
    formdata.append('Address', this.PaitentInformationfrom.value.address);
    formdata.append('Phone', this.PaitentInformationfrom.value.phone);
    formdata.append('Occupation', this.PaitentInformationfrom.value.occupation);
    formdata.append('Nationality', this.PaitentInformationfrom.value.nationality);
    formdata.append('NIDCardNo', this.PaitentInformationfrom.value.nidCardNo);
    formdata.append('BloodGroup', this.PaitentInformationfrom.value.bloodGroup);
    formdata.append('Age', this.PaitentInformationfrom.value.age);
    formdata.append('IsAdmit', this.PaitentInformationfrom.value.isAdmit);
    formdata.append('Photo', this.fileToUpload);
    formdata.append("ImageName", this.PaitentInformationfrom.value.imageName);

    this.patientInfoservice.update(formdata).subscribe((data: ResponseModel) => {
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
 
  onDelete(id: number) {
    if (confirm("Are u sure to delete this recored ?")) {
      this.patientInfoservice.delete(id).subscribe(
        res => {
          this.getAll();

          this.toastr.success("Delete succfully", 'Patient detail register')
        },
        err => {
          this.toastr.success("Delete Failed")
          console.log(err);
        })
    }
  }
  clearForm() {
    this.PaitentInformationfrom.reset();
    this.filePath = "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
    this.fileToUpload='';
    this.PaitentInformationfrom.get('patientId')?.setValue('');
    this.PaitentInformationfrom.get('patientName')?.setValue('');
    this.PaitentInformationfrom.get('gender')?.setValue('');
    this.PaitentInformationfrom.get('fatherName')?.setValue('');
    this.PaitentInformationfrom.get('address')?.setValue('');
    this.PaitentInformationfrom.get('phone')?.setValue('');
    this.PaitentInformationfrom.get('occupation')?.setValue('');
    this.PaitentInformationfrom.get('nationality')?.setValue('Bangladeshi');
    this.PaitentInformationfrom.get('nidCardNo')?.setValue('');
    this.PaitentInformationfrom.get('bloodGroup')?.setValue('');
    this.PaitentInformationfrom.get('age')?.setValue('');
    this.PaitentInformationfrom.get('isAdmit')?.setValue('');
    this.PaitentInformationfrom.get('imageName')?.setValue('');
    
    

  }

}
