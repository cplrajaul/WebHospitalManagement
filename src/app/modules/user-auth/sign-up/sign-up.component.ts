import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from 'src/app/enums/responseCode';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserService } from 'src/app/services/user-auth-services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  filePath: string = "../../../assets/dist/img/loding.gif";
  fileToUpload: any;
  constructor(
    private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  handleFileInput(e: any) {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files.length) {
      this.fileToUpload = e?.target?.files[0];
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.signUpForm.patchValue({
          fileSource: reader.result
        });

      };
    }
  }
  public signUpForm = this.formBuilder.group({
    userId: [0,],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', Validators.required],
    password: ['', [Validators.minLength(6), Validators.required]],
    reTypePassword: ['', [Validators.minLength(6), Validators.required]],
  })

  get firstName() { return this.signUpForm.get('firstName') };
  get lastName() { return this.signUpForm.get('lastName') };
  get phone() { return this.signUpForm.get('phone') };
  get email() { return this.signUpForm.get('email') };
  get userName() { return this.signUpForm.get('userName') };
  get password() { return this.signUpForm.get('password') };
  get reTypePassword() { return this.signUpForm.get('reTypePassword') };
  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('Photo', this.fileToUpload);
    formData.append('UserId', this.signUpForm.value.userId);
    formData.append('FirstName', this.signUpForm.value.firstName);
    formData.append('LastName', this.signUpForm.value.lastName);
    formData.append('Phone', this.signUpForm.value.phone);
    formData.append('Email', this.signUpForm.value.email);
    formData.append('UserName', this.signUpForm.value.userName);
    formData.append('Password', this.signUpForm.value.password);
    this.userService.register(formData).subscribe((data: ResponseModel) => {
      if (data.responseCode == ResponseCode.OK) {
        this.toastr.success("You have created account please login");
        this.router.navigate(["sign-in"]);
      } else {
        this.toastr.error(data.responseMessage);
      }
      console.log("response", data);
    }, error => {
      console.log("error", error)
      this.toastr.error("Something went wrong please try again later");
    })
  }
}
