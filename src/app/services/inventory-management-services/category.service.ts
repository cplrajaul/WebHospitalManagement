import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Helper/constants';
import { CategoryModel } from 'src/app/models/inventory-models/category';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category:CategoryModel=new CategoryModel();
  constructor(private httpClient:HttpClient) { }
  private readonly categoryInfo:string=Constants.API_KEY+"api/Category/";
  public insert(){
    return this.httpClient.post<ResponseModel>(this.categoryInfo+"Insert",this.category);
  }
  public update(){
    return this.httpClient.put<ResponseModel>(this.categoryInfo+"Update",this.category);
  }
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.categoryInfo+"GetAll");
  }
  public delete(id:number)
  {
    return this.httpClient.delete(`${this.categoryInfo}${id}`)
  }
}
