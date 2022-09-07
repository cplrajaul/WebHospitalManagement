import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { PatientAdmissionInfoModel } from 'src/app/models/hospital-management-models/patientAdmissionInfoModel';
import { PatientMedicineInfoModel } from 'src/app/models/hospital-management-models/patientMedicineInfoModel';
import { CategoryModel } from 'src/app/models/inventory-models/category';
import { ProductInfmodel } from 'src/app/models/inventory-models/product';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientAdmissionService } from 'src/app/services/hospital-management-services/patient-admission.service';
import { PatientMedicineInfoService } from 'src/app/services/hospital-management-services/patient-medicine-info.service';
import { CategoryService } from 'src/app/services/inventory-management-services/category.service';
import { ProductService } from 'src/app/services/inventory-management-services/product.service';

@Component({
    selector: 'app-patient-medicine-info',
    templateUrl: './patient-medicine-info.component.html',
    styles: [
    ]
})
export class PatientMedicineInfoComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService, 
        public patientMedicineInfoService: PatientMedicineInfoService, 
        private categoryInfoService: CategoryService,
        private productInfoService: ProductService,
        private patientAdmissionService:PatientAdmissionService){ }

    public patientAdmissionList: PatientAdmissionInfoModel[] = [];
    public medicineList: ProductInfmodel[] = [];
    public patientMedicineInfoModel:PatientMedicineInfoModel=new PatientMedicineInfoModel();
    public itemList:PatientMedicineInfoModel[]=[];
    public categoryList: CategoryModel[] = [];
    public formSubmitAttempt: boolean = false;
    public actionName: string = 'Create';
    public total: any = 0;
    public grandTotals: any = 0;

    @ViewChild('closebutton') closebutton: any;
    ngOnInit(): void {
        this.clearForm();
        this.getAll();
        this.getProductCatagory();
        this.getAdmissionInfoList();

    }

    getMedicineInfoList(categoryId: any) {
        this.patientMedicineInfoService.getAll().subscribe((data: any) => {
            this.medicineList = data;
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error("Something went wrong please try again later");
        })
    }

    getProductCatagory() {
        this.categoryInfoService.getAll().subscribe((data: any) => {
            this.categoryList = data;
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error("Something went wrong please try again later");
        })
    }

    
    getAdmissionInfoList() {
        this.patientAdmissionService.getAll().subscribe((data: any) => {
            this.patientAdmissionList = data;
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error(".....Something went wrong please try again later");
        })
    }
    getMedicineInfoByCategoryId(id: any) {
        this.productInfoService.getProductByCategoryId(id).subscribe((data: any) => {
            this.medicineList = data;
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error(".....Something went wrong please try again later");
        })
    }
    
    getMedicinById(id: any) {
        this.productInfoService.getById(parseInt(id)).subscribe((data: any) => {
            this.patientMedicineInfoModel = data;
            this.patientMedicineInfoForm.get('unitPrice')?.setValue(this.patientMedicineInfoModel.unitPrice);
            this.patientMedicineInfoForm.get('productName')?.setValue(this.patientMedicineInfoModel.productName);
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error(".....Something went wrong please try again later");
        })
    }

    getMedicinForEdit(id: any) {
        this.productInfoService.getProductByCategoryId(parseInt(id)).subscribe((data: any) => {
            this.medicineList = data;
        }, error => {
            console.log("error", error)
            this.toastr.error(".....Something went wrong please try again later");
        })
    }




    public patientMedicineInfoForm = this.formBuilder.group({
        patientMedicineInfoId: [0],
        productId: [0, Validators.required],
        patientAdmissionId: [0, Validators.required],
        medicineDate: ['', Validators.required],
        instructionsForMedicine: ['', Validators.required],
        quantity: [0, Validators.required],
        unitPrice: [0, Validators.required],
        categoryId: ['', Validators.required],
        grandTotals:[0],
        indexNumber: [0,]
    })

    get patientMedicineInfoId() { return this.patientMedicineInfoForm.get("patientMedicineInfoId") };
    get productId() { return this.patientMedicineInfoForm.get("productId") };
    get patientAdmissionId() { return this.patientMedicineInfoForm.get("patientAdmissionId") };
    get medicineDate() { return this.patientMedicineInfoForm.get("medicineDate") };
    get instructionsForMedicine() { return this.patientMedicineInfoForm.get("instructionsForMedicine") };
    get quantity() { return this.patientMedicineInfoForm.get("quantity") };
    get unitPrice() { return this.patientMedicineInfoForm.get("unitPrice") };
    get categoryId() { return this.patientMedicineInfoForm.get("categoryId") };


    pupulateForm(selectedRecord: PatientMedicineInfoModel, index:number) {
        this.patientMedicineInfoForm.patchValue({
            patientMedicineInfoId: selectedRecord.patientMedicineInfoId,
            productId: selectedRecord.productId,
            productName: selectedRecord.productName,
            patientAdmissionId: selectedRecord.patientAdmissionId,
            medicineDate: selectedRecord.medicineDate,
            instructionsForMedicine: selectedRecord.instructionsForMedicine,
            quantity: selectedRecord.quantity,
            unitPrice: selectedRecord.unitPrice,
            categoryId:selectedRecord.categoryId,          
            indexNumber: index
        });
        this.getMedicinForEdit(selectedRecord.categoryId);
        this.actionName = 'Update';
    }



    deleteFormMedicineList(index:number){
        delete this.patientMedicineInfoService.patientMedicineInfoViewModel[index];
        const valueToKeep = this.patientMedicineInfoService.patientMedicineInfoViewModel;
        this.patientMedicineInfoService.patientMedicineInfoViewModel=[];
        valueToKeep.forEach(element => {
        this.patientMedicineInfoService.patientMedicineInfoViewModel.push(element);
    });
    this.getTotal();
    }
    onMedicineListSubmit() {
        if (this.patientMedicineInfoForm.valid) {
          let index = this.patientMedicineInfoForm.value.indexNumber || 0;
          if (index == 0) {
            this.patientMedicineInfoService.patientMedicineInfoViewModel.push(this.patientMedicineInfoForm.value)
            this.getTotal();
            this.getProductCatagory();
          } else {
            this.patientMedicineInfoService.patientMedicineInfoViewModel[index - 1] = this.patientMedicineInfoForm.value;
            this.getTotal();
          }
          this.clearForm();
        } else {
          this.formSubmitAttempt = true;
        }
      }
  
    getAll() {
        this.patientMedicineInfoService.getAll().subscribe((data: any) => {
            this.itemList = data;
            console.log(data);
        }, error => {
            console.log("error", error)
            this.toastr.error("Something went wrong please try again later");
        })
    }

    insert() {
        this.patientMedicineInfoService.insert().subscribe((data: ResponseModel) => {
            if (data.responseCode == ResponseCode.OK) {
                this.toastr.success(data.responseMessage)
                this.getAll();
                this.clearForm();
                this.closebutton.nativeElement.click();
            }
            else {
                this.toastr.error(data.responseMessage)
            }
            console.log("response", data)
        }, error => {
            console.log("error", error);
            this.toastr.error("Something Went Wrong, Please try again")
        })
    }

    update() {
        const formData: FormData = new FormData();
        formData.append('PatientMedicineInfoId', this.patientMedicineInfoForm.value.patientMedicineInfoId);
        formData.append('ProductId', this.patientMedicineInfoForm.value.productId);
        formData.append('PatientAdmissionId', this.patientMedicineInfoForm.value.patientAdmissionId);
        formData.append('MedicineDate', this.patientMedicineInfoForm.value.medicineDate);
        formData.append('InstructionsForMedicine', this.patientMedicineInfoForm.value.instructionsForMedicine);
        formData.append('Quantity', this.patientMedicineInfoForm.value.quantity);
        formData.append('UnitPrice', this.patientMedicineInfoForm.value.unitPrice);
        formData.append('CategoryId', this.patientMedicineInfoForm.value.categoryId);

        this.patientMedicineInfoService.update().subscribe((data: ResponseModel) => {
            if (data.responseCode == ResponseCode.OK) {
                this.toastr.success(data.responseMessage)
                this.getAll();
                this.clearForm();
                this.actionName='Create';
                this.closebutton.nativeElement.click();
            }
            else {
                this.toastr.error(data.responseMessage)
            }
            console.log("response", data)
        }, error => {
            console.log("error", error);
            this.toastr.error("Something Went Wrong, Update Failed. Please try again")
        })
    }
    onDelete(id: number) {
        if (confirm("Are you want to delete this recored?")) {
            this.patientMedicineInfoService.delete(id).subscribe(
                res => {
                    this.toastr.success("Successfully Deleted")
                    this.clearForm();
                    this.getAll();
                },
                err => {
                    this.toastr.error("Delete Failed");
                    console.log(err)
                }
            )
        }
    }
    clearForm() {
        this.patientMedicineInfoForm?.get('patientMedicineInfoId')?.setValue(0);
        this.patientMedicineInfoForm?.get('productId')?.setValue(0);
        this.patientMedicineInfoForm?.get('productName')?.setValue('');
        this.patientMedicineInfoForm?.get('patientAdmissionId')?.setValue(0);
        this.patientMedicineInfoForm?.get('medicineDate')?.setValue('');
        this.patientMedicineInfoForm?.get('instructionsForMedicine')?.setValue('');
        this.patientMedicineInfoForm?.get('quantity')?.setValue(0);
        this.patientMedicineInfoForm?.get('unitPrice')?.setValue(0);
        this.patientMedicineInfoForm?.get('categoryId')?.setValue(0);
        this.patientMedicineInfoForm?.get('indexNumber')?.setValue(0);
    }



    getTotal(){
        this.patientMedicineInfoForm.get('total')?.setValue(
            this.patientMedicineInfoForm.value.quantity*(this.patientMedicineInfoForm.value.unitPrice))
    }

    grandTotal(){
        this.patientMedicineInfoForm.get('grandTotals')?.setValue(
            this.patientMedicineInfoForm.value.total+this.patientMedicineInfoForm.value.total)
        // this.total=0;
        // this.patientMedicineInfoService.patientMedicineInfoViewModel.forEach(element => {
        //     this.total = this.total + element.unitPrice;
        // });
    }        
}
