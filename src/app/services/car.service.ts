import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44337/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}