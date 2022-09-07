import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }
  private readonly productInfoUrl:string= Constants.API_KEY+"api/product/";
  private readonly supplierUrl:string= Constants.API_KEY+"api/supplier/";
  private readonly categoryUrl:string= Constants.API_KEY+"api/category/";
  public insert(params:any){
    return this.httpClient.post<ResponseModel>(this.productInfoUrl +"Insert", params)
  }
  public update(params:any){
    return this.httpClient.put<ResponseModel>(this.productInfoUrl +"Update", params)
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.productInfoUrl+"GetAll");
  }
  public delete(id:number){
    return this.httpClient.delete(`${this.productInfoUrl}${id}`)
  }
  public getAllCategory() {
    return this.httpClient.get<ResponseModel>(this.categoryUrl+"GetAll");
  }
  public getProductByCategoryId(id:number) {
    return this.httpClient.get<ResponseModel>(this.productInfoUrl+"GetProductByCategoryId?id="+id);
  }

  public getAllSupplier() {
    return this.httpClient.get<ResponseModel>(this.supplierUrl+"GetAll");
  }
  public getById(id:number) {
    return this.httpClient.get<ResponseModel>(this.productInfoUrl+"GetById?id="+id);
  }

}
