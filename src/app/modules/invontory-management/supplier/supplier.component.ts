import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { SupplierModel } from 'src/app/models/inventory-models/supplier';
import { ResponseModel } from 'src/app/models/responseModel';
import { SupplierService } from 'src/app/services/inventory-management-services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [
  ]
})
export class SupplierComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private supplierService: SupplierService) { }
  public itemList:SupplierModel[]=[];
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/supplier_images/";
  noImage:string = "../../../../assets/dist/img/noImage.png"
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;
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
        this.supplierForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }
  getAll() {
    this.supplierService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  pupulateForm(selectedRecord: SupplierModel) {
    this.supplierForm.patchValue({
      supplierId: selectedRecord.supplierId,
      companyName: selectedRecord.companyName,
      contactName:selectedRecord.contactName,
      address:selectedRecord.address,
      phone:selectedRecord.phone,
      email:selectedRecord.email,
      imageName:selectedRecord.imageName
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
   
  }

  onSubmit() {
    if(this.supplierForm.valid){
      debugger;
      if (this.supplierForm.value.supplierId == 0 || this.supplierForm.value.supplierId==null) {
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
    const formData: FormData = new FormData();
    formData.append('SupplierId', this.supplierForm.value.supplierId);
    formData.append('CompanyName', this.supplierForm.value.companyName);
    formData.append('ContactName', this.supplierForm.value.contactName);
    formData.append('Address', this.supplierForm.value.address);
    formData.append('Phone', this.supplierForm.value.phone);
    formData.append('Email', this.supplierForm.value.email);
    formData.append('Photo', this.fileToUpload);
    formData.append("ImageName", this.supplierForm.value.imageName);


    this.supplierService.insert(formData).subscribe((data: ResponseModel) => {
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
  update() {
    const formData: FormData = new FormData();
    formData.append('SupplierId', this.supplierForm.value.supplierId);
    formData.append('CompanyName', this.supplierForm.value.companyName);
    formData.append('ContactName', this.supplierForm.value.contactName);
    formData.append('Address', this.supplierForm.value.address);
    formData.append('Phone', this.supplierForm.value.phone);
    formData.append('Email', this.supplierForm.value.email);
    formData.append('Photo', this.fileToUpload);
    formData.append("ImageName", this.supplierForm.value.imageName);


    this.supplierService.update(formData).subscribe((data: ResponseModel) => {
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
      this.toastr.error("Something went worng please try again later");
    }
    )
  }
  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
       this.supplierService.delete(id).subscribe(
        res=>{
          // this.service.refreshList();
          this.getAll();   
          this.clearForm();
          this.toastr.success("Information Delete successfully")
        },
        err=>{
          this.toastr.error("Delete Failed");
          console.log(err)
        }
      )
    }
  }
  public supplierForm = this.formBuilder.group({
    supplierId: [0],
    companyName: ['', Validators.required],
    contactName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    imageName: ['']
  })
  get companyName() { return this.supplierForm.get("companyName") };
  get contactName() { return this.supplierForm.get("contactName") };
  get address() { return this.supplierForm.get("address") };
  get phone() { return this.supplierForm.get("phone") };
  get email() { return this.supplierForm.get("email") };
    
  clearForm() {
    this.supplierForm.reset();
    this.filePath= "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
    this.fileToUpload='';
    this.supplierForm.get('supplierId')?.setValue('');
    this.supplierForm.get('companyName')?.setValue('');
    this.supplierForm.get('contactName')?.setValue('');
    this.supplierForm.get('address')?.setValue('');
    this.supplierForm.get('phone')?.setValue('');
    this.supplierForm.get('email')?.setValue('');
    this.supplierForm.get('imageName')?.setValue('');
  }

}
