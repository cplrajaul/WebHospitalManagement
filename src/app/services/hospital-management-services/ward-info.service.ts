import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class WardInfoService {

  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }

  private readonly wardInfo:string=Constants.API_KEY+"api/WardInfo/";


  public insert(parms:any){
    debugger;
    return this.httpClient.post<ResponseModel>(this.wardInfo+"Insert",parms);

  }

  public   update (parms:any){
    debugger;
    return this.httpClient.put<ResponseModel>(this.wardInfo+"Update",parms);

  }

  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.wardInfo+"GetAll");
  }

  public delete(id:number){
    return this.httpClient.delete(`${this.wardInfo}${id}`)
  }
}
