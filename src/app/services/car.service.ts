import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { oneDataResponseModel } from '../models/oneDataResponseModel';
import { ResponseModel } from '../models/responseModel';

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

  getCarsByBrand(brandId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId:number): Observable<oneDataResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getbyidwithdetails?carId=" + carId ;
    return this.httpClient.get<oneDataResponseModel<CarDetail>>(newPath);
  }

  getCarsByFilter(brandId:number, colorId:number) : Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getbyidwithdetails?colorId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car : Car) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
}