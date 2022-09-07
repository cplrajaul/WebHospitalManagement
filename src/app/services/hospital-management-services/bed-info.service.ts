import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { BedInfoModel } from 'src/app/models/hospital-management-models/bedInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BedInfoService {

  public bedInfoModel:BedInfoModel=new BedInfoModel();
  constructor(private httpClient:HttpClient,private toastr:ToastrService) { }
  private readonly bedInfoUrl:string=Constants.API_KEY+"api/BedInfo/";
  public insert(){
    return this.httpClient.post<ResponseModel>(this.bedInfoUrl+"Insert",this.bedInfoModel);
  }
  public update(){
    return this.httpClient.put<ResponseModel>(this.bedInfoUrl+"Update",this.bedInfoModel);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.bedInfoUrl+"GetAll");
  }
  public delete(id:number)
  {
    return this.httpClient.delete(`${this.bedInfoUrl}${id}`)
  }
  public getByWardNo(id:number){
    debugger;
    return this.httpClient.get<ResponseModel>(this.bedInfoUrl+"GetByWardNo?id="+id);
  }
}
