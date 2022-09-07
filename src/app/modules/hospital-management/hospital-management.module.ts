import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DoctorsInfoComponent } from './doctors-info/doctors-info.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { PatientAdmissionComponent } from './patient-admission/patient-admission.component';
import { AppointmentInfoComponent } from './appointment-info/appointment-info.component';
import { OutdoorConsultancyInfoComponent } from './outdoor-consultancy-info/outdoor-consultancy-info.component';
import { CabinInfoComponent } from './cabin-info/cabin-info.component';
import { WardInfoComponent } from './ward-info/ward-info.component';
import { CabinTypeInfoComponent } from './cabin-type-info/cabin-type-info.component';
import { CabinAndWardComponent } from './cabin-and-ward/cabin-and-ward.component';
import { BedInfoComponent } from './bed-info/bed-info.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientTestingInfoComponent } from './patient-testing-info/patient-testing-info.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TestCategoryComponent } from './test-category/test-category.component';
import { OutdoorPatientTestComponent } from './outdoor-patient-test/outdoor-patient-test.component';
import { PatientMedicineInfoComponent } from './patient-medicine-info/patient-medicine-info.component';


@NgModule({
  declarations: [
    DoctorsInfoComponent,
    TestInfoComponent,
    PatientAdmissionComponent,
    AppointmentInfoComponent,
    OutdoorConsultancyInfoComponent,
    CabinInfoComponent,
    WardInfoComponent,
    CabinTypeInfoComponent,
    CabinAndWardComponent,
    BedInfoComponent,
    PatientInfoComponent,
    TestCategoryComponent,
    PatientTestingInfoComponent,
    OutdoorPatientTestComponent,
    PatientMedicineInfoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    DoctorsInfoComponent,
    TestInfoComponent,
    PatientAdmissionComponent,
    AppointmentInfoComponent,
    OutdoorConsultancyInfoComponent,
    CabinInfoComponent,
    WardInfoComponent,
    CabinTypeInfoComponent,
    CabinAndWardComponent,
    BedInfoComponent,
    PatientInfoComponent,
    PatientTestingInfoComponent,
    TestCategoryComponent,
    PatientMedicineInfoComponent
  ]
})
export class HospitalManagementModule { }
