import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Helper/constants';
import { EducationModel } from 'src/app/models/hr-management-models/educationModel';
import { EmployeeModel } from 'src/app/models/hr-management-models/employeeModel';
import { ExperienceModel } from 'src/app/models/hr-management-models/experienceModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeFormData: EmployeeModel=new EmployeeModel();

  experienceViewModels: ExperienceModel[]=[];

  educationViewModels: EducationModel[]=[];
  constructor(private httpClient:HttpClient) { }
  private readonly employee:string=Constants.API_KEY+"api/Employee/";

  public insert(params:any){
 
    return this.httpClient.post<ResponseModel>(this.employee+"Insert",params);

  }
 
  public getAll()
  {
   return this.httpClient.get<ResponseModel>(this.employee+"GetAll");
  }

  public delete(id:number){
    return this.httpClient.delete(`${this.employee}${id}`)
  }
}
