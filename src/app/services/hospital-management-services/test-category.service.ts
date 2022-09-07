import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { TestCategoryModel } from 'src/app/models/hospital-management-models/testCategoryModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {

  public testCategoryModel:TestCategoryModel=new TestCategoryModel();
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
  private readonly testCategoryURL: string = Constants.API_KEY+"api/TestCategory/";
  public insert() {
    return this.httpClient.post<ResponseModel>(this.testCategoryURL + "Insert", this.testCategoryModel);
  }

  public update() {
    return this.httpClient.put<ResponseModel>(this.testCategoryURL + "Update", this.testCategoryModel);
  }

  public getAll() {
    return this.httpClient.get<ResponseModel>(this.testCategoryURL + "GetAll");
  }

  public delete(id: number) {
    return this.httpClient.delete(`${this.testCategoryURL}${id}`);
  }
}

