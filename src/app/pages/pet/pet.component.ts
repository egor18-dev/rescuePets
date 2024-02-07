import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit{

  public pet !: PetModel;

  constructor (private _activatedRoute : ActivatedRoute,
    private _rescueService : RescueService) {}
    
    ngOnInit(): void {
      this._activatedRoute.params.subscribe((data) => {
        const id = data['id'];

        this._rescueService.getData("assets/data/pets_data.json").then((data) => {
          this.pet = data.pets[id];

          if(this.pet){
            console.log(this.pet);
          }
        }).catch(() => {
          alert('Error');
        });
      });    
    }

}
