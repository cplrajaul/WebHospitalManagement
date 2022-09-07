import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CabinInfoService {

  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }
  private readonly cabinInfoURL:string=Constants.API_KEY+"api/CabinInfo/";
  public insert(parms:any){
    return this.httpClient.post<ResponseModel>(this.cabinInfoURL+"Insert",parms);
  }
  public update(parms:any){
    return this.httpClient.put<ResponseModel>(this.cabinInfoURL+"Update",parms);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.cabinInfoURL+"GetAll");
  }
  public delete(id:number)
  {
    return this.httpClient.delete(`${this.cabinInfoURL}${id}`)
  }
  public getByTypeId(id:number){
    debugger;
    return this.httpClient.get<ResponseModel>(this.cabinInfoURL+"GetByTypeId?id="+id);
  }
}
