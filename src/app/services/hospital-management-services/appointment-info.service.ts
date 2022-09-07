import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Helper/constants';
import { AppointmentInfoEntryModel } from 'src/app/models/hospital-management-models/appointmentInfoEntryModel';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AppointmentInfoService {
  public appointmentInfoModel :AppointmentInfoEntryModel = new AppointmentInfoEntryModel();
  constructor(private httpClient:HttpClient) { }
  private readonly appointmentInfo:string= Constants.API_KEY+"api/AppointmentInfo/";
  public insert(){
    return this.httpClient.post<ResponseModel>(this.appointmentInfo+"Insert", this.appointmentInfoModel)
  }
  public update(){
    return this.httpClient.put<ResponseModel>(this.appointmentInfo+"Update", this.appointmentInfoModel)
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.appointmentInfo+"GetAll");
  }
  public delete(id:number){
    debugger
    return this.httpClient.delete(`${this.appointmentInfo}${id}`)
  }
}
