import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
  carImages: CarImage[] = [];
  car: CarDetail;
  dataLoaded = false;
  currentImage:CarImage;
  apiUrl="https://localhost:44337"

  constructor(private carService: CarService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      } 
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.car = response.data
      this.dataLoaded = true;
    })
  }
  
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data
      this.dataLoaded = true;
    })
  }

  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  } 

  rentCar(car:CarDetail){
      this.router.navigate(['/rental/', car.carId ]);
      this.toastrService.success("Kiralama ekranına yönlendiriliyor.",car.carName)
  }

}
