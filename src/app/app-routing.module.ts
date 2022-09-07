import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.service';
import { LoggedInAuthGuard } from './guards/loggedInAuth.service';
import { HomeComponent } from './modules/deshboard/home/home.component';
import { PageNotFoundComponent } from './modules/deshboard/page-not-found/page-not-found.component';
import { AppointmentInfoComponent } from './modules/hospital-management/appointment-info/appointment-info.component';
import { CabinAndWardComponent } from './modules/hospital-management/cabin-and-ward/cabin-and-ward.component';
import { DoctorsInfoComponent } from './modules/hospital-management/doctors-info/doctors-info.component';
import { OutdoorConsultancyInfoComponent } from './modules/hospital-management/outdoor-consultancy-info/outdoor-consultancy-info.component';
import { OutdoorPatientTestComponent } from './modules/hospital-management/outdoor-patient-test/outdoor-patient-test.component';
import { PatientAdmissionComponent } from './modules/hospital-management/patient-admission/patient-admission.component';
import { PatientInfoComponent } from './modules/hospital-management/patient-info/patient-info.component';
import { PatientMedicineInfoComponent } from './modules/hospital-management/patient-medicine-info/patient-medicine-info.component';
import { PatientTestingInfoComponent } from './modules/hospital-management/patient-testing-info/patient-testing-info.component';
import { TestInfoComponent } from './modules/hospital-management/test-info/test-info.component';
import { DepartmentComponent } from './modules/hr-management/department/department.component';
import { DesignationDepartmentComponent } from './modules/hr-management/designation-department/designation-department.component';
import { EmployeeDetailsComponent } from './modules/hr-management/employee-details/employee-details.component';
import { EmployeeListComponent } from './modules/hr-management/employee-list/employee-list.component';
import { EmployeeComponent } from './modules/hr-management/employee/employee.component';
import { CategoryComponent } from './modules/invontory-management/category/category.component';
import { OrderComponent } from './modules/invontory-management/order/order.component';
import { ProductComponent } from './modules/invontory-management/product/product.component';
import { SupplierComponent } from './modules/invontory-management/supplier/supplier.component';
import { ManageRoleComponent } from './modules/user-auth/manage-role/manage-role.component';
import { ManageUserAccountComponent } from './modules/user-auth/manage-user-account/manage-user-account.component';
import { SignInComponent } from './modules/user-auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/user-auth/sign-up/sign-up.component';

const routes: Routes = [
  {path: "sign-up", component: SignUpComponent, canActivate:[LoggedInAuthGuard]},
  {path: "sign-in", component: SignInComponent, canActivate:[LoggedInAuthGuard]},
  
  {path: "", component: HomeComponent, canActivate:[AuthGuardService]},
  {path: "manage-role", component: ManageRoleComponent, canActivate:[AuthGuardService]},
  {path: "manage-user", component: ManageUserAccountComponent, canActivate:[AuthGuardService]},
  {path: "doctor-info", component: DoctorsInfoComponent, canActivate:[AuthGuardService]},
  {path: "test-info", component: TestInfoComponent, canActivate:[AuthGuardService]},
  {path: "patient-admission", component: PatientAdmissionComponent, canActivate:[AuthGuardService]},
  {path:"appointment-info",component:AppointmentInfoComponent,canActivate:[AuthGuardService]},
  {path:"outdoorConsultancy-info", component:OutdoorConsultancyInfoComponent,canActivate:[AuthGuardService]},
  {path:"cabin-and-ward", component:CabinAndWardComponent,canActivate:[AuthGuardService]},
  {path:"patient-info", component:PatientInfoComponent,canActivate:[AuthGuardService]},
  {path:"investigation",component:PatientTestingInfoComponent, canActivate:[AuthGuardService]},
  {path:"outdoot-patient-test", component:OutdoorPatientTestComponent, canActivate:[AuthGuardService]},
  {path:"department-designation",component:DesignationDepartmentComponent, canActivate:[AuthGuardService]},
  {path:"employee", component:EmployeeComponent, canActivate:[AuthGuardService]},
  {path:"employeeList", component:EmployeeListComponent,canActivate:[AuthGuardService] },
  {path:"employee-details", component:EmployeeDetailsComponent, canActivate:[AuthGuardService]},
  {path:"supplier", component:SupplierComponent, canActivate:[AuthGuardService]},
  {path:"product", component:ProductComponent, canActivate:[AuthGuardService]},
  {path:"order", component:OrderComponent, canActivate:[AuthGuardService]},
  {path:"category", component:CategoryComponent, canActivate:[AuthGuardService]},
  {path:"patient-medicine", component:PatientMedicineInfoComponent, canActivate:[AuthGuardService]},

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
