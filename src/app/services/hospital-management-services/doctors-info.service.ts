import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DoctorsInfoService {

  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }
  private readonly doctorInfoURL:string=Constants.API_KEY+"api/DoctorsInfo/";
  public insert(params:any)
  {
    return this.httpClient.post<ResponseModel>(this.doctorInfoURL+"Insert", params)
  }
  public update(params:any)
  {
    return this.httpClient.put<ResponseModel>(this.doctorInfoURL+"Update", params)
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.doctorInfoURL+"GetAll");
  }
  public delete(id:number){
    debugger;
    return this.httpClient.delete(`${this.doctorInfoURL}${id}`)
  }

}
