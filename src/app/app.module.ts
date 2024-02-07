import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shaders/header/header.component';
import { FooterComponent } from './shaders/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from  '@angular/common/http';
import { CatComponent } from './pages/cat/cat.component';
import { DogComponent } from './pages/dog/dog.component';
import { PetComponent } from './pages/pet/pet.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const routes: Routes = [
  {path : 'home',  component: HomeComponent},
  {path : 'cats',  component: CatComponent},
  {path : 'dogs', component: DogComponent},
  {path: 'animal/:id', component: PetComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CatComponent,
    DogComponent,
    PetComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
