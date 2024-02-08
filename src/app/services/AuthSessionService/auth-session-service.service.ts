import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { addDoc, collection, CollectionReference, DocumentReference } from 'firebase/firestore';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  private _usersCollection !: CollectionReference<UserModel>;

  constructor(private _auth : Auth,
    private _router : Router,
    private _firestore : Firestore) { 

    this._usersCollection = collection(this._firestore, 'users') as CollectionReference<UserModel>;
  }

  async login(email : string, password : string) {
    try{
      const result = await signInWithEmailAndPassword(this._auth, email, password);
      
      if(result){
        this._router.navigate(['/home']);
      }else{
        alert('Email o contrasenya incorrectes');
        this._router.navigate(['/sign-in']);
      }
    }catch(err) {
      alert('Email o contrasenya incorrectes');
      this._router.navigate(['/sign-in']);
    }
  }

  async createAccount (email : string, password : string) {
    try{
      const result = await createUserWithEmailAndPassword(this._auth, email, password);
      if(result){
        this.registerInfo(email);
      }else{
        alert("Error al crear el compte intente un altre correu");
      }
    }catch(err){
      alert("Error al crear el compte intente un altre correu");
    }
  }
  
  registerInfo(email : string) {
    const uid = this._auth.currentUser?.uid!;

    if(uid){
      const user : UserModel = {'uid': uid, 'email': email, 'role': 'volunteer'}
      addDoc(this._usersCollection, user).then(() => {
        this._router.navigate(['/signIn']);
      }).catch(() => {
        this._router.navigate(['/home']);
      });
    }
  }

}
