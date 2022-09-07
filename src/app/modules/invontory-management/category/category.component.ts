import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { CategoryModel } from 'src/app/models/inventory-models/category';
import { ResponseModel } from 'src/app/models/responseModel';
import { CategoryService } from 'src/app/services/inventory-management-services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ]
})
export class CategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private categoryService: CategoryService) { }

  
  public itemList:CategoryModel[]=[];
  public formSubmitAttempt: boolean= false;
  @ViewChild('closebutton') closebutton: any;

  ngOnInit(): void {
    this.clearForm();
    this.getAll();
  }

 

  getAll() {
    this.categoryService.getAll().subscribe((data:any) => {
      this.itemList = data;
      console.log(data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }


  public categoryForm = this.formBuilder.group({
    categoryId:[0,],
    categoryName:['', Validators.required]
  })
 
  get categoryName() { return this.categoryForm.get("categoryName") };
 


  pupulateForm(selectedRecord: CategoryModel) {
    this.categoryForm.patchValue({
      categoryId: selectedRecord.categoryId,
      categoryName: selectedRecord.categoryName,
      
    });
  }
  onSubmit() {
    debugger
    if(this.categoryForm.valid){
      this.categoryService.category.categoryId=this.categoryForm.value.categoryId || 0;
      this.categoryService.category.categoryName=this.categoryForm.value.categoryName;
      if (this.categoryForm.value.categoryId == 0 || this.categoryForm.value.categoryId==null) {
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
    this.categoryService.insert().subscribe((data: ResponseModel) => {
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
    this.categoryService.update().subscribe((data: ResponseModel) => {
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
       this.categoryService.delete(id).subscribe(
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
    this.categoryForm.reset();
    this.formSubmitAttempt=false;
    this.categoryForm.get('categoryId')?.setValue('');
    this.categoryForm.get('categoryName')?.setValue('');
  }


}
