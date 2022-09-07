import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { Constants } from "src/app/Helper/constants";
import { PatientMedicineInfoModel } from "src/app/models/hospital-management-models/patientMedicineInfoModel";
import { ResponseModel } from "src/app/models/responseModel";


@Injectable({
  providedIn: 'root'
})
export class PatientMedicineInfoService {
  public patientMedicineInfoViewModel:PatientMedicineInfoModel[]=[];
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }
  private readonly patientMedicineInfo: string = Constants.API_KEY + "api/PatientMedicineInfo/";

  public insert() {
    return this.httpClient.post<ResponseModel>(this.patientMedicineInfo + "Insert", this.patientMedicineInfoViewModel);
  }
  public update() {
    return this.httpClient.put<ResponseModel>(this.patientMedicineInfo + "Update", this.patientMedicineInfoViewModel);
  }
  public getAll() {
    return this.httpClient.get<ResponseModel>(this.patientMedicineInfo + "GetAll");
  }
  public delete(id: number) {
    return this.httpClient.delete(`${this.patientMedicineInfo}${id}`)
  }
}
