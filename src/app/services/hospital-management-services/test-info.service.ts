import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { TestInfoModel } from 'src/app/models/hospital-management-models/testInfoModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TestInfoService {
  public testInfoModel:TestInfoModel = new TestInfoModel();
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
  private readonly testInfoURL: string = Constants.API_KEY+"api/TestInfo/";
  public insert() {
    return this.httpClient.post<ResponseModel>(this.testInfoURL + "Insert", this.testInfoModel);
  }

  public update() {
    return this.httpClient.put<ResponseModel>(this.testInfoURL + "Update", this.testInfoModel);
  }

  public getAll() {
    return this.httpClient.get<ResponseModel>(this.testInfoURL + "GetAll");
  }

  public delete(id: number) {
    return this.httpClient.delete(`${this.testInfoURL}${id}`);
  }
  public getById(id:number) {
    return this.httpClient.get<ResponseModel>(this.testInfoURL+"GetById?id="+id);
  }
  public getAllTestByCatagoryId(id:number) {
    return this.httpClient.get<ResponseModel>(this.testInfoURL+"GetAllTestByCatagoryId?id="+id);
  }
}
