import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { Pattern } from '../objects/pattern';
import { PatternService } from '../pattern.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public patternDetailForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private patternService: PatternService,
    private router: Router
  ) { }

  ngOnInit() {
    this.patternDetailForm = this._fb.group({
      name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      // context: ['', <any>Validators.required],
      // forces: ['', <any>Validators.required],
      // solution: ['', <any>Validators.required],
      // discussion: ['', <any>Validators.required],
      patlet: ['', <any>Validators.required],
    });
  }

  save(model: Pattern, isValid: boolean) {
    this.submitted = true;

    console.log(model, isValid);

    if (isValid) {
      this.patternService
        .createPattern(model)
        .subscribe(() => {
          this.patternDetailForm.reset();
          
          this.router.navigate(['/browse']);
          
          console.log('Create pattern OK');
        });
    }
  }

}
