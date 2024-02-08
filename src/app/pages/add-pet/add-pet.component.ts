import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit{

  formGroup !: FormGroup;

  base64Strings : any [] = [];

  constructor (private _formBuilder : FormBuilder) {}

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
    const files = event.target.files;
    const file = files[0];
    this.imgToBase64(file);
  }

  readCarouselFiles(event : any) {
    const files = event.target.files;

    for(let i = 0; i < files.length; i++){
      this.imgToBase64(files[i], true);
    }
  }

  imgToBase64(file : File, isMain : boolean = false) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Strings.push(reader.result);
    }
  }

  addPet (data : any) {
    console.log(data);
  }

}
