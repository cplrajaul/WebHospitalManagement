import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { EmployeeModel } from 'src/app/models/hr-management-models/employeeModel';
import { EmployeeDetailsService } from 'src/app/services/hr-management-service/employee-details.service';
import { EmployeeService } from 'src/app/services/hr-management-service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: [
  ]
})
export class EmployeeListComponent implements OnInit {
  filePath: string = "../../../../assets/dist/img/loding.gif";
  noImage:string = "../../../../assets/dist/img/noImage.png"

  imageSource:string=Constants.API_KEY+"images/employee_images/";
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private employeeInfoService: EmployeeService,private employeeDetailsServices: EmployeeDetailsService ) { }
public employeeList:EmployeeModel[]=[]
  ngOnInit(): void {
this.getAll();
  }
  getAll(){
    this.employeeInfoService.getAll().subscribe((data: any) => {
          this.employeeList = data;
          console.log(data);
        }, error => {
          console.log("error", error)
          this.toastr.error("Something went wrong please try again later");
        })
      }
  public employeeInfoForm = this.formBuilder.group({
    employeeId: [0,],
    age: [0,],
    
    basicSalary: [0,],
    houseRent: [0,],
    medical: [0,],
    // attendenceBonus: [0,],
    // mobileAllow: [0,],
    // providentfund: [0,],
    // grossSalary: [0,],
    active: [0,],
    departmentId: [0, ],
    designationId: [0, ],

    employeeName: ['', ],
    fatherName: ['',],
    motherName: ['', ],
    sex: ['', ],
 
    maritaltatus: ['', ],
    spouseName: ['', ],
    pesentAddress: ['', ],
    permanentAddress: ['', ],
    phone: ['', ],
    bloodGroup: ['', ],
    religion: ['', ],
    joinDate: ['', ],
    // employeeType: ['', ],
    // reference1: ['', ],
    shiftTime: ['', ],
    accountNo: ['', ],
    terminationDate: ['', ],
    // bName: ['', ],
    // resignType: ['', ],
    nid: ['', ],
    dateOfBirth: ['',],
    passport:['',],
    birthID:['',],

    //like this
    imageName: ['',],
    grossSalary:[0,],
    educationViewModels:[],
    experienceViewModels:[]
    
  });
  pupulateForm(selectedRecord: EmployeeModel) 
  {
    
    this.employeeInfoForm.patchValue({

      employeeId:selectedRecord.employeeId,
      age:selectedRecord.age,
      basicSalary:selectedRecord.basicSalary,
      houseRent:selectedRecord.houseRent,
      medical:selectedRecord.medical,
      active:selectedRecord.active,
      departmentId:selectedRecord.departmentId,
      designationId:selectedRecord.designationId,

        employeeName:selectedRecord.employeeName,
        fatherName:selectedRecord.fatherName,
        motherName:selectedRecord.motherName,
        sex:selectedRecord.sex,
       
        maritaltatus:selectedRecord.maritaltatus,
        spouseName:selectedRecord.spouseName,
        pesentAddress:selectedRecord.pesentAddress,
        permanentAddress:selectedRecord.permanentAddress,
        phone:selectedRecord.phone,
        blood:selectedRecord.bloodGroup,
        relegion:selectedRecord.religion,
        joinDate:selectedRecord.joinDate,
     

        shiftTime:selectedRecord.shiftTime,
        accountNo:selectedRecord.accountNo,
        terminationDate:selectedRecord.terminationDate,
    
     
        nid:selectedRecord.nid,
        dob:selectedRecord.dateOfBirth,
        passport:selectedRecord.passport,
        birthID:selectedRecord.birthID,

        imageName:selectedRecord.imageName     
    });
    if(selectedRecord.imageName!=null ){
      this.filePath = this.imageSource + selectedRecord.imageName;
    }
    else{
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
  }
  viewDetails(selectedRecord: EmployeeModel) 
  {
    this.employeeDetailsServices.employeeDetailsModel.employeeId = selectedRecord.employeeId;
    this.employeeDetailsServices.employeeDetailsModel.age=selectedRecord.age;
    this.employeeDetailsServices.employeeDetailsModel.basicSalary=selectedRecord.basicSalary;
    this.employeeDetailsServices.employeeDetailsModel.houseRent=selectedRecord.houseRent;
    this.employeeDetailsServices.employeeDetailsModel.medical=selectedRecord.medical;
    this.employeeDetailsServices.employeeDetailsModel.active=selectedRecord.active;

    this.employeeDetailsServices.employeeDetailsModel.departmentId=selectedRecord.departmentId;
    this.employeeDetailsServices.employeeDetailsModel.designationId=selectedRecord.designationId;
    
    this.employeeDetailsServices.employeeDetailsModel.department=selectedRecord.department;
    this.employeeDetailsServices.employeeDetailsModel.designation=selectedRecord.designation;

    this.employeeDetailsServices.employeeDetailsModel.employeeName=selectedRecord.employeeName;
    this.employeeDetailsServices.employeeDetailsModel.fatherName=selectedRecord.fatherName;
    this.employeeDetailsServices.employeeDetailsModel.motherName=selectedRecord.motherName;
    this.employeeDetailsServices.employeeDetailsModel.sex=selectedRecord.sex;
       
    this.employeeDetailsServices.employeeDetailsModel.maritaltatus=selectedRecord.maritaltatus;
    this.employeeDetailsServices.employeeDetailsModel.spouseName=selectedRecord.spouseName;
    this.employeeDetailsServices.employeeDetailsModel.pesentAddress=selectedRecord.pesentAddress;
    this.employeeDetailsServices.employeeDetailsModel.permanentAddress=selectedRecord.permanentAddress;
    this.employeeDetailsServices.employeeDetailsModel.phone=selectedRecord.phone;
    this.employeeDetailsServices.employeeDetailsModel.bloodGroup=selectedRecord.bloodGroup;
    this.employeeDetailsServices.employeeDetailsModel.religion=selectedRecord.religion;
    this.employeeDetailsServices.employeeDetailsModel.joinDate=selectedRecord.joinDate;     

    this.employeeDetailsServices.employeeDetailsModel.shiftTime=selectedRecord.shiftTime;
    this.employeeDetailsServices.employeeDetailsModel.accountNo=selectedRecord.accountNo;
    this.employeeDetailsServices.employeeDetailsModel.terminationDate=selectedRecord.terminationDate;    
     
    this.employeeDetailsServices.employeeDetailsModel.nid=selectedRecord.nid;
    this.employeeDetailsServices.employeeDetailsModel.dateOfBirth=selectedRecord.dateOfBirth;
    this.employeeDetailsServices.employeeDetailsModel.passport=selectedRecord.passport;
    this.employeeDetailsServices.employeeDetailsModel.birthID=selectedRecord.birthID;

    this.employeeDetailsServices.employeeDetailsModel.imageName=selectedRecord.imageName ;
    if(selectedRecord.employeeId>0){
      this.getEduByEmpId(selectedRecord.employeeId);
      this.getExpByEmpId(selectedRecord.employeeId);
    }
    this.empDetailsNavigator();
  }
  getEduByEmpId(id:number) {
    this.employeeDetailsServices.getEduByEmpId(id).subscribe((data:any) => {
      this.employeeDetailsServices.educationList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
  getExpByEmpId(id:number) {
    this.employeeDetailsServices.getExpByEmpId(id).subscribe((data:any) => {
      this.employeeDetailsServices.exprienceList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }  

  empDetailsNavigator(){
    this.router.navigate(["employee-details"]);
  }
  onSubmit(){

  }
  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.employeeInfoService.delete(id).subscribe(
       res=>{          
         this.toastr.success("Delete Successfully");
         this.getAll();
        
       },
       err=>
       {
        this.toastr.error("Delete Failed")
         console.log(err)
        }
     )
   }
  }

}
