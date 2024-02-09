import { Component, OnInit } from '@angular/core';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';
import { RescueService } from '../../services/rescue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  data : any;

  constructor (private _rescueService : RescueService,
    private _auth : AuthSessionService,
    private _router : Router) {}

  ngOnInit(): void {
    this._rescueService.getData("/assets/data/general_data.json").then((dataTemp) => {
      this.data = dataTemp;
    }).catch((err) => {
      alert('Error');
    });
  }

  checkUserIsAdmin (){
    return this._auth.getCheckUserAdmin();
  }

}
