import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { DeshboardModule } from './modules/deshboard/deshboard.module';
import { HospitalManagementModule } from './modules/hospital-management/hospital-management.module';
import { HrManagementModule } from './modules/hr-management/hr-management.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InvontoryManagementModule } from './modules/invontory-management/invontory-management.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserAuthModule,
    DeshboardModule,
    HospitalManagementModule,
    HrManagementModule,
    InvontoryManagementModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
