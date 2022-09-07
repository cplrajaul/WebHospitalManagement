import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserRolesModal } from 'src/app/models/user-auth-models/user-roles-modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private readonly baseURL:string=Constants.API_KEY+"api/account/"
 constructor(private httpClient:HttpClient,private toastr: ToastrService) { }
  public singIn(userName:string , password:string, isChecked:boolean)
  {
    const body={
      UserName:userName,
      Password:password,
      IsChecked:isChecked
    }
   return this.httpClient.post<ResponseModel>(this.baseURL+"SignIn",body);
  }

  public register(params:any)
  {
   return this.httpClient.post<ResponseModel>(this.baseURL+"RegisterUser",params);
  }
  public roleAdd(params:any)
  {
   return this.httpClient.post<ResponseModel>(this.baseURL+"AddRole",params);
  }
  public roleUpdate(params:any)
  {
   return this.httpClient.put<ResponseModel>(this.baseURL+"EditRole", params)
  }
  public getAllRole()
  {
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
    const headers=new HttpHeaders({
    'Authorization':`Bearer ${userInfo?.token }`
   });
   return this.httpClient.get<ResponseModel>(this.baseURL+"GetRoles",{headers:headers});
  }
  deleteRecord(params:any){
    return this.httpClient.post<ResponseModel>(this.baseURL+"DeleteRole", params)
  }
  public getAllUser()
  {
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
    const headers=new HttpHeaders({
    'Authorization':`Bearer ${userInfo?.token }`
   });
   return this.httpClient.get<ResponseModel>(this.baseURL+"GetAllUser",{headers:headers});
  }
  public getUserRoles(id:string)
   {
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) || '{}');
    const headers=new HttpHeaders({
'Authorization':`Bearer ${userInfo?.token }`
    });

    return this.httpClient.get<ResponseModel>(this.baseURL+"UserRoles?id="+id,{headers:headers}).pipe(map(res=>{
      let userRolesList=new Array<UserRolesModal>();
      if(res.responseCode==ResponseCode.OK)
      {
           if(res.dateSet)
           {
             debugger;
           res.dateSet.map((x:UserRolesModal)=>{
            userRolesList.push(new UserRolesModal(x.userId, x.jsonData, x.roleId,x.roleName,x.selected,x.userRoles));
           })
           }
          }else{
            this.toastr.error(res.responseMessage);
          }
          return userRolesList;
    }));
   }
//   public getAllUser()
//   {
//     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) as string);
//    const headers=new HttpHeaders({ 'Authorization':`Bearer ${userInfo?.token }`
//    });

//    return this.httpClient.get<ResponseModel>(this.baseURL+"GetAllUser",{headers:headers}).pipe(map(res=>{
//      let userList=new Array<User>();
//      if(res.responseCode==ResponseCode.OK)
//      {
//           if(res.dateSet)
//           {
//           res.dateSet.map((x:User)=>{
//               userList.push(new User(x.fullName,x.email,x.userName,x.roles));
//           })
//           }
//          }
//          return userList;
//    }));
//   }
//   public getUserList()
//   {
//     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) as string);
//    const headers=new HttpHeaders({
// 'Authorization':`Bearer ${userInfo?.token }`
//    });

//    return this.httpClient.get<ResponseModel>(this.baseURL+"GetUserList",{headers:headers}).pipe(map(res=>{
//      let userList=new Array<User>();
//      if(res.responseCode==ResponseCode.OK)
//      {
//           if(res.dateSet)
//           {
//           res.dateSet.map((x:User)=>{
//               userList.push(new User(x.fullName,x.email,x.userName,x.roles));
//           })
//           }
//          }else{
//            this.toastr.error(res.responseMessage);
//          }
//          return userList;
//    }));
//   }
//   public getAllRole()
//   {
//     let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY) as string);
//    const headers=new HttpHeaders({
// 'Authorization':`Bearer ${userInfo?.token }`
//    });

//    return this.httpClient.get<ResponseModel>(this.baseURL+"GetRoles",{headers:headers}).pipe(map(res=>{
//      let roleList=new Array<Role>();
//      if(res.responseCode==ResponseCode.OK)
//      {
//           if(res.dateSet)
//           {
//           res.dateSet.map((x:string)=>{
//               roleList.push(new Role(x));
//           })
//           }
//          }
//          return roleList;
//    }));
//   }

}
