import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PetModel } from '../models/pet.model';
import { Firestore, collectionData, Query, query, where, CollectionReference, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { addDoc, DocumentReference, limit, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private _pets !: PetModel[];
  private _petsCollection !: CollectionReference<PetModel>;
  private _mainCollection !: CollectionReference<any>;

  main : any;

  constructor(private _httpClient: HttpClient,
    private _firestore: Firestore) {
    this._petsCollection = collection(this._firestore, 'pets') as CollectionReference<PetModel>;
    this._mainCollection = collection(this._firestore, 'main') as CollectionReference<any>;

    this.retrieveAnimals();
  }

  getData() {
    return collectionData(this._mainCollection, { idField: 'id' });
  }

  returnMain () {
    return this.main;
  }

  addAnimal(pet: PetModel) {
    return addDoc(this._petsCollection, pet);
  }

  getPets() {
    return this._pets;
  }

  retrieveAnimals() {
    return new Promise<PetModel[]>((resolve, reject) => {
      collectionData(this._petsCollection, { 'idField': 'id' }).subscribe({
        next: (categoriesDb: PetModel[]) => {
          resolve(categoriesDb)
          this._pets = categoriesDb;
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  retrieveAnimalById(refAnimal: string) {
    const queryRef = query(this._petsCollection, where('__name__', '==', refAnimal), limit(1));

    return new Promise<PetModel>((resolve, reject) => {
      collectionData(queryRef, { idField: 'id' }).subscribe({
        next: (products: PetModel[]) => {
          resolve(products[0]);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  delteById(id: string) {
    const documentRef: DocumentReference<PetModel> = doc(this._firestore, 'pets', id) as DocumentReference<PetModel>;
    return deleteDoc(documentRef);
  }

  mofifyById(id: string, pet: any) {
    console.log(pet);

    const documentRef: DocumentReference<PetModel> = doc(this._firestore, 'pets', id) as DocumentReference<PetModel>;
    return updateDoc(documentRef, pet);
  }

}
