import { Component, OnInit } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  public pets !: PetModel [];

  constructor (private _resuceService : RescueService) {}

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

}
