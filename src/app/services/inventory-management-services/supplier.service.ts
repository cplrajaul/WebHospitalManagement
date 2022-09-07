import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }
  private readonly supplierURL:string=Constants.API_KEY+"api/Supplier/";
  public insert(parms:any){
    return this.httpClient.post<ResponseModel>(this.supplierURL+"Insert",parms);
  }
  public update(parms:any){
    return this.httpClient.put<ResponseModel>(this.supplierURL+"Update",parms);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.supplierURL+"GetAll");
  }
  public delete(id:number)
  {
    return this.httpClient.delete(`${this.supplierURL}${id}`)
  }
  public getByTypeId(id:number){
    debugger;
    return this.httpClient.get<ResponseModel>(this.supplierURL+"GetByTypeId?id="+id);
  }
}
