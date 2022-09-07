import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { OrderModel } from 'src/app/models/inventory-models/orderModel';

import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public OrderModel: OrderModel = new OrderModel();

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  private readonly order: string = Constants.API_KEY + "api/Order/";

  public insert(params:any) {
    return this.httpClient.post<ResponseModel>(this.order + "Insert", params);
  }
  public update(params:any) {
    return this.httpClient.put<ResponseModel>(this.order + "Update", params);
  }
  public getAll() {
    return this.httpClient.get<ResponseModel>(this.order + "GetAll");
  }
  public delete(id: number) {
    return this.httpClient.delete(`${this.order}${id}`)
  }
}
