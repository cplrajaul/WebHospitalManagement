import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { CabinTypeModel } from 'src/app/models/hospital-management-models/cabinTypeModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CabinTypeService {

  public cabinTypeModel:CabinTypeModel=new CabinTypeModel();
  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }
  private readonly cabinType:string=Constants.API_KEY+"api/CabinTypeInfo/";
  public insert(){
    return this.httpClient.post<ResponseModel>(this.cabinType+"Insert",this.cabinTypeModel);
  }
  public update(){
    return this.httpClient.put<ResponseModel>(this.cabinType+"Update",this.cabinTypeModel);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.cabinType+"GetAll");
  }
  public delete(id:number)
  {
    return this.httpClient.delete(`${this.cabinType}${id}`)
  }
}
