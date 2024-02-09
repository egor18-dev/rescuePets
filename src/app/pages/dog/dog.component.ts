import { Component } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';
import { Router } from '@angular/router';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  public pets !: PetModel [];

  constructor (private _resuceService : RescueService,
    private _router : Router,
    private _auth : AuthSessionService) {}

  ngOnInit(): void {
    this._resuceService.retrieveAnimals().then((pets : PetModel []) => {
      this.pets = pets;
    });
  }

  delete (index : number , id : string) {
    this._resuceService.delteById(id).then(() => {
      this.pets.splice(index, 1);
    });
  }

  edit(id : string){
    this._router.navigate([`/modifyPet/${id}`]);
  }

  checkUserIsAdmin (){
    return this._auth.getCheckUserAdmin();
  }

}
