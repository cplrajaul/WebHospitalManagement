import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { OutdoorConsultancyModel } from 'src/app/models/hospital-management-models/outdoorConsultancyModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OutdoorConsultancyInfoService {
  
  public outdoorCOnsultancyModel:OutdoorConsultancyModel=new OutdoorConsultancyModel();
  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }
  private readonly outdoorConsultancy:string= Constants.API_KEY+"api/OutDoorConsultancy/";
  public insert(){
  
    return this.httpClient.post<ResponseModel>(this.outdoorConsultancy+"Insert", this.outdoorCOnsultancyModel);
  }
   public update(){
    
  
    return this.httpClient.put<ResponseModel>(this.outdoorConsultancy+"Update", this.outdoorCOnsultancyModel);
  }

  public getAll(){
  
    return this.httpClient.get<ResponseModel>(this.outdoorConsultancy+"GetAll");
  }

  public delete(id:number){

    return this.httpClient.delete(`${this.outdoorConsultancy}${id}`);
  }
}
