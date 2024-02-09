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


  constructor () {}

  ngOnInit(): void {
  }


}
