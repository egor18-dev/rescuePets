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
    this._resuceService.getData("assets/data/pets_data.json").then((data : any  ) => {
      this.pets = data.pets;
      console.log(data);
    }).catch(() => {
      alert('Error al JSON');
    });
  }

}
