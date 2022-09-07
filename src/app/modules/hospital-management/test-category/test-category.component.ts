import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { TestCategoryModel } from 'src/app/models/hospital-management-models/testCategoryModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { TestCategoryService } from 'src/app/services/hospital-management-services/test-category.service';

@Component({
  selector: 'app-test-type',
  templateUrl: './test-category.component.html',
  styles: [
  ]
})
export class TestCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private testCategoryService: TestCategoryService) { }

  
  public itemList:TestCategoryModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }

 

  getAll() {
    this.testCategoryService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }



  public testCategoryForm = this.formBuilder.group({
    categoryId: [0],
    categoryName: ['', Validators.required],
    
  })
 
  get categoryName() { return this.testCategoryForm.get("categoryName") };
 


  pupulateForm(selectedRecord: TestCategoryModel) {
    this.testCategoryForm.patchValue({
      categoryId: selectedRecord.categoryId,
      categoryName: selectedRecord.categoryName,
      
    });
  }
  onSubmit() {
    if(this.testCategoryForm.valid){
      this.testCategoryService.testCategoryModel.categoryId = this.testCategoryForm.value.categoryId || 0;
      this.testCategoryService.testCategoryModel.categoryName = this.testCategoryForm.value.categoryName;
      if (this.testCategoryForm.value.categoryId == 0 || this.testCategoryForm.value.categoryId==null) {
        this.insert();
      }
      else {
        this.update();
      }
    }else{
      this.formSubmitAttempt=true
    }
    
  }
  
  insert() {
    this.testCategoryService.insert().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
       
        this.getAll();
        this.clearForm();
        
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data);
    }, error => {
      console.log("error", error);
      this.toastr.error("Something went wrong please try again later");
    }
    )

  }

  update() {
    this.testCategoryService.update().subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success(data.responseMessage);
      
        this.getAll();
        this.clearForm();
        
        this.closebutton.nativeElement.click();
      } else {
        this.toastr.error(data.responseMessage)
      }
      console.log("response", data);
    }, error => {
      console.log("error", error);
      this.toastr.error("Something went worng please try again later");
    }
    )
  }
  onDelete(id:number){
    if(confirm("Are u sure to delete this recored ?")){
       this.testCategoryService.delete(id).subscribe(
        res=>{
          // this.service.refreshList();
          this.getAll();   
          this.clearForm();
          this.toastr.success("Information Delete successfully")
        },
        err=>{
          this.toastr.error("Delete Failed");
          console.log(err)
        }
      )
    }
  }

  clearForm() {
    this.testCategoryForm.reset();
    this.formSubmitAttempt=false;
   
    this.testCategoryForm.get('categoryId')?.setValue('');
    this.testCategoryForm.get('categoryName')?.setValue('');
  }
}
