import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl="https://localhost:44337/api/";
  constructor(private httpClient:HttpClient) { }
  
  updateAccount(account:Account):Observable<ResponseModel>{
    let newPath=this.apiUrl+"payments/update"
    return this.httpClient.post<ResponseModel>(newPath,account);

  }
  getAccountById(customerId : number) : Observable<ListResponseModel<Account>>{
    let newPath = this.apiUrl + "payments/getbyuserid?id=" + customerId;
    return this.httpClient.get<ListResponseModel<Account>>(newPath);
}
}
