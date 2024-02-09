import { Component, OnInit } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  public pets !: PetModel [];

  constructor (private _resuceService : RescueService,
    private _auth : AuthSessionService) {}

  ngOnInit(): void {
    this._resuceService.retrieveAnimals().then((animals : PetModel []) => {
      this.pets = animals.filter((pet : PetModel) => pet.type === "cat");
    });
  }

  delete (index : number, id : string) {
    this._resuceService.delteById(id).then(() => {
      this.pets.splice(index, 1);
    });
  }

  checkUserIsAdmin (){
    return this._auth.getCheckUserAdmin();
  }

}
