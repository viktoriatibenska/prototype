import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

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
  patternId: number;
  pattern: Pattern;

  constructor(
    private _fb: FormBuilder,
    private patternService: PatternService,
    private router: Router,
    private _route: ActivatedRoute
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

    let routeId = this._route.snapshot.params['id'];

    if(routeId != null){
      this.patternId = parseInt(routeId);
      console.log('Pattern ID:', typeof this.patternId, this.patternId);

      this.patternService
          .getPattern(this.patternId)
          .subscribe(p => {
            this.pattern = p;

            console.warn('Recieved pattern', this.pattern);

            this.patternDetailForm.patchValue({
              name: this.pattern.name,
              patlet: this.pattern.patlet
            })
          })
    } else {
      this.patternId = null;
    }
  }

  save(model: Pattern, isValid: boolean) {
    this.submitted = true;

    console.log(model, isValid);

    if (isValid) {
      if (this.patternId == null) {
        console.log('Create new pattern');
        this.patternService
          .createPattern(model)
          .subscribe(() => {
            this.patternDetailForm.reset();
            
            this.router.navigate(['/browse']);
            
            console.log('Create pattern OK');
          });
      } else {
        console.log('Update pattern', this.patternId);

        this.pattern.name = model.name;
        this.pattern.patlet = model.patlet;

        this.patternService
          .updatePattern(this.pattern)
          .subscribe(() => {
            this.patternDetailForm.reset();
            
            this.router.navigate(['/browse']);
            
            console.log('Update pattern OK');
          });
      }
    }
  }

}
