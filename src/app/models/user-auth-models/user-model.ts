export class UserModel {
    public id : string = "";
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phoneNumber: string = "";
    public userName: string = "";
    public imageName: string = "";
  
    constructor(id : string, firstName: string,lastName: string, email: string,phoneNumber:string, userName: string,imageName: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName=lastName;
      this.email = email;
      this.phoneNumber = "";
      this.userName = userName;
      this.imageName=imageName;
    }
  }
  