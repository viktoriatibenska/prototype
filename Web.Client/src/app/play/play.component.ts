/**
 * Component for gameplay
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { State } from '../objects/state';
import { PatternService } from '../pattern.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  public state: State = null;
  stateId: number;
  public isDataAvailable: boolean = false;
  public isTransitionsEmpty: boolean = false;
  previousUrl: string;

  constructor(
    private patternService: PatternService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.isDataAvailable = false;
    this.isTransitionsEmpty = false;

    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe(e => {
      if (this.previousUrl == null) {
        this.previousUrl = e.url;
      }
      console.warn('prev:', this.previousUrl);
    });
  }

  ngOnInit() {
    this._route.params.forEach(params => {
      this.stateId = +params['stateId'];

      this.patternService
        .getState(this.stateId)
        .subscribe(s => {
          this.state = s;

          this.patternService
            .getTransitionsByState(this.stateId)
            .subscribe(t => {
              this.state.setTransitions(t);
              this.isDataAvailable = true;

              if (this.state.transitions.length === 0){
                console.log("No transitions");
                this.isTransitionsEmpty = true;
              }

              console.log(this.state);
            });
        });
    });

    
  }

  switchState(id: number) {
    this.router.navigate(['/play', id]);
  }

  finish() {
    this.router.navigate(['/browse']);
  }
}
