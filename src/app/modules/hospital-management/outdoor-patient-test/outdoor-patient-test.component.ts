import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { PatientAdmissionInfoModel } from 'src/app/models/hospital-management-models/patientAdmissionInfoModel';
import { PatientTestingInfoModel } from 'src/app/models/hospital-management-models/patientTesingModel';
import { TestCategoryModel } from 'src/app/models/hospital-management-models/testCategoryModel';
import { TestInfoModel } from 'src/app/models/hospital-management-models/testInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientAdmissionService } from 'src/app/services/hospital-management-services/patient-admission.service';
import { PatientInfoService } from 'src/app/services/hospital-management-services/patient-info.service';
import { PatientTestingInfoService } from 'src/app/services/hospital-management-services/patient-testing-info.service';
import { TestCategoryService } from 'src/app/services/hospital-management-services/test-category.service';
import { TestInfoService } from 'src/app/services/hospital-management-services/test-info.service';

@Component({
  selector: 'app-outdoor-patient-test',
  templateUrl: './outdoor-patient-test.component.html',
  styles: [
  ]
})
export class OutdoorPatientTestComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private patientInfoservice: PatientInfoService,
    public patientTestingInfoService: PatientTestingInfoService,
    private patientAdmissionService: PatientAdmissionService,
    private testInfoService: TestInfoService,
    private testCategoryService: TestCategoryService
    ) { }

  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource: string = Constants.API_KEY + "images/patient_images/";
  public formSubmitAttempt: boolean = false;
  public patientAdmissionList: PatientAdmissionInfoModel[] = [];
  public itemList: PatientTestingInfoModel[] = [];
  public testList: TestInfoModel[] = [];
  public testInfoModel: TestInfoModel = new TestInfoModel();
  public categoryList: TestCategoryModel[] = [];
  public total:number=0;
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
        this.outdootPatientTestForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  getAll() {
    // this.patientInfoservice.getAll().subscribe((data: any) => {
    //   this.patientList = data;
    //   console.log(data);
    // }, error => {
    //   console.log("error", error)
    //   this.toastr.error("Something went wrong please try again later");
    // })
  }
  resetTestingForm() {

  }
  getTestCategory() {
    this.testCategoryService.getAll().subscribe((data: any) => {
      this.categoryList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getTestAdmitionInfoList() {
    this.patientAdmissionService.getAll().subscribe((data: any) => {
      this.patientAdmissionList = data;
      console.log(data);

    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  getTestInfoById(id: any) {
    this.testInfoService.getById(parseInt(id)).subscribe((data: any) => {
      this.testInfoModel = data;
      this.patientTestingInfoEntryForm.get('unitPrice')?.setValue(this.testInfoModel.testCost);
      this.patientTestingInfoEntryForm.get('testName')?.setValue(this.testInfoModel.testName);
      console.log(data);

    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getTestInfoList(categoryId: any) {
    this.testInfoService.getAllTestByCatagoryId(parseInt(categoryId)).subscribe((data: any) => {
      this.testList = data;
      console.log(data);

    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  public patientTestingInfoEntryForm = this.formBuilder.group({
    testNo: [0],
    testId: ['', Validators.required],
    testName: ['',],
    testDate: ['', Validators.required],
    patientAdmissionId: ['', Validators.required],
    remarks: ['',],
    unitPrice: [0, Validators.required],
    categoryId: ['', Validators.required],
    indexNumber: [0,]
  })
  get testDate() { return this.patientTestingInfoEntryForm.get("testDate") };
  get patientAdmissionId() { return this.patientTestingInfoEntryForm.get("patientAdmissionId") };
  get unitPrice() { return this.patientTestingInfoEntryForm.get("unitPrice") };
  get testId() { return this.patientTestingInfoEntryForm.get("testId") };
  get categoryId() { return this.patientTestingInfoEntryForm.get("categoryId") };

  pupulateForm(selectedRecord: PatientTestingInfoModel, index:number) {
    this.patientTestingInfoEntryForm.patchValue({
      indexNumber: index,
      testNo: selectedRecord.testNo,
      testDate: selectedRecord.testDate,
      patientAdmissionId: selectedRecord.patientAdmissionId,
      remarks: selectedRecord.remarks,
      unitPrice: selectedRecord.unitPrice,
      testId: selectedRecord.testId,
      testName:selectedRecord.testName,
      categoryId: selectedRecord.categoryId,
    });
  }
  deleteFormTestingList(index:number){
    delete this.patientTestingInfoService.patientTestingInfoViewModel[index];
    const valueToKeep = this.patientTestingInfoService.patientTestingInfoViewModel;
    this.patientTestingInfoService.patientTestingInfoViewModel=[];
    valueToKeep.forEach(element => {
      this.patientTestingInfoService.patientTestingInfoViewModel.push(element);
    });
    this.getTotal();
  }
  onTestListSubmit() {
    debugger;
    if (this.patientTestingInfoEntryForm.valid) {
      let index = this.patientTestingInfoEntryForm.value.indexNumber || 0;
      if (index == 0) {
        this.patientTestingInfoService.patientTestingInfoViewModel.push(this.patientTestingInfoEntryForm.value)
        this.getTotal();
        this.getTestCategory();
      } else {
        this.patientTestingInfoService.patientTestingInfoViewModel[index - 1] = this.patientTestingInfoEntryForm.value;
        this.getTotal();
      }
      this.clearForm();
    } else {
      this.formSubmitAttempt = true;
    }
  }
  getTotal(){
    this.total=0;
    this.patientTestingInfoService.patientTestingInfoViewModel.forEach(element => {
      this.total=this.total+element.unitPrice;
    });
  }
  
  public outdootPatientTestForm = this.formBuilder.group({
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
  get patientName() { return this.outdootPatientTestForm.get("patientName") };
  get gender() { return this.outdootPatientTestForm.get("gender") };
  get fatherName() { return this.outdootPatientTestForm.get("fatherName") };
  get address() { return this.outdootPatientTestForm.get("address") };
  get phone() { return this.outdootPatientTestForm.get("phone") };
  get age() { return this.outdootPatientTestForm.get("age") }

  // pupulateForm(selectedRecord: PatientInfoModel) {
  //   this.PaitentInformationfrom.patchValue({
  //     patientId: selectedRecord.patientId,
  //     patientName: selectedRecord.patientName,
  //     gender: selectedRecord.gender,
  //     fatherName: selectedRecord.fatherName,
  //     address: selectedRecord.address,
  //     phone: selectedRecord.phone,
  //     occupation: selectedRecord.occupation,
  //     nationality: selectedRecord.nationality,
  //     nidCardNo: selectedRecord.nidCardNo,
  //     bloodGroup: selectedRecord.bloodGroup,
  //     age: selectedRecord.age,
  //     isAdmit: selectedRecord.isAdmit,
  //     imageName: selectedRecord.imageName,
  //   });
  //   if(selectedRecord.imageName!=null ){
  //     this.filePath = this.imageSource + selectedRecord.imageName
  //   }
  //   else{
  //     this.filePath= "../../../../assets/dist/img/loding.gif";
  //   }
  // }
  onSubmit() {
  
    if (this.outdootPatientTestForm.valid) {
      if (this.outdootPatientTestForm.value.patientId == 0 || this.outdootPatientTestForm.value.patientId == null) {
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
    formdata.append('PatientId', this.outdootPatientTestForm.value.patientId);
    formdata.append('PatientName', this.outdootPatientTestForm.value.patientName);
    formdata.append('Gender', this.outdootPatientTestForm.value.gender);
    formdata.append('FatherName', this.outdootPatientTestForm.value.fatherName);
    formdata.append('Address', this.outdootPatientTestForm.value.address);
    formdata.append('Phone', this.outdootPatientTestForm.value.phone);
    formdata.append('Occupation', this.outdootPatientTestForm.value.occupation);
    formdata.append('Nationality', this.outdootPatientTestForm.value.nationality);
    formdata.append('NIDCardNo', this.outdootPatientTestForm.value.nidCardNo);
    formdata.append('BloodGroup', this.outdootPatientTestForm.value.bloodGroup);
    formdata.append('Age', this.outdootPatientTestForm.value.age);
    formdata.append('IsAdmit', this.outdootPatientTestForm.value.isAdmit);
    formdata.append('Photo', this.fileToUpload);
    formdata.append("ImageName", this.outdootPatientTestForm.value.imageName);


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
    formdata.append('PatientId', this.outdootPatientTestForm.value.patientId);
    formdata.append('PatientName', this.outdootPatientTestForm.value.patientName);
    formdata.append('Gender', this.outdootPatientTestForm.value.gender);
    formdata.append('FatherName', this.outdootPatientTestForm.value.fatherName);
    formdata.append('Address', this.outdootPatientTestForm.value.address);
    formdata.append('Phone', this.outdootPatientTestForm.value.phone);
    formdata.append('Occupation', this.outdootPatientTestForm.value.occupation);
    formdata.append('Nationality', this.outdootPatientTestForm.value.nationality);
    formdata.append('NIDCardNo', this.outdootPatientTestForm.value.nidCardNo);
    formdata.append('BloodGroup', this.outdootPatientTestForm.value.bloodGroup);
    formdata.append('Age', this.outdootPatientTestForm.value.age);
    formdata.append('IsAdmit', this.outdootPatientTestForm.value.isAdmit);
    formdata.append('Photo', this.fileToUpload);
    formdata.append("ImageName", this.outdootPatientTestForm.value.imageName);

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
    this.outdootPatientTestForm.reset();
    this.filePath = "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
    this.fileToUpload='';
    this.outdootPatientTestForm.get('patientId')?.setValue('');
    this.outdootPatientTestForm.get('patientName')?.setValue('');
    this.outdootPatientTestForm.get('gender')?.setValue('');
    this.outdootPatientTestForm.get('fatherName')?.setValue('');
    this.outdootPatientTestForm.get('address')?.setValue('');
    this.outdootPatientTestForm.get('phone')?.setValue('');
    this.outdootPatientTestForm.get('occupation')?.setValue('');
    this.outdootPatientTestForm.get('nationality')?.setValue('Bangladeshi');
    this.outdootPatientTestForm.get('nidCardNo')?.setValue('');
    this.outdootPatientTestForm.get('bloodGroup')?.setValue('');
    this.outdootPatientTestForm.get('age')?.setValue('');
    this.outdootPatientTestForm.get('isAdmit')?.setValue('');
    this.outdootPatientTestForm.get('imageName')?.setValue('');
    
    

  }

}
