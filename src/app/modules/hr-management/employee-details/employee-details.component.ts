import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { DepartmentInfoModel } from 'src/app/models/hr-management-models/depatmentModel';
import { DesignationInfoModel } from 'src/app/models/hr-management-models/designation-model';
import { EducationModel } from 'src/app/models/hr-management-models/educationModel';
import { EmployeeModel } from 'src/app/models/hr-management-models/employeeModel';
import { ExperienceModel } from 'src/app/models/hr-management-models/experienceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DepartmentService } from 'src/app/services/hr-management-service/department.service';
import { DesignationService } from 'src/app/services/hr-management-service/designation.service';
import { EmployeeDetailsService } from 'src/app/services/hr-management-service/employee-details.service';

@Component({
  
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styles: [
    `
    .FontStyleE {
      font-size: medium;
      font: bold;
  }

  .TitleStyleE {
  font-size: larger;
  font: bold;
  padding-right: 10px;}

  .buttonAlgRight{
    float:right;
  }
  .namePading{
    padding-left:25%;
  }
  
  `
  ]
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,
    public employeeDetailsServices:EmployeeDetailsService, private departmentSerive:DepartmentService, 
    private designationService:DesignationService
  ) {}
  
  filePath: string = "../../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/employee_images/";  
  noImage:string = "../../../../assets/dist/img/avatar5.png";
  public formSubmitAttempt: boolean= false;

  @ViewChild('closebuttonEmp') closebuttonEmp: any;
  @ViewChild('closebuttonEdu') closebuttonEdu: any;
  @ViewChild('closebuttonExp') closebuttonExp: any;

  ngOnInit(): void {    
    this.FillDesignation();
    this.FillDept();
    }

  public experienceList:ExperienceModel[]=[];
  public educationList:EducationModel[]=[];
  public employeeList:EmployeeModel[]=[];
  public desiList: DesignationInfoModel[] = [];  
  public deptList: DepartmentInfoModel[] = [];  
  
  handleFileInput(e: any) {

    const reader = new FileReader();

    if (e?.target?.files && e?.target?.files.length) {
     
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);

      reader.onload = () => {
        this.filePath = reader.result as string;
        this.employeeInfoForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }

  public employeeInfoForm = this.formBuilder.group({
    employeeId: [0,],
    age: [0,Validators.required],
    
    basicSalary: [0,],
    houseRent: [0,],
    medical: [0,],
  
    active: [0,],
    departmentId: [0, Validators.required],
    designationId: [0, Validators.required],

    employeeName: ['', Validators.required],
    fatherName: ['', Validators.required],
    motherName: ['', Validators.required],
    sex: ['', Validators.required],
 
    maritaltatus: ['', ],
    spouseName: ['', ],
    pesentAddress: ['', ],
    permanentAddress: ['', ],
    phone: ['', Validators.required],
    bloodGroup: ['', ],
    religion: ['', ],
    joinDate: ['', ],   
    shiftTime: ['', ],
    accountNo: ['', ],
    terminationDate: ['', ],
    nid: ['', ],
    dateOfBirth: ['',Validators.required ],
    passport:['',],
    birthID:['',],

    //like this
    imageName: ['',],
    grossSalary:[0,],
    educationViewModels:[],
    experienceViewModels:[]
    
  });


  public educationForm = this.formBuilder.group({ 
    educationID: [0],
    degree:['', Validators.required],
    institution:['',Validators.required],
    pasingYear:['',Validators.required],
    result:['',Validators.required],
    employeeId: [''],
    indexNumber:[0]
  })

  public experienceForm = this.formBuilder.group({
  experienceID: [0],
    yearsOfExperience:['', Validators.required],
    companyName:['',Validators.required],
    startDate:['',Validators.required],
    finishDate:['',Validators.required],
    responsibilities:['',Validators.required],
    designation:['',Validators.required],
    employeeId: [0],
    indexNumber:[0]

})


FillDesignation() {
  this.designationService.getAll().subscribe((data: any) => {
      this.desiList = data;
      console.log(data);
  }, error => {
      console.log("error", error)
      this.toastr.error(".....Something went wrong please try again later");
  })}

  FillDept() {
    this.departmentSerive.getAll().subscribe((data: any) => {
        this.deptList = data;
        console.log(data);
    }, error => {
        console.log("error", error)
        this.toastr.error(".....Something went wrong please try again later");
    })}


    pupulateForm(selectedRecord: EmployeeModel) 
    {
       
    this.employeeInfoForm.patchValue({

      employeeId:selectedRecord.employeeId,
      age:selectedRecord.age,
      basicSalary:selectedRecord.basicSalary,
      houseRent:selectedRecord.houseRent,
      medical:selectedRecord.medical,
      grossSalary:selectedRecord.basicSalary+selectedRecord.houseRent+selectedRecord.medical,
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
        bloodGroup:selectedRecord.bloodGroup,
        religion:selectedRecord.religion,
        joinDate:selectedRecord.joinDate,     

        shiftTime:selectedRecord.shiftTime,
        accountNo:selectedRecord.accountNo,
        terminationDate:selectedRecord.terminationDate,    
     
        nid:selectedRecord.nid,
        dateOfBirth:selectedRecord.dateOfBirth,
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

  get fatherName() { return this.employeeInfoForm.get("fatherName") };
  get motherName() { return this.employeeInfoForm.get("motherName") };
  get sex() { return this.employeeInfoForm.get("sex") };
  get dateOfBirth() { return this.employeeInfoForm.get("dateOfBirth") };
  get age() { return this.employeeInfoForm.get("age") };
  get phone() { return this.employeeInfoForm.get("phone") };
  get departmentId() { return this.employeeInfoForm.get("departmentId") };
  get designationId() { return this.employeeInfoForm.get("designationId") };
  get employeeName() { return this.employeeInfoForm.get("employeeName") };



  pupulateEducationForm(selectedRecord: EducationModel, index:number) 
  {
  this.educationForm.patchValue({
    indexNumber: index,
    educationID: selectedRecord.educationID,
    degree:selectedRecord.degree,
    institution:selectedRecord.institution,
    pasingYear:selectedRecord.pasingYear,
    result:selectedRecord.result,
    employeeId: selectedRecord.employeeId
})
}
get educationID(){return this.educationForm.get('educationID')};
get degree(){return this.educationForm.get('degree')};
get institution(){return this.educationForm.get('institution')};
get pasingYear(){return this.educationForm.get('pasingYear')};
get result(){return this.educationForm.get('result')};


pupulateExperienceForm(selectedRecord:ExperienceModel, index:number)
{
  this.experienceForm.patchValue({
    indexNumber: index,
    experienceID: selectedRecord.experienceID,
    yearsOfExperience:selectedRecord.yearsOfExperience,
    companyName:selectedRecord.companyName,
    startDate:selectedRecord.startDate,
    finishDate:selectedRecord.finishDate,
    responsibilities: selectedRecord.responsibilities,
    designation:selectedRecord.designation,
    employeeId: selectedRecord.employeeId
})
}
get yearsOfExperience(){return this.experienceForm.get("yearsOfExperience")};
get companyName() {return this.experienceForm.get("companyName")};
get startDate(){return this.experienceForm.get("startDate")};
get finishDate(){return this.experienceForm.get("finishDate")};
get responsibilities(){return this.experienceForm.get("responsibilities")};
get designation(){return this.experienceForm.get("designation")};

//Update Education
updateEdu() {
  this.employeeDetailsServices.updateEdu().subscribe((data: ResponseModel) => {
    if (data.responseCode == ResponseCode.OK) {
      this.toastr.success("Education Info Updated successfully");
      this.getEduByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);
    this.clearEduForm();
    this.closebuttonEdu.nativeElement.click();
    }
    else {
      this.toastr.error("Invalid Entry", data.responseMessage);
    }
    console.log("response", data)
  }, error => {
    console.log("error", error);
    this.toastr.error("Something is wrong. Please Try Again");
  })
}

insertEdu() {
  this.employeeDetailsServices.insertEdu().subscribe((data: ResponseModel) => {
    if (data.responseCode == ResponseCode.OK) {
      this.toastr.success("Save successfully");
      this.getEduByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);
      this.clearEduForm();
      this.closebuttonEdu.nativeElement.click();
    }
    else {
      this.toastr.error("Invalid Entry", data.responseMessage);
    }
    console.log("response", data)
  }, error => {
    console.log("error", error);
    this.toastr.error("Try Again");
  })
}

onSubmitEducation() {
  if(this.educationForm.valid){
    this.employeeDetailsServices.educationModel.educationID = this.educationForm.value.educationID || 0;
    this.employeeDetailsServices.educationModel.employeeId = this.educationForm.value.employeeId || 0;
    this.employeeDetailsServices.educationModel.degree = this.educationForm.value.degree;
    this.employeeDetailsServices.educationModel.result = this.educationForm.value.result;
    this.employeeDetailsServices.educationModel.pasingYear = this.educationForm.value.pasingYear;
    this.employeeDetailsServices.educationModel.institution = this.educationForm.value.institution;
  
    if (this.educationForm.value.educationID == 0 || this.educationForm.value.educationID == null) {
      this.insertEdu();     
    }
    else {
      this.updateEdu();      
    }
  }
  else{
    this.formSubmitAttempt=true;
  }
  
}

// Exdperience
updateExp() {
  this.employeeDetailsServices.updateExp().subscribe((data: ResponseModel) => {
    if (data.responseCode == ResponseCode.OK) {
      this.toastr.success("Experience Info Updated successfully");
      this.getExpByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);
      this.clearExpForm();
      this.closebuttonExp.nativeElement.click();
    }
    else {
      this.toastr.error("Invalid Entry", data.responseMessage);
    }
    console.log("response", data)
  }, error => {
    console.log("error", error);
    this.toastr.error("Something is wrong. Please Try Again");
  })
}

insertExp() {
  this.employeeDetailsServices.insertExp().subscribe((data: ResponseModel) => {
    if (data.responseCode == ResponseCode.OK) {
      this.toastr.success("Experience Save successfully"); 
      this.getExpByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);      
      this.closebuttonExp.nativeElement.click();    
      this.clearExpForm();
    }
    else {
      this.toastr.error("Invalid Entry", data.responseMessage);
    }
    console.log("response", data)
  }, error => {
    console.log("error", error);
    this.toastr.error("Try Again");
  })
}

onSubmitExperience() {
  if(this.experienceForm.valid){
    this.employeeDetailsServices.experienceModel.experienceID = this.experienceForm.value.experienceID || 0;
    this.employeeDetailsServices.experienceModel.employeeId = this.experienceForm.value.employeeId || 0;
    this.employeeDetailsServices.experienceModel.yearsOfExperience = this.experienceForm.value.yearsOfExperience;
    this.employeeDetailsServices.experienceModel.companyName = this.experienceForm.value.companyName;
    this.employeeDetailsServices.experienceModel.startDate = this.experienceForm.value.startDate;
    this.employeeDetailsServices.experienceModel.finishDate = this.experienceForm.value.finishDate;
    this.employeeDetailsServices.experienceModel.responsibilities = this.experienceForm.value.responsibilities;
    this.employeeDetailsServices.experienceModel.designation = this.experienceForm.value.designation;
  
    if (this.experienceForm.value.experienceID == 0 || this.experienceForm.value.experienceID == null) {
      this.insertExp();     
    }
    else {
      this.updateExp();     
    } 
  }
  else{
    this.formSubmitAttempt=true;
  }
 
}

//Update Employee

updateEmployee() {
  const formData: FormData = new FormData();   
  
  formData.append("EmployeeId", this.employeeInfoForm.value.employeeId);
  formData.append("Age", this.employeeInfoForm.value.age);

  formData.append("BasicSalary", this.employeeInfoForm.value.basicSalary);
  formData.append("HouseRent", this.employeeInfoForm.value.houseRent);
  formData.append("Medical", this.employeeInfoForm.value.medical);
 
  formData.append("Active", this.employeeInfoForm.value.active);

  formData.append("DepartmentId", this.employeeInfoForm.value.departmentId);
  formData.append("DesignationId", this.employeeInfoForm.value.designationId);

  formData.append("EmployeeName", this.employeeInfoForm.value.employeeName);
  formData.append("FatherName", this.employeeInfoForm.value.fatherName);
  formData.append("MotherName", this.employeeInfoForm.value.motherName);
  formData.append("Sex", this.employeeInfoForm.value.sex);
  formData.append("DateOfBirth", this.employeeInfoForm.value.dateOfBirth);
  formData.append("Maritaltatus", this.employeeInfoForm.value.maritaltatus);
  formData.append("SpouseName", this.employeeInfoForm.value.spouseName);
  formData.append("PesentAddress", this.employeeInfoForm.value.pesentAddress);
  formData.append("PermanentAddress", this.employeeInfoForm.value.permanentAddress);
  formData.append("Phone", this.employeeInfoForm.value.phone);
  formData.append("BloodGroup", this.employeeInfoForm.value.bloodGroup);
  formData.append("Religion", this.employeeInfoForm.value.religion);
  formData.append("JoinDate", this.employeeInfoForm.value.joinDate);

  formData.append("ShiftTime", this.employeeInfoForm.value.shiftTime);
  formData.append("AccountNo", this.employeeInfoForm.value.accountNo);
  formData.append("TerminationDate", this.employeeInfoForm.value.terminationDate);

  formData.append("NID", this.employeeInfoForm.value.nid);
  formData.append("Passport", this.employeeInfoForm.value.passport);
  formData.append("BirthID", this.employeeInfoForm.value.birthID);

  //need like this
  formData.append("Photo", this.fileToUpload);
  formData.append("ImageName", this.employeeInfoForm.value.imageName);

  
  this.employeeDetailsServices.updateEmployee(formData).subscribe((data: ResponseModel) => {
    if (data.responseCode == ResponseCode.OK) {
      this.toastr.success("Employee Update Successfully");

      this.GetById(this.employeeDetailsServices.employeeDetailsModel.employeeId);

      this.clearEmpForm();
      this.closebuttonEmp.nativeElement.click();
      this.filePath= "../../../../assets/dist/img/loding.gif";
    }
    else {
      this.toastr.error(data.responseMessage);
    }
    console.log("response", data)
  }, error => {
    console.log("error", error);
    this.toastr.error("Try Again");
  }
  )
}

onSubmitEmployee() {

  if (this.employeeInfoForm.value.employeeId > 0) {
    this.updateEmployee();
   
  }
};

//Clear Froms
clearEduForm(){
  this.educationForm.reset();
  this.formSubmitAttempt=false;  
}
clearExpForm(){
  this.experienceForm.reset();
  this.formSubmitAttempt=false;
}
  clearEmpForm() {
    this.employeeInfoForm.reset();
    this.formSubmitAttempt=false;
  }

  getEmpIdForEducation(selectedRecord: EmployeeModel) 
  {
    this.educationForm.patchValue({
      employeeId: selectedRecord.employeeId
  })
  }
  
  getEmpIdForExp(selectedRecord: EmployeeModel) 
  {
    this.experienceForm.patchValue({
      employeeId: selectedRecord.employeeId
  })
  }

  onDeleteEdu(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.employeeDetailsServices.deleteEdu(id).subscribe(
       res=>{          
         this.toastr.success("Delete successful");
         this.getEduByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);
        
       },
       err=>
       {
        this.toastr.error("Delete Failed")
         console.log(err)
        }
     )
   }
  }

  onDeleteExp(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.employeeDetailsServices.deleteExp(id).subscribe(
       res=>{          
         this.toastr.success("Delete successful");
         this.getExpByEmpId(this.employeeDetailsServices.employeeDetailsModel.employeeId);
        
       },
       err=>
       {
        this.toastr.error("Delete Failed")
         console.log(err)
        }
     )
   }
  }

  GetById(id:number) {
    this.employeeDetailsServices.GetById(id).subscribe((data:any) => {
      this.employeeDetailsServices.employeeDetailsModel = data;
      alert(this.employeeDetailsServices.employeeDetailsModel.designationId);

      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
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

  claculateBasic(){
    this.employeeInfoForm.get('basicSalary')?.setValue(this.employeeInfoForm.value.grossSalary - 
      ((this.employeeInfoForm.value.houseRent*10)+(this.employeeInfoForm.value.houseRent*10)));
  
    this.employeeInfoForm.get('houseRent')?.setValue((this.employeeInfoForm.value.grossSalary * (.10)));
    this.employeeInfoForm.get('medical')?.setValue((this.employeeInfoForm.value.grossSalary * (.10)));
  }

}