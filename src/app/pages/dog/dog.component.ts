import { Component } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';
import { Router } from '@angular/router';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  public pets !: PetModel [];

  public isUserLogged : boolean = false;
  public isAdmin : boolean = false;

  constructor (private _resuceService : RescueService,
    private _router : Router,
    private _auth : AuthSessionService) {}

  ngOnInit(): void {
    this._auth.userLogged().then((uid : any) => {
      if(uid){
        this.isUserLogged = true;

        this._auth.getUserByUid(uid).then((userModel : UserModel) => {
          this.isAdmin = userModel.role === "admin" ? true : false;
        });
      } 
      else this.isUserLogged = false;
    }).catch(() => this.isUserLogged = false);
  }

  delete (index : number , id : string) {
    this._resuceService.delteById(id);
    this.pets.splice(index, 1);
  }

  getPets () {
    return this._resuceService.getPets();
  }

  edit(id : string){
    this._router.navigate([`/modifyPet/${id}`]);
  }

}
