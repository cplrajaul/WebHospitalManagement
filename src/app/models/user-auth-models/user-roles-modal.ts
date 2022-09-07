// export class UserRolesModal{
//     public userId: string ="";
//     public userRoles: UserRoles[] = [];
// } 
export class UserRolesModal{
    public userId: string ="";
    public jsonData:string ="";
    public roleId:string ="";
    public roleName:string="";
    public selected:boolean []=[];
    public userRoles:string [] = [];
    constructor(userId: string, jsonData:string, roleId:string, roleName:string, selected:boolean[], userRoles:string[]){
        this.userId = userId;
        this.jsonData = jsonData;
        this.roleId = roleId;
        this.roleName = roleName;
        this.selected = selected;
        this.userRoles=userRoles;
    }
}