import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { TestCategoryModel } from 'src/app/models/hospital-management-models/testCategoryModel';
import { TestInfoModel } from 'src/app/models/hospital-management-models/testInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { TestCategoryService } from 'src/app/services/hospital-management-services/test-category.service';
import { TestInfoService } from 'src/app/services/hospital-management-services/test-info.service';

// interface PatientTestingInfoInterface{
//    testNo:number;
//    testDate:string;
//    patientAdmissionId:number;
//    remarks:string;
//    quantity:number;
//    unitPrice:number;
//    total:number;
//     voucherDate:string;
// }
@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styles: [
  ]
})
export class TestInfoComponent implements OnInit {
  public itemList: TestInfoModel[] = [];
  public categoryList:TestCategoryModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private testInfoService: TestInfoService, private testCategoryService:TestCategoryService) { }

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getTestCategory();
  }
  public editableList: TestInfoModel[] = [];
  onSubmitDemo(){
    debugger;
    let index=this.editableList.findIndex(list=>list.testId ===this.testInfoForm.value.testId)
    if (index == null){
      this.editableList.push(this.testInfoForm.value)
    }
    else{
      this.editableList[index]=this.testInfoForm.value;
    }
  }

  // editCar(car: Car) {
  //   this.car = new FormGroup({
  //     id: new FormControl(car.id),
  //     brand: new FormControl(car.brand),
  //     model: new FormControl(car.model),
  //     year: new FormControl(car.year)
  //   });
  // }

  getAll() {
    this.testInfoService.getAll().subscribe((data: any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })

  }
  fillCashToDoctor(){
    debugger;
    this.testInfoForm.get('cashToDoctor')?.setValue(this.testInfoForm.value.testCost * (this.testInfoForm.value.percentangeToDoctor/100));
  }
  public testInfoForm = this.formBuilder.group({
    testId: [0],
    testName: ['', [Validators.required, Validators.maxLength(30)]],
    testCost: [0, Validators.required],
    remarks: [''],
    percentangeToDoctor: [0, Validators.required],
    unit: ['', Validators.required],
    cashToDoctor: [0, Validators.required],
    categoryId: ["", Validators.required],
  })

  get testName() { return this.testInfoForm.get("testName") };
  get testCost() { return this.testInfoForm.get("testCost") };
  get percentangeToDoctor() { return this.testInfoForm.get("percentangeToDoctor") };
  get unit() { return this.testInfoForm.get("unit") };
  get cashToDoctor() { return this.testInfoForm.get("cashToDoctor") };
  get categoryId() { return this.testInfoForm.get("categoryId") };

  pupulateForm(selectedRecord: TestInfoModel) {
    this.testInfoForm.patchValue({
      testId: selectedRecord.testId,
      testName: selectedRecord.testName,
      testCost: selectedRecord.testCost,
      remarks: selectedRecord.remarks,
      percentangeToDoctor: selectedRecord.percentangeToDoctor,
      unit: selectedRecord.unit,
      cashToDoctor: selectedRecord.cashToDoctor,
      categoryId: selectedRecord.categoryId,
    });
  }

  onSubmit() {
    if (this.testInfoForm.valid){
      this.testInfoService.testInfoModel.testId = this.testInfoForm.value.testId || 0;
      this.testInfoService.testInfoModel.testName = this.testInfoForm.value.testName;
      this.testInfoService.testInfoModel.testCost = this.testInfoForm.value.testCost || 0;
      this.testInfoService.testInfoModel.remarks = this.testInfoForm.value.remarks;
      this.testInfoService.testInfoModel.percentangeToDoctor = this.testInfoForm.value.percentangeToDoctor || 0;
      this.testInfoService.testInfoModel.unit = this.testInfoForm.value.unit;
      this.testInfoService.testInfoModel.cashToDoctor = this.testInfoForm.value.cashToDoctor || 0;
      this.testInfoService.testInfoModel.categoryId = this.testInfoForm.value.categoryId || 0;
      if (this.testInfoForm.value.testId == 0 || this.testInfoForm.value.testId == null) {
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
    this.testInfoService.insert().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.clearForm();
        this.getAll();
        this.toastr.success("Test Info Save successfully");
        this.getAll();
        this.closebutton.nativeElement.click();
      }
      else {
        this.toastr.error("Invalid Entry", data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Try Again");
    })
  }

  update() {
    this.testInfoService.update().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {

        this.getAll();
        this.toastr.success("Test Info Updated successfully");
        this.clearForm();
        this.closebutton.nativeElement.click();
      }
      else {
        this.toastr.error("Invalid Entry", data.responseMessage);
      }
      console.log("response", data)
    }, error => {
      console.log("error", error);
      this.toastr.error("Something is wrong. Please Try Again");
    })
  }

  onDelete(id: any) {
    if (confirm("Are u sure to delete this recored ?")) {
      this.testInfoService.delete(id).subscribe(
        res => {
          this.toastr.success("Delete successfully")
          this.getAll();
        },
        err => {
          this.toastr.success("Delete Failed")
          console.log(err)
        }
      )
    }
  }
  getTestCategory() {
    this.testCategoryService.getAll().subscribe((data:any) => {
      this.categoryList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  clearForm() {
    this.testInfoForm.reset();
    this.formSubmitAttempt=false;
    
    this.testInfoForm.get('testId')?.setValue('');
    this.testInfoForm.get('testName')?.setValue('');
    this.testInfoForm.get('testCost')?.setValue(0);
    this.testInfoForm.get('remarks')?.setValue('');
    this.testInfoForm.get('percentangeToDoctor')?.setValue(0);
    this.testInfoForm.get('unit')?.setValue('');
    this.testInfoForm.get('cashToDoctor')?.setValue(0);
    this.testInfoForm.get('categoryId')?.setValue('');
    
  }
}

