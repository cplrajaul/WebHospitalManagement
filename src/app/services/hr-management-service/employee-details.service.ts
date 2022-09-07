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
export class EmployeeDetailsService {

  constructor(private httpClient:HttpClient,) { }

  public employeeDetailsModel:EmployeeModel=new EmployeeModel();
  public employeeList:EmployeeModel []=[];

  public educationList:EducationModel[]=[];
  public educationModel: EducationModel=new EducationModel()

  public exprienceList:ExperienceModel[]=[];
  public experienceModel: ExperienceModel=new ExperienceModel();

  private readonly employeeExprienceApi:string=Constants.API_KEY+"api/Exprience/";
  private readonly employeeEducationApi:string=Constants.API_KEY+"api/Education/";
  private readonly employeeApi:string=Constants.API_KEY+"api/Employee/";

  //To get Employee
  public GetById(id:number)
{
  return this.httpClient.get<ResponseModel>(this.employeeApi+"GetById/"+id);
}
  
//for Education
public getEduByEmpId(id:number)
{
  return this.httpClient.get<ResponseModel>(this.employeeEducationApi+"GetEduByEmpId/"+id);
}

  public  updateEdu (){    
    return this.httpClient.put<ResponseModel>(this.employeeEducationApi+"Update/",this.educationModel);
  }

  public deleteEdu(id:number){
    return this.httpClient.delete(`${this.employeeEducationApi}${id}`)
  }

  public insertEdu()
  {
    return this.httpClient.post<ResponseModel>(this.employeeEducationApi+"Insert", this.educationModel)
  }

//for Experience
  public getExpByEmpId(id:number)
  {
    return this.httpClient.get<ResponseModel>(this.employeeExprienceApi+"GetExpByEmpId/"+id);
  }

  public  updateExp (){    
    return this.httpClient.put<ResponseModel>(this.employeeExprienceApi+"Update/",this.experienceModel);
  }

  public deleteExp(id:number){
    return this.httpClient.delete(`${this.employeeExprienceApi}${id}`)
  }
  public insertExp()
  {
    return this.httpClient.post<ResponseModel>(this.employeeExprienceApi+"Insert", this.experienceModel)
  }
  
  //for employee
  public updateEmployee(params:any){ 
    return this.httpClient.put<ResponseModel>(this.employeeApi+"Update/",params);
  }
}
