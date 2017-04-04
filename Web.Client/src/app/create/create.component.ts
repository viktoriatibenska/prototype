import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Pattern } from '../objects/pattern';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public patternDetailForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.patternDetailForm = this._fb.group({
      name: ['Name', [<any>Validators.required, <any>Validators.minLength(5)]],
      context: ['', <any>Validators.required],
      forces: ['', <any>Validators.required],
      solution: ['', <any>Validators.required],
      discussion: ['', <any>Validators.required],
      patlet: ['', <any>Validators.required],
    });
  }

  save(model: Pattern, isValid: boolean) {
    this.submitted = true;

    console.log(model, isValid);
  }

}
