import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDetail[] = [];
  dataLoaded = false;
  currentCar : CarDetail;
  filterText = "";

  constructor(private carService:CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]&&params["colorId"]){
        this.getCarsFilter(params["brandId"],params["colorId"])
      }
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }

  getCarsFilter(brandId:number,colorId:number){
    this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }


  setCurrentCar(car:CarDetail){
    this.currentCar = car;
  }

}
