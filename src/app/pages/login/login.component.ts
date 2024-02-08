import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formGroup !: FormGroup;

  constructor(private _formBuilder : FormBuilder,
    private _authSessionService : AuthSessionService) {
    this.formGroup = this._formBuilder.group({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  signIn(data : any) {
    this._authSessionService.login(data.email, data.password);
  }

}
