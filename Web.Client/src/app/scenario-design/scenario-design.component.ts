import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

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

  constructor(
    private patternService: PatternService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
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

  addNewState() {}

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

  assignTransitions() {
    for (let state of this.states) {
      state.transitions = [];
    }
    for (let transition of this.transitions) {
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
