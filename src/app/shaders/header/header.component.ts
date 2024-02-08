import { Component } from '@angular/core';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private _authSessionService : AuthSessionService) {}

  logOut (){
    this._authSessionService.logout();
  }

}
