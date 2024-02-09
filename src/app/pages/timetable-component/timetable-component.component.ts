import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetModel } from 'src/app/models/pet.model';
import { RescueService } from 'src/app/services/rescue.service';

@Component({
  selector: 'app-timetable-component',
  templateUrl: './timetable-component.component.html',
  styleUrls: ['./timetable-component.component.css']
})
export class TimetableComponentComponent {

  public pet !: PetModel;

  public hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  constructor (private _activatedRoute : ActivatedRoute,
    private _rescueService : RescueService) {}
    
    ngOnInit(): void {
      this._activatedRoute.params.subscribe((data) => {
        const id = data['id'];

        this._rescueService.retrieveAnimalById(id).then((pet : PetModel) => {
          this.pet = pet;
        });
      });    
    }

}
