import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { CategoryModel } from 'src/app/models/inventory-models/category';
import { ProductInfmodel } from 'src/app/models/inventory-models/product';
import { SupplierModel } from 'src/app/models/inventory-models/supplier';
import { ResponseModel } from 'src/app/models/responseModel';
import { CategoryService } from 'src/app/services/inventory-management-services/category.service';
import { ProductService } from 'src/app/services/inventory-management-services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private productService: ProductService) { }

  public productList: ProductInfmodel[] = [];
  public categoryList: CategoryModel[] = [];
  public supplierList: SupplierModel[] = [];

  filePath: string = "../../../../assets/dist/img/loding.gif";
  noImage:string = "../../../../assets/dist/img/noImage.png"
  fileToUpload: any;
  imageSource: string = Constants.API_KEY + "images/product_images/";
  public formSubmitAttempt: boolean = false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this. clearForm();
    this.getAll();
    this.getSupplierList();
    this.getCategoryList();
  }

  handleFileInput(e: any) {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files.length) {
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.ProductInformationfrom.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  getAll() {
    this.productService.getAll().subscribe((data: any) => {
      this.productList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  totalMedicinePrice(){
      this.ProductInformationfrom.get('totalPrice')?.setValue(this.ProductInformationfrom.value.unitPrice * this.ProductInformationfrom.value.quantity);
  }


  public ProductInformationfrom = this.formBuilder.group({
    productId: [0,],
    productName: ['', Validators.required],
    purchaseDate: ['', Validators.required],
    supplierId: ['', Validators.required],
    categoryId: ['', Validators.required],
    quantity: ['', Validators.required],
    unitPrice: ['', Validators.required],
    salesUnitPrice: ['', Validators.required],
    totalPrice: [''],
    imageName: ['']
   })

  get productName() { return this.ProductInformationfrom.get("productName") };
  get purchaseDate() { return this.ProductInformationfrom.get("purchaseDate") };
  get supplierId() { return this.ProductInformationfrom.get("supplierId") };
  get categoryId() { return this.ProductInformationfrom.get("categoryId") };
  get quantity() { return this.ProductInformationfrom.get("quantity") };
  get unitPrice() { return this.ProductInformationfrom.get("unitPrice") }
  get salesUnitPrice() { return this.ProductInformationfrom.get("salesUnitPrice") }


  //get imageName() { return this.ProductInformationfrom.get("imageName") }

  pupulateForm(selectedRecord: ProductInfmodel) {
    this.ProductInformationfrom.patchValue({
      productId: selectedRecord.productId,
      productName: selectedRecord.productName,
      purchaseDate: selectedRecord.purchaseDate,
      supplierId: selectedRecord.supplierId,
      categoryId: selectedRecord.categoryId,
      quantity: selectedRecord.quantity,
      unitPrice: selectedRecord.unitPrice,
      salesUnitPrice: selectedRecord.salesUnitPrice,
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
    if (this.ProductInformationfrom.valid) {
      if (this.ProductInformationfrom.value.productId == 0 || this.ProductInformationfrom.value.productId == null) {
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
    formdata.append('ProductId', this.ProductInformationfrom.value.productId);
    formdata.append('ProductName', this.ProductInformationfrom.value.productName);
    formdata.append('PurchaseDate', this.ProductInformationfrom.value.purchaseDate);
    formdata.append('SupplierId', this.ProductInformationfrom.value.supplierId);
    formdata.append('CategoryId', this.ProductInformationfrom.value.categoryId);
    formdata.append('Quantity', this.ProductInformationfrom.value.quantity);
    formdata.append('UnitPrice', this.ProductInformationfrom.value.unitPrice);
    formdata.append('SalesUnitPrice', this.ProductInformationfrom.value.salesUnitPrice);
    formdata.append("ImageName", this.ProductInformationfrom.value.imageName);
    formdata.append('Photo', this.fileToUpload);


    this.productService.insert(formdata).subscribe((data: ResponseModel) => {
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
    formdata.append('ProductId', this.ProductInformationfrom.value.productId);
    formdata.append('ProductName', this.ProductInformationfrom.value.productName);
    formdata.append('PurchaseDate', this.ProductInformationfrom.value.purchaseDate);
    formdata.append('SupplierId', this.ProductInformationfrom.value.supplierId);
    formdata.append('CategoryId', this.ProductInformationfrom.value.categoryId);
    formdata.append('Quantity', this.ProductInformationfrom.value.quantity);
    formdata.append('UnitPrice', this.ProductInformationfrom.value.unitPrice);
    formdata.append('SalesUnitPrice', this.ProductInformationfrom.value.salesUnitPrice);
    formdata.append("ImageName", this.ProductInformationfrom.value.imageName);
    formdata.append('Photo', this.fileToUpload);
    this.productService.update(formdata).subscribe((data: ResponseModel) => {
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
      this.productService.delete(id).subscribe(
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
    this.ProductInformationfrom.reset();
    this.filePath = "../../../../assets/dist/img/loding.gif";
    this.formSubmitAttempt=false;
    this.fileToUpload='';
    this.ProductInformationfrom.get('productId')?.setValue('');
    this.ProductInformationfrom.get('productName')?.setValue('');
    this.ProductInformationfrom.get('purchaseDate')?.setValue('');
    this.ProductInformationfrom.get('supplierId')?.setValue('');
    this.ProductInformationfrom.get('categoryId')?.setValue('');
    this.ProductInformationfrom.get('quantity')?.setValue('');
    this.ProductInformationfrom.get('UnitPrice')?.setValue('');
    this.ProductInformationfrom.get('SalesUnitPrice')?.setValue('');
    this.ProductInformationfrom.get('totalPrice')?.setValue('');
  }

  getSupplierList(){
    this.productService.getAllSupplier().subscribe((data:any) => {
      this.supplierList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
}
getCategoryList(){
  this.productService.getAllCategory().subscribe((data:any) => {
    this.categoryList = data;
    console.log(data);
  }, error => {
    console.log("error", error)
    this.toastr.error("Something went wrong please try again later");
  })
}

}
