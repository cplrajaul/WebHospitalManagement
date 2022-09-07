import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ResponseCode } from "src/app/enums/responseCode";
import { PatientAdmissionInfoModel } from "src/app/models/hospital-management-models/patientAdmissionInfoModel";
import { CategoryModel } from "src/app/models/inventory-models/category";
import { OrderModel } from "src/app/models/inventory-models/orderModel";
import { ProductInfmodel } from "src/app/models/inventory-models/product";
import { ResponseModel } from "src/app/models/responseModel";
import { PatientAdmissionService } from "src/app/services/hospital-management-services/patient-admission.service";
import { CategoryService } from "src/app/services/inventory-management-services/category.service";
import { OrderService } from "src/app/services/inventory-management-services/order.service";
import { ProductService } from "src/app/services/inventory-management-services/product.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, private toastr: ToastrService,
    private orderService: OrderService,
    private categoryInfoService: CategoryService,
    private productInfoService: ProductService,
    private patientAdmissionService:PatientAdmissionService
  ) {}

  public orderModel:OrderModel=new OrderModel  ();
  public categoryList: CategoryModel[] = [];
  public productList: ProductInfmodel[] = [];
  public patientList: PatientAdmissionInfoModel[] = [];
  public actionName: string = 'Create';
  public itemList: OrderModel[] = [];
  public formSubmitAttempt: boolean= false;

  @ViewChild('closebutton') closebutton: any;
  
  ngOnInit(): void {
    this.clearForm();
    this.getAll();
    this.getPatientDDL();
    this.getCategoryDDL();
  }

  getAll() {
    this.orderService.getAll().subscribe((data: any) => {
        this.itemList = data;
        console.log(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Something went wrong please try again later');
      }
    );
  }

  getPatientDDL() {
    this.patientAdmissionService.getAll().subscribe((data: any) => {
        this.patientList = data;
        console.log(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('.....Something went wrong please try again later');
      }
    );
  }

  getProductDDL(id: any) {
    this.productInfoService.getProductByCategoryId(parseInt(id)).subscribe((data: any) => {
      this.orderForm.get('productId')?.setValue('');
      this.orderForm.get('salesUnitPrice')?.setValue(0);
      this.orderForm.get('productName')?.setValue('');
        this.productList = data;
        console.log(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('.....Something went wrong please try again later');
      }
    );
  }

  getProductDDLForEdit(id: any) {
    this.productInfoService.getProductByCategoryId(parseInt(id)).subscribe((data: any) => {
        this.productList = data;
        console.log(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('.....Something went wrong please try again later');
      }
    );
  }

  getCategoryDDL() {
    this.categoryInfoService.getAll().subscribe((data: any) => {
        this.categoryList = data;
        console.log(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('.....Something went wrong please try again later');
      }
    );
  }

  getProductById(id : any){
    this.productInfoService.getById(parseInt(id)).subscribe((data: any) => {
      this.orderModel = data;
      this.orderForm.get('salesUnitPrice')?.setValue(this.orderModel.salesUnitPrice);
      this.orderForm.get('productName')?.setValue(this.orderModel.productName);
      this.fillTotal();
      console.log(data);
  }, error => {
      console.log("error", error)
      this.toastr.error(".....Something went wrong please try again later");
  })
  }

  fillTotal(){
 
    this.orderForm.get('total')?.setValue(this.orderForm.value.salesUnitPrice * this.orderForm.value.quantity);
  }

  public orderForm = this.formBuilder.group({
    orderId: [0],
    categoryId: [0, Validators.required],
    patientAdmissionId: [0, Validators.required],
    date_Of_Order: ['', Validators.required],
    orderDeatils: ['', Validators.required],
    quantity: [0],
    salesUnitPrice: [0],
    total: [0],
    productId: [0, Validators.required],
    
  });

  get orderId() {return this.orderForm.get('orderId');}
  get categoryId() {return this.orderForm.get('categoryId');}
  get patientAdmissionId() {return this.orderForm.get('patientAdmissionId');}
  get date_Of_Order() {return this.orderForm.get('date_Of_Order');}
  get orderDeatils() {return this.orderForm.get('orderDeatils');}
  get quantity() {return this.orderForm.get('quantity');}
  get salesUnitPrice() {return this.orderForm.get('salesUnitPrice');}
  get productId() {return this.orderForm.get('productId');}
  get total() {return this.orderForm.get('total');}

  pupulateForm(selectedRecord: OrderModel) {
    this.orderForm.patchValue({
      orderId: selectedRecord.orderId,
      categoryId: selectedRecord.categoryId,
      patientAdmissionId: selectedRecord.patientAdmissionId,
      date_Of_Order: selectedRecord.date_Of_Order,
      orderDeatils: selectedRecord.orderDeatils,
      quantity: selectedRecord.quantity,
      salesUnitPrice: selectedRecord.salesUnitPrice,
      productId: selectedRecord.productId,
      productName:selectedRecord.productName,
      total: selectedRecord.salesUnitPrice * selectedRecord.quantity
    });
    this.getProductDDLForEdit(selectedRecord.categoryId);
    this.actionName = 'Update';
  }

  onSubmit() {
    if(this.orderForm.valid){
      this.orderService.OrderModel.orderId = this.orderForm.value.orderId || 0;
      this.orderService.OrderModel.categoryId = this.orderForm.value.categoryId || 0;
      this.orderService.OrderModel.patientName = this.orderForm.value.patientName;
      this.orderService.OrderModel.productName = this.orderForm.value.productName;
      this.orderService.OrderModel.date_Of_Order = this.orderForm.value.date_Of_Order;
      this.orderService.OrderModel.orderDeatils = this.orderForm.value.orderDeatils;
      this.orderService.OrderModel.quantity = this.orderForm.value.quantity;
      this.orderService.OrderModel.salesUnitPrice = this.orderForm.value.salesUnitPrice;
      this.orderService.OrderModel.total = this.orderForm.value.total;
      
      if (this.orderForm.value.orderId == 0 || this.orderForm.value.orderId == null) 
    {
      this.insert();
    } else {
      this.update();
    }
    }
    else{
      this.formSubmitAttempt=true;
    }
  }

  insert() {
    const formData: FormData = new FormData();
    formData.append('OrderId', this.orderForm.value.orderId);
    formData.append('CategoryId', this.orderForm.value.categoryId);
    formData.append('PatientAdmissionId', this.orderForm.value.patientAdmissionId);
    formData.append('Date_Of_Order', this.orderForm.value.date_Of_Order);
    formData.append('OrderDeatils', this.orderForm.value.orderDeatils);
    formData.append('Quantity', this.orderForm.value.quantity);
    formData.append('SalesUnitPrice', this.orderForm.value.salesUnitPrice);
    formData.append('ProductId', this.orderForm.value.productId);
    formData.append('Total', this.orderForm.value.total);

    this.orderService.insert(formData).subscribe((data: ResponseModel) => {
        if (data.responseCode == ResponseCode.OK) {
          this.toastr.success(data.responseMessage);
          this.getAll();
          this.clearForm();
          this.closebutton.nativeElement.click();
        } else {
          this.toastr.error(data.responseMessage);
        }
        console.log('response', data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Something Went Wrong, Please try again');
      }
    );
  }

  update() {
    const formData: FormData = new FormData();
    formData.append('OrderId', this.orderForm.value.orderId);
    formData.append('CategoryId', this.orderForm.value.categoryId);
    formData.append('PatientAdmissionId', this.orderForm.value.patientAdmissionId);
    formData.append('Date_Of_Order', this.orderForm.value.date_Of_Order);
    formData.append('OrderDeatils', this.orderForm.value.orderDeatils);
    formData.append('Quantity', this.orderForm.value.quantity);
    formData.append('SalesUnitPrice', this.orderForm.value.salesUnitPrice);
    formData.append('ProductId', this.orderForm.value.productId);
    formData.append('Total', this.orderForm.value.total);

    this.orderService.update(formData).subscribe((data: ResponseModel) => {
        if (data.responseCode == ResponseCode.OK) {
          this.toastr.success(data.responseMessage);
          this.getAll();
          this.clearForm();
          this.actionName = 'Create';
          this.closebutton.nativeElement.click();
        } else {
          this.toastr.error(data.responseMessage);
        }
        console.log('response', data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error(
          'Something Went Wrong, Update Failed. Please try again'
        );
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you want to delete this recored?')) {
      this.orderService.delete(id).subscribe(
        (res) => {
          this.toastr.success('Deleted Successfully');
          this.clearForm();
          this.getAll();
        },
        (err) => {
          this.toastr.error('Delete Failed');
          console.log(err);
        }
      );
    }
  }

  clearForm() {
    this.orderForm.reset();
    this.formSubmitAttempt=false;
    
    this.orderForm.get('patientAdmissionId')?.setValue('');
    this.orderForm.get('categoryId')?.setValue('');
    this.orderForm.get('productId')?.setValue('');
    this.orderForm.get('date_Of_Order')?.setValue('');
    this.orderForm.get('orderDeatils')?.setValue('');
    this.orderForm.get('quantity')?.setValue(0);
    this.orderForm.get('salesUnitPrice')?.setValue(0);
    this.orderForm.get('total')?.setValue(0);
  }
}

