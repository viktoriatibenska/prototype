/**
 * Component for designing text scenarios
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { PatternService } from '../pattern.service'
import { State } from '../objects/state';
import { Transition } from '../objects/transition';

@Component({
  selector: 'app-scenario-design',
  templateUrl: './scenario-design.component.html',
  styleUrls: ['./scenario-design.component.css']
})
export class ScenarioDesignComponent implements OnInit {

  private variationId: number;
  private states: State[] = [];
  private transitions: Transition[] = [];
  private startStateId: number;
  public statesEmpty: boolean;
  public panelStart: string = "panel-success";
  public panelDefault: string = "panel-default";

  public stateForm: FormGroup;
  public transitionForm: FormGroup;
  public stateFormSubmitted: boolean;
  public transitionFormSubmitted: boolean;
  public stateSelected: State = null;
  public transitionSelected: Transition = null;
  public stateFromId: number = null;

  constructor(
    private _fb: FormBuilder,
    private patternService: PatternService,
    private _route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.stateForm = this._fb.group({
      name: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
    });

    this.transitionForm = this._fb.group({
      name: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
      stateToId: ['', <any>Validators.required],
    });

    this.variationId = parseInt(this._route.snapshot.params['variationId']);
		this.patternService
			.getStates(this.variationId)
			.subscribe(states => {
				this.states = states;
				console.log('States get success', this.states);

        if (this.states.length > 0){
          this.statesEmpty = false;
        } else {
          this.statesEmpty = true;
        }

				this.patternService
					.getTransitionsByVariation(this.variationId)
					.subscribe(transitions => {
						this.transitions = transitions;
						console.log('Transitions get success', this.transitions);

						this.patternService
							.getStartState(this.variationId)
							.subscribe(stateId => {
								this.startStateId = stateId;
								console.log('Start state is:', this.startStateId);
							})

            // initialize transitions arrays of each state
            this.assignTransitions();

            console.log(this.states);
					});
			});
  }

  saveState(model: State, isValid: boolean) {
    this.stateFormSubmitted = true;

    console.log(model, isValid);

    if (isValid){
      if (this.stateSelected == null) {
        model.variationId = this.variationId;
        //call save
        this.patternService
            .createState(model)
            .subscribe((id) => {
              model.id = id;

              this.states.push(model);

              this.stateSelected = null;
              this.stateForm.reset();
            })
      } else {
        this.stateSelected.name = model.name;
        this.stateSelected.description = model.description;

        this.patternService
            .updateState(this.stateSelected)
            .subscribe(() => {
              this.states.filter((state) => {
                return state.id == this.stateSelected.id ? true : false;
              })[0] = this.stateSelected;

              this.stateSelected = null;
              this.stateForm.reset();
            })
      }
    }
  }

  editState(state: State) {
    this.stateSelected = state;

    this.stateForm.patchValue({
      name: this.stateSelected.name,
      description: this.stateSelected.description
    })
  }

  saveTransition(model: Transition, isValid: boolean) {
    this.transitionFormSubmitted = true;

    console.log(model, isValid);

    if (isValid){
      if (this.transitionSelected == null) {
        model.stateFromId = this.stateFromId;
        this.patternService
            .createTransition(model)
            .subscribe((id) => {
              model.id = id;

              this.transitions.push(model);
              this.assignTransitions();

              this.transitionSelected = null;
              this.transitionForm.reset();
            })
      } else {
        this.transitionSelected.name = model.name;
        this.transitionSelected.description = model.description;
        this.transitionSelected.stateToId = model.stateToId;

        this.patternService
            .updateTransition(this.transitionSelected)
            .subscribe(() => {
              this.states.filter((state) => {
                return state.id == this.transitionSelected.stateFromId ? true : false;
              })[0].transitions.filter((transition) => {
                return transition.id == this.transitionSelected.id ? true : false;
              })[0] = this.transitionSelected;
              this.assignTransitions();
              
              this.transitionSelected = null;
              this.transitionForm.reset();
            })
      }
    }
  }

  editTransition(stateFromId: number, transition: Transition) {
    this.transitionSelected = transition;
    this.stateFromId = stateFromId;

    if (this.transitionSelected != null) {
      this.transitionForm.patchValue({
        name: this.transitionSelected.name,
        description: this.transitionSelected.description,
        stateToId: this.transitionSelected.stateToId
      });
    }
  }

  clearStateForm() {
    this.stateForm.reset();
  }

  clearTransitionForm() {
    this.transitionForm.reset();
    this.transitionSelected = null;
  }

  setStartState(id: number) {
    this.patternService
        .setStartState(this.variationId, id)
        .subscribe(() => {
          this.startStateId = id;
        });
  }

  deleteState(id: number) {
    this.patternService
        .deleteState(id)
        .subscribe(() => {
          this.states = this.states.filter((state) => {
            return state.id != id ? true : false;
          })
          this.transitions = this.transitions.filter((transition) => {
            if (transition.stateFromId == id || transition.stateToId == id) {
              return false;
            } else {
              return true;
            }
          });
          this.assignTransitions();
        });
  }

  deleteTransition(transId: number, stateId: number) {
    this.patternService
        .deleteTransition(transId)
        .subscribe(() => {
          this.transitions = this.transitions.filter((transition) => {
            return transition.id != transId ? true : false;
          })
          this.assignTransitions();
        });
  }

  playPattern() {
    this.router.navigate(['play', this.startStateId]);
  }

  switchToUml() {
    this.router.navigate(['design',this.variationId]);
  }

  /** iterate through transitions to initialize array of transitions in state class */
  assignTransitions() {
    for (let state of this.states) {
      state.transitions = [];
    }
    for (let transition of this.transitions) {
      transition.stateTo = this.states.filter((state) => {
        if (state.id == transition.stateToId){
          return true;
        } else {
          return false;
        }
      })[0];
      console.log(transition.stateTo);

      this.states.filter((state) => {
        if (state.id == transition.stateFromId){
          return true;
        } else {
          return false;
        }
      })[0].transitions.push(transition);
    }
  }
}
