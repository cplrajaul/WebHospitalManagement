export class AppointmentInfoEntryModel{
    public appointmentId: number=0;
    public appointmentDate?: string;
    public doctorId: number=0;
    public serialNo: number=0;
    public appointmentTime: string="";
    public patientName:string="";
    public phoneNo:string="";
    public nextAppointmentDate?: string="";
    public remark: string="";
    public doctorName:string=""
}
