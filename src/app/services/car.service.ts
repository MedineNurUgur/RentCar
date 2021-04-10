import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { oneDataResponseModel } from '../models/oneDataResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44337/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(carId:number): Observable<oneDataResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbyidwithdetails?carId=" + carId ;
    return this.httpClient.get<oneDataResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number, colorId:number){
    let newPath = this.apiUrl + "cars/getbyidwithdetails?colorId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}