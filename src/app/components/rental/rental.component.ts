import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals : RentalDetail[] = [];
  customers: Customer[] = [];
  carDetails: CarDetail;
  carId:number;
  customerId: number;
  rentDate: Date;
  returnDate: Date;

  constructor(private rentalService : RentalService,
    private toastrService: ToastrService,
    private router: Router,
    private customerService:CustomerService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carId = params["carId"];
      } 
    })
    this.getRentals();
    this.getCustomer();
  }

  addRental() {
    if (this.returnDate < this.rentDate) {
      this.toastrService.error(
        'Kiralama tarihi dönüş tarihinden büyük olamaz.'
      );
    } 
    else {
      let rental: Rental = {
        carId:parseInt(this.carId.toString()),
        customerId: parseInt(this.customerId.toString()),
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };
      
      console.log(rental);
      
        
      this.router.navigate(['/payment/', JSON.stringify(rental)]);
      this.toastrService.info('Ödeme Sayfasına Yönlendiriliyorsunuz.');
      
    }
  }

  getRentals(){
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10);
  }

  
}
