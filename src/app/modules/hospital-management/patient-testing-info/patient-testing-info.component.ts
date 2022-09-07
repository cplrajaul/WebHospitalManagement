import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { PatientAdmissionInfoModel } from 'src/app/models/hospital-management-models/patientAdmissionInfoModel';
import { PatientTestingInfoModel } from 'src/app/models/hospital-management-models/patientTesingModel';
import { TestCategoryModel } from 'src/app/models/hospital-management-models/testCategoryModel';
import { TestInfoModel } from 'src/app/models/hospital-management-models/testInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientAdmissionService } from 'src/app/services/hospital-management-services/patient-admission.service';
import { PatientTestingInfoService } from 'src/app/services/hospital-management-services/patient-testing-info.service';
import { TestCategoryService } from 'src/app/services/hospital-management-services/test-category.service';
import { TestInfoService } from 'src/app/services/hospital-management-services/test-info.service';

@Component({
  selector: 'app-patient-testing-info',
  templateUrl: './patient-testing-info.component.html',
  styles: [
  ]
})
export class PatientTestingInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    public patientTestingInfoService: PatientTestingInfoService,
    private patientAdmissionService: PatientAdmissionService,
    private testInfoService: TestInfoService,
    private testCategoryService: TestCategoryService) { }

  public patientAdmissionList: PatientAdmissionInfoModel[] = [];
  public itemList: PatientTestingInfoModel[] = [];
  public testList: TestInfoModel[] = [];
  public testInfoModel: TestInfoModel = new TestInfoModel();
  public categoryList: TestCategoryModel[] = [];
  public formSubmitAttempt: boolean = false;
  public total:number=0;
  @ViewChild('closebutton') closebutton: any;
  ngOnInit(): void {
    this.getAll();
    this.getTestAdmitionInfoList();
    this.getTestCategory();
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
  getAll() {
    this.patientTestingInfoService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  insert() {
    this.patientTestingInfoService.insert().subscribe((data: ResponseModel) => {
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


  // update() {
  //   this.patientTestingInfoService.update().subscribe((data: ResponseModel) => {
  //     if (data.responseCode == ResponseCode.OK) {
  //       this.toastr.success(data.responseMessage);
  //       this.getAll();
  //       this.clearForm();

  //       this.closebutton.nativeElement.click();

  //     } else {
  //       this.toastr.error(data.responseMessage)
  //     }
  //     console.log("response", data);
  //   }, error => {
  //     console.log("error", error);
  //     this.toastr.error("Something went worng please try again later");
  //   }
  //   )
  // }

  onDelete(id: number) {
    if (confirm("Are u sure to delete this recored ?")) {
      this.patientTestingInfoService.delete(id).subscribe(
        res => {
          // this.service.refreshList();
          this.getAll();
          this.clearForm();
          this.toastr.success("Delete successfully")
        },
        err => {
          this.toastr.error("Delete Failed");
          console.log(err)
        }
      )
    }
  }
  clearForm() {
    this.patientTestingInfoEntryForm.reset();
    this.formSubmitAttempt = false;
    this.patientTestingInfoEntryForm?.get('testNo')?.setValue(0);
    this.patientTestingInfoEntryForm?.get('testId')?.setValue('');
    this.patientTestingInfoEntryForm?.get('testName')?.setValue('');
    this.patientTestingInfoEntryForm?.get('testDate')?.setValue('');
    this.patientTestingInfoEntryForm?.get('patientAdmissionId')?.setValue('');
    this.patientTestingInfoEntryForm?.get('remarks')?.setValue('');
    this.patientTestingInfoEntryForm?.get('unitPrice')?.setValue(0);
    this.patientTestingInfoEntryForm?.get('categoryId')?.setValue('');
    this.patientTestingInfoEntryForm?.get('indexNumber')?.setValue(0);
  }
}
function jQuery(jQuery: any) {
  throw new Error('Function not implemented.');
}

