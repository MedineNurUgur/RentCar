import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginMoel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44337/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(user : LoginModel) {

    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",user)

  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}