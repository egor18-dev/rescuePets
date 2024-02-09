import { Injectable } from '@angular/core';
import { Firestore, collectionData, Query, query, where, CollectionReference, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { addDoc, DocumentReference, limit, updateDoc } from 'firebase/firestore';
import { Volunteer } from 'src/app/models/volunteer';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private _volunteersCollection !: CollectionReference<Volunteer>;

  private volunteers: Volunteer[] = [];

  constructor(private _firestore: Firestore) {
    this._volunteersCollection = collection(this._firestore, 'volunteers') as CollectionReference<Volunteer>;

    this.getVolunteers();
  }

  addVolunteer(volunteer: Volunteer) {
    return addDoc(this._volunteersCollection, volunteer);
  }

  getVolunteers() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const queryRef = query(
      this._volunteersCollection,
      where('time', '>=', startOfDay),
      where('time', '<=', endOfDay),
    );

    collectionData(queryRef, { 'idField': 'id' }).subscribe({
      next: (volunteers: Volunteer[]) => {
        this.volunteers = volunteers;
      },
      error: (err) => {
      }
    });
  }

  getAllVolunteers () {
    return this.volunteers;
  }

  public returnIsVolunteer (hour : number) {
    return this.volunteers.filter((volunteer: Volunteer) => {
      const timestamp: any = volunteer.time;
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      const date = new Date(milliseconds);
      return date.getHours() === hour;
    });
  }

}
