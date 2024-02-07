import { Component } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  public pets !: PetModel [];

  constructor (private _resuceService : RescueService) {}

  ngOnInit(): void {
    this._resuceService.retrieveAnimals().then((pets : PetModel []) => {
      this.pets = pets;
    });
  }

}
