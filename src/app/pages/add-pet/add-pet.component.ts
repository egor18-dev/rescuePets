import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit{

  formGroup !: FormGroup;

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

  addPet (data : any) {
    console.log(data);
  }

}
