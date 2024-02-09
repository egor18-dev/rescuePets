import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { addDoc, collection, DocumentReference, limit, query, where, Query, doc, setDoc, updateDoc, CollectionReference } from 'firebase/firestore';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  private _usersCollection !: CollectionReference<UserModel>;
  private role : string = 'volunteer';

  constructor(private _auth: Auth,
    private _router: Router,
    private _firestore: Firestore) {

    this._usersCollection = collection(this._firestore, 'users') as CollectionReference<UserModel>;
    this.checkUserAdmin();
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this._auth, email, password);

      if (result) {
        this._router.navigate(['/home']);
      } else {
        alert('Email o contrasenya incorrectes');
        this._router.navigate(['/signIn']);
      }
    } catch (err) {
      alert('Email o contrasenya incorrectes');
      this._router.navigate(['/signIn']);
    }
  }

  checkUserAdmin() {
    this.userLogged().then((uid : any) => {

      if(uid){
        const queryRef = query(this._usersCollection, where('uid', '==', uid), limit(1));
        
        collectionData(queryRef, {'idField': 'id'}).subscribe((user) => {
          if(user){
            this.role = user[0].role;
          }else{
            this._router.navigate(['/signIn']);
          }
        }); 
      }else{
        this._router.navigate(['/signIn']);
      }

    }).catch(() => this._router.navigate(['/signIn']));    
  }

  getCheckUserAdmin() {
    return this.role !== "volunteer";
  }

userLogged() {
  return new Promise((resolve, reject) => {
    this._auth.onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });
}

logout() {
  this._auth.signOut().then(() => {
    this._router.navigate(['/signIn']);
  });
}

  async createAccount(email : string, password : string) {
  try {
    const result = await createUserWithEmailAndPassword(this._auth, email, password);
    if (result) {
      this.registerInfo(email);
    } else {
      alert("Error al crear el compte intente un altre correu");
    }
  } catch (err) {
    alert("Error al crear el compte intente un altre correu");
  }
}

registerInfo(email : string) {
  const uid = this._auth.currentUser?.uid!;

  if (uid) {
    const user: UserModel = { 'uid': uid, 'email': email, 'role': 'volunteer' }
    addDoc(this._usersCollection, user).then(() => {
      this._router.navigate(['/signIn']);
    }).catch(() => {
      this._router.navigate(['/home']);
    });
  }
}

}
