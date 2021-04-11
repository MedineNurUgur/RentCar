import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService,private localStorageService:LocalStorageService) { }

  authStatus:boolean = false;
  fullName:any = "";
  ngOnInit(): void {
    this.isAuth();
    
  }
  isAuth(){
    this.authStatus =  this.authService.isAuthenticated();
    if(this.authStatus){
        this.fullName = (localStorage.getItem("fullName") !== null)? localStorage.getItem("fullName") : " ";
        console.log(this.fullName)
    }
  }
  logout(){
    this.localStorageService.clean();
    this.isAuth();
  }

}
