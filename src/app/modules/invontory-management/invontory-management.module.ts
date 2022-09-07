import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgSelectModule } from "@ng-select/ng-select";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "src/app/app-routing.module";
import { CategoryComponent } from "./category/category.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./product/product.component";
import { SupplierComponent } from "./supplier/supplier.component";






@NgModule({
  declarations: [
  
      ProductComponent,
      SupplierComponent,
      CategoryComponent,
      OrderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    ProductComponent,
       SupplierComponent,
       CategoryComponent,
       OrderComponent
  ]
})
export class InvontoryManagementModule { }
