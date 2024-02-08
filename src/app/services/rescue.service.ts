import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PetModel } from '../models/pet.model';
import { Firestore, collectionData, Query, query, where, CollectionReference, collection } from '@angular/fire/firestore';
import { addDoc, limit } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private _pets !: PetModel [];
  private _petsCollection !: CollectionReference <PetModel>;

  constructor(private _httpClient : HttpClient,
    private _firestore : Firestore) {
    this._petsCollection = collection(this._firestore, 'pets') as CollectionReference<PetModel>;
  }
 
  getData (direction : string) : Promise<any> {
    console.log(direction);
    return new Promise<any>((resolve, reject) => {
      this._httpClient.get(direction).subscribe({
        next: (data : any) => resolve(data),
        error : (error : any) => reject(error)
      })
    }); 
  }  

  addAnimal (pet : PetModel) {
    return addDoc(this._petsCollection, pet);
  }

  retrieveAnimals () {
    return new Promise<PetModel []>((resolve, reject) => {
      collectionData(this._petsCollection, {'idField': 'id'}).subscribe({
        next: (categoriesDb : PetModel []) => {
          resolve(categoriesDb)
        },
        error: (err) => {
          reject(err);
        }
      });
    }); 
  }

  retrieveAnimalById (refAnimal : string) {
    const queryRef = query(this._petsCollection, where('__name__', '==', refAnimal), limit(1));

    return new Promise<PetModel>((resolve, reject) => {
      collectionData(queryRef, { idField: 'id' }).subscribe({
        next: (products: PetModel []) => {
          resolve(products[0]);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

}
