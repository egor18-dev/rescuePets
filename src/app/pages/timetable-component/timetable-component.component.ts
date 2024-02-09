import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetModel } from 'src/app/models/pet.model';
import { Volunteer } from 'src/app/models/volunteer';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';
import { VolunteerService } from 'src/app/services/Volunteer/volunteer.service';
import { RescueService } from 'src/app/services/rescue.service';

@Component({
  selector: 'app-timetable-component',
  templateUrl: './timetable-component.component.html',
  styleUrls: ['./timetable-component.component.css']
})
export class TimetableComponentComponent {

  public pet !: PetModel;

  public hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  public id !: string;

  public volunteers !: Volunteer [];

  constructor (private _activatedRoute : ActivatedRoute,
    private _rescueService : RescueService,
    private _volunteersService : VolunteerService,
    private _auth : AuthSessionService) {

    }
    
    ngOnInit(): void {
      this._activatedRoute.params.subscribe((data) => {
        const id = data['id'];
        this.id = id;

        this._rescueService.retrieveAnimalById(id).then((pet : PetModel) => {
          this.pet = pet;
        });
      });    
    }

    volunteerAdd (index : number) {
      const date = new Date();
      date.setHours(this.hours[index], 0, 0);

      this._auth.userLogged().then((uid : any) => {

        if(uid){
          const volunteer : Volunteer = {
            refPet: this.id,
            refUser: uid,
            time: date
          }

          this._volunteersService.addVolunteer(volunteer);
        }

      });
    }

    retrieveByHour (i : number){
      return this._volunteersService.returnIsVolunteer(this.hours[i]).length > 0;
    }

}
