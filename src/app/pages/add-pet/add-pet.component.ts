import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetModel } from 'src/app/models/pet.model';
import { RescueService } from 'src/app/services/rescue.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit{

  formGroup !: FormGroup;

  base64Strings : any [] = [];

  constructor (private _formBuilder : FormBuilder,
    private _rescueService : RescueService,
    private _router : Router ) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      name : new FormControl('', Validators.required),
      type : new FormControl('', Validators.required),
      main_image : new FormControl(''),
      carousel_imgs: new FormControl(''),
      biography: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      age: new FormControl(''),
      chip: new FormControl('', Validators.required),
      vaccines: new FormControl(''),
      diseases: new FormControl(''),
      observations: new FormControl('')
    });
  }

  readMainFile(event : any) {
    const file = event.target.files[0];
    this.imgToBase64(file, true);
  }

  readCarouselFiles(event : any) {
    this.formGroup.controls['carousel_imgs'].setValue("");

    const files = event.target.files;

    for(let i = 0; i < files.length; i++){
      this.imgToBase64(files[i], false);
    }
  }

  imgToBase64(file : File, isMain : boolean) {

    try{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        console.log(base64String);
        
        if(isMain) this.formGroup.controls['main_image'].setValue(base64String);
        else this.formGroup.controls['carousel_imgs'].setValue(`${this.formGroup.get('carousel_imgs')?.value}|egor_espai|${base64String}`);
      }
    }catch(err){
      alert("Les imatges pesen molt, intenta baixar el pes");
    }
    
  }

  addPet (data : any) {
    let petModel: PetModel = data;

    data.carousel_imgs = data.carousel_imgs.split("|egor_espai|");
    data.carousel_imgs.splice(0, 1);

    data.vaccines = data.vaccines.split(",");
    data.observations = data.observations.split(",");
    data.diseases = data.diseases.split(",");

    this._rescueService.addAnimal(petModel).then(() => {
      this._router.navigate([`/${data.type}s`]);
    });
  }

}
