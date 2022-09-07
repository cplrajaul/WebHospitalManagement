import { EducationModel } from "./educationModel";
import { ExperienceModel } from "./experienceModel";

export class EmployeeModel{
    
    public  employeeId:number=0;
    public  employeeName:string="";
    public  fatherName:string="";
    public  motherName:string="";
    public  departmentId:number=0; 
    public  designationId:number=0;
    public  department:string="";
    public  designation:string="";
    public  age:number=0;
    public  dateOfBirth:string="";    
    public  sex:string="";
    public  maritaltatus:string=""; 
    public  spouseName:string=""; 
    public  pesentAddress:string=""; 
    public  permanentAddress:string="";
    public  phone:string=""; 
    public  bloodGroup:string=""; 
    public  religion:string=""; 
    public  joinDate:string=""; 
    public  shiftTime:string="";  
    public  terminationDate:string="";   
    public  basicSalary:number=0;
    public  houseRent:number=0;
    public  medical:number=0;
    public  active:number=0;     
    public  accountNo:string="";      
    public  nid:string=""; 
    public  passport:string=""; 
    public  birthID:string=""; 
    public  grossSalary:number=0;
    public  imageName:string="";
    public  indexNumber:number=0;
    educationViewModels: EducationModel[]=[];
    experienceViewModels: ExperienceModel[]=[];
    
}