import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroup !: FormGroup;

  constructor (private _formBuilder : FormBuilder,
    private _authSessionService : AuthSessionService) {
    this.formGroup = this._formBuilder.group({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  createAccount (data : any) {
    this._authSessionService.createAccount(data.email, data.password);
  } 

}
