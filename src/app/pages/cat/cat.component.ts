import { Component, OnInit } from '@angular/core';
import { RescueService } from '../../services/rescue.service';
import { PetModel } from '../../models/pet.model';
import { AuthSessionService } from 'src/app/services/AuthSessionService/auth-session-service.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  public pets !: PetModel [];

  public isUserLogged : boolean = false;
  public isAdmin : boolean = false;

  constructor (private _resuceService : RescueService,
    private _auth : AuthSessionService) {

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

  ngOnInit(): void {
   
  }

  getAnimal () {
    return this._resuceService.getPets();
  }

  delete (index : number, id : string) {
    this._resuceService.delteById(id).then(() => {
      this.pets.splice(index, 1);
    });
  }

  checkUserIsAdmin (){
  }

}
