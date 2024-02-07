import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PetModel } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private _pets !: PetModel [];

  constructor(private _httpClient : HttpClient) {}
 
  getData (direction : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._httpClient.get(direction).subscribe({
        next: (data : any) => resolve(data),
        error : (error : any) => reject(error)
      })
    }); 
  }  

}
