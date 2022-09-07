import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { EmployeeService } from 'src/app/services/hr-management-service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  filePath: string = "../../../../assets/dist/img/loding.gif";
  noImage:string = "../../../../assets/dist/img/noImage.png"
  fileToUpload: any;
  imageSource:string=Constants.API_KEY+"images/employee_images/";
  public formSubmitAttempt: boolean= false;
  public endDateHide:boolean=true;
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttonExp') closebuttonExp:any;
  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private employeeInfoService: EmployeeService, private departmentSerive:DepartmentService, 
    private designationService:DesignationService, private router: Router ) { }

  ngOnInit(): void {
     this.getAll(); 
     this.FillDesignation();
     this.FillDept();
    }
    public desiList: DesignationInfoModel[] = [];  
    public deptList: DepartmentInfoModel[] = [];  

hide(){
debugger
  if(this.endDateHide==true){
    this.endDateHide=false;
  }
  else{
    this.endDateHide=true;
  }
 
  
}
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


  public employeeList:EmployeeModel[]=[];


  public employeeInfoForm = this.formBuilder.group({
    employeeId: [0,],
    age: [0,Validators.required],
    
    basicSalary: [0,],
    houseRent: [0,],
    medical: [0,],
    // attendenceBonus: [0,],
    // mobileAllow: [0,],
    // providentfund: [0,],
    // grossSalary: [0,],
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
    // employeeType: ['', ],
    // reference1: ['', ],
    shiftTime: ['', ],
    accountNo: ['', ],
    terminationDate: ['', ],
    // bName: ['', ],
    // resignType: ['', ],
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
  
  get fatherName() { return this.employeeInfoForm.get("fatherName") };
  get motherName() { return this.employeeInfoForm.get("motherName") };
  get sex() { return this.employeeInfoForm.get("sex") };
  get dateOfBirth() { return this.employeeInfoForm.get("dateOfBirth") };
  get age() { return this.employeeInfoForm.get("age") };
  get phone() { return this.employeeInfoForm.get("phone") };
  

  get departmentId() { return this.employeeInfoForm.get("departmentId") };
  get designationId() { return this.employeeInfoForm.get("designationId") };

  get employeeName() { return this.employeeInfoForm.get("employeeName") };
 
  



getAll(){
this.employeeInfoService.getAll().subscribe((data: any) => {
      this.employeeList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }

  onSubmit() {
    debugger
    
    if (this.employeeInfoForm.value.employeeId == 0||this.employeeInfoForm.value.employeeId ==null) {
      this.insert();
    }
    else {
      this.update();
    }
  };

  insert() {
    debugger
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
    for (const index in this.educationList) 
    {
        // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
        //formData.append(`EducationViewModels[${index}].educationID`,this.educationList[index].educationID.toString());
        formData.append(`EducationViewModels[${index}].degree`,this.educationList[index].degree);
        formData.append(`EducationViewModels[${index}].institution`,this.educationList[index].institution);
        formData.append(`EducationViewModels[${index}].pasingYear`,this.educationList[index].pasingYear);
        formData.append(`EducationViewModels[${index}].result`,this.educationList[index].result);
       // formData.append(`ExperienceViewModels[${index}].employeeId`, this.experienceList[index].employeeId.toString())
    }
    for (const index in this.experienceList)
    {
      formData.append(`ExperienceViewModels[${index}].yearsOfExperience`, this.experienceList[index].yearsOfExperience);
      formData.append(`ExperienceViewModels[${index}].companyName`, this.experienceList[index].companyName);
      formData.append(`ExperienceViewModels[${index}].startDate`, this.experienceList[index].startDate);
      formData.append(`ExperienceViewModels[${index}].finishDate`, this.experienceList[index].finishDate);
      formData.append(`ExperienceViewModels[${index}].responsibilities`, this.experienceList[index].responsibilities);
      formData.append(`ExperienceViewModels[${index}].designation`, this.experienceList[index].designation);
      //formData.append(`ExperienceViewModels[${index}].employeeId`, this.experienceList[index].employeeId.toString())
    }
    
    this.employeeInfoService.insert(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("Save Successfully");
        this.filePath= "../../../../assets/dist/img/loding.gif";
        this.getAll();
        this.clearForm();
        this.educationList=[];
        this.experienceList=[];
        this.router.navigate(["employeeList"]);
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


  update() {
  
    const formData: FormData = new FormData();   
    debugger;
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
    formData.append("DOB", this.employeeInfoForm.value.dob);
    formData.append("Maritaltatus", this.employeeInfoForm.value.maritaltatus);
    formData.append("SpouseName", this.employeeInfoForm.value.spouseName);
    formData.append("PesentAddress", this.employeeInfoForm.value.pesentAddress);
    formData.append("PermanentAddress", this.employeeInfoForm.value.permanentAddress);
    formData.append("Phone", this.employeeInfoForm.value.phone);
    formData.append("Blood", this.employeeInfoForm.value.blood);
    formData.append("Relegion", this.employeeInfoForm.value.relegion);
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

    for (const index in this.educationList) 
    {
        // instead of passing this.arrayValues.toString() iterate for each item and append it to form.
        // formData.append(`EducationViewModels[${index}]`,this.educationList[index].educationID.toString());
        formData.append(`EducationViewModels[${index}].degree`,this.educationList[index].degree);
        formData.append(`EducationViewModels[${index}].institution`,this.educationList[index].institution);
        formData.append(`EducationViewModels[${index}].pasingYear`,this.educationList[index].pasingYear);
        formData.append(`EducationViewModels[${index}].result`,this.educationList[index].result);
    }
    for (const index in this.experienceList){
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].yearsOfExperience);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].companyName);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].startDate);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].finishDate);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].responsibilities);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].designation);
      formData.append(`ExperienceViewModels[${index}]`, this.experienceList[index].employeeId.toString())
    }
    // this.employeeInfoService.update(formData).subscribe((data: ResponseModel) => {
     
    //   if (data.responseCode == ResponseCode.OK) {
    //     this.toastr.success("Update Successfully");
    //     this.filePath = "../../../assets/Images/ProPic.jpg";
    //     this.getAll();
    //     this.clearForm();
    //   }
    //   else {
    //     this.toastr.error(data.responseMessage);
    //   }
    //   console.log("response", data)
    // }, error => {
    //   console.log("error", error);
    //   this.toastr.error("Try Again");
    // }
    // )
  } 

  
  public educationList:EducationModel[]=[];

  public educationForm = this.formBuilder.group({ 
    educationID: [0],
    degree:['', Validators.required],
    institution:['',Validators.required],
    pasingYear:['',Validators.required],
    result:['',Validators.required],
    employeeId: [''],
    indexNumber:[0]
  })

get degree(){return this.educationForm.get('degree')};
get institution(){return this.educationForm.get('institution')};
get pasingYear(){return this.educationForm.get('pasingYear')};
get result(){return this.educationForm.get('result')};

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


onEduListSubmit(){

let index=this.educationForm.value.indexNumber || 0;
if(index==0){
  this.educationList.push(this.educationForm.value)
  this.closebutton.nativeElement.click();
}else{
  this.educationList[index-1]=this.educationForm.value
  this.closebutton.nativeElement.click();
}
this.clearEduForm();
}

deleteFormEduList(index:number){
  delete this.educationList[index];
  const valueToKeep = this.educationList;
  this.educationList=[];
  valueToKeep.forEach(element => {
  this.educationList.push(element);
  });
}

public experienceList:ExperienceModel[]=[];
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
get yearsOfExperience(){return this.experienceForm.get("yearsOfExperience")};
get companyName() {return this.experienceForm.get("companyName")};
get startDate(){return this.experienceForm.get("startDate")};
get finishDate(){return this.experienceForm.get("finishDate")};
get responsibilities(){return this.experienceForm.get("responsibilities")};
get designation(){return this.experienceForm.get("designation")}
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

onExperListSubmit(){
  let index=this.experienceForm.value.indexNumber || 0;
  if(index==0){
    this.experienceList.push(this.experienceForm.value)
    this.closebuttonExp.nativeElement.click();
  }else{
    this.experienceList[index-1]=this.experienceForm.value
    this.closebutton.nativeElement.click();
  }
  this.clearExpForm();
  
}

deleteFormExpList(index:number){
  delete this.experienceList[index];
  const valueToKeep = this.experienceList;
  this.experienceList=[];
  valueToKeep.forEach(element => {
  this.experienceList.push(element);
  });
}
fillGrossSalary(){
  this.employeeInfoForm.get('basicSalary')?.setValue(this.employeeInfoForm.value.grossSalary - 
    ((this.employeeInfoForm.value.houseRent*10)+(this.employeeInfoForm.value.houseRent*10)));

  this.employeeInfoForm.get('houseRent')?.setValue((this.employeeInfoForm.value.grossSalary * (.10)));
  this.employeeInfoForm.get('medical')?.setValue((this.employeeInfoForm.value.grossSalary * (.10)));
  // this.employeeInfoForm.get('providentfund')?.setValue((this.employeeInfoForm.value.grossSalary * (.10)));

}

  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
      this.employeeInfoService.delete(id).subscribe(
       res=>{          
         this.toastr.success("Delete succfully");
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
clearEduForm(){
  this.educationForm.reset();
}
clearExpForm(){
  this.experienceForm.reset();
}
  clearForm() {
    this.employeeInfoForm.reset();
    

  }
  



}
