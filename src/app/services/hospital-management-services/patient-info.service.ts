import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoService {

  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }
  private readonly patientInfo:string= Constants.API_KEY+"api/PatientInfo/";
  public insert(params:any){
    return this.httpClient.post<ResponseModel>(this.patientInfo +"Insert", params)
  }
  public update(params:any){
    return this.httpClient.put<ResponseModel>(this.patientInfo +"Update", params)
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.patientInfo+"GetAll");
  }
  public delete(id:number){
    return this.httpClient.delete(`${this.patientInfo}${id}`)
  }
}
