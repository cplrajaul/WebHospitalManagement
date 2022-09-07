import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { DesignationInfoModel } from 'src/app/models/hr-management-models/designation-model';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  public designationModel:DesignationInfoModel = new DesignationInfoModel();
  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }

  private readonly designation:string=Constants.API_KEY+"api/Designation/";


  public insert(){
    return this.httpClient.post<ResponseModel>(this.designation+"Insert",this.designationModel);

  }

  public  update (){
    
    return this.httpClient.put<ResponseModel>(this.designation+"Update",this.designationModel);

  }

  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.designation+"GetAll");
  }

  public delete(id:number){
    return this.httpClient.delete(`${this.designation}${id}`)
  }
  
}
