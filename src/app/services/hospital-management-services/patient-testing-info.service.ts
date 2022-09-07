import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { PatientTestingInfoModel } from 'src/app/models/hospital-management-models/patientTesingModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PatientTestingInfoService {

  public patientTestingInfoViewModel:PatientTestingInfoModel []= [];
  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }
  private readonly patientTestingInfo:string= Constants.API_KEY+"api/PatientTestingInfo/";

  public insert(){
    return this.httpClient.post<ResponseModel>(this.patientTestingInfo+"Insert",this.patientTestingInfoViewModel);
  }
  public update(){
    return this.httpClient.put<ResponseModel>(this.patientTestingInfo+"Update",this.patientTestingInfoViewModel);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.patientTestingInfo+"GetAll");
  }
  public delete(id:number){
    return this.httpClient.delete(`${this.patientTestingInfo}${id}`)
  }
 
}
