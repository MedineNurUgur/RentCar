import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44337/api/users/"

  constructor(private httpClient:HttpClient) { }

  getUserByMail(email:string){
    console.log(email)
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getbymail?email=" + email)
  }

  updateUser(user:User):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update",user)
  }
}