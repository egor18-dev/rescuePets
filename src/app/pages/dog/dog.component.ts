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
    this._resuceService.getData("assets/data/pets_data.json").then((data : any  ) => {
      this.pets = data.pets;
    }).catch(() => {
      alert('Error al JSON');
    });
  }

}
