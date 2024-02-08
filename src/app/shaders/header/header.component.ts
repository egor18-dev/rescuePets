import { Component, OnInit } from '@angular/core';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public isUserLogged : boolean = false;

  constructor (private _authSessionService : AuthSessionService) {}

  ngOnInit(): void {
    this._authSessionService.userLogged().then((uid : any) => {
      this.isUserLogged = uid ? true : false;
    }).catch(() => this.isUserLogged = false);
  }

  logOut (){
    this._authSessionService.logout();
  }

}
