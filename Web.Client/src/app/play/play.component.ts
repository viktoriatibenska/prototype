import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  constructor(
    private patternService: PatternService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.stateId = +params['stateId'];
      console.log('Constructor',this.stateId);
    });
  }

  ngOnInit() {
    console.log('On init',this.stateId);

    this.patternService
      .getState(this.stateId)
      .subscribe(s => {
        this.state = s;
        this.isDataAvailable = true;

        console.log(this.state);
      });
  }

}
