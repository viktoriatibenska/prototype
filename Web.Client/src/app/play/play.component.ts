import { Component, OnInit } from '@angular/core';
import { State } from '../objects/state';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  state: State = {
    id: 2,
    name: '',
    // tslint:disable-next-line:max-line-length
    description: 'A developer approaches you to discuss the implementation problems.\n\nThe developer was unable to follow your architecture. The solution seemed viable, but the technologies don\'t permit that kind of organization. Moreover, the developer is afraid of infringing compatibility with new framework versions.\n\nYou... ',
    transitions: [
      {
        id: 46,
        // tslint:disable-next-line:max-line-length
        description: 'feel responsible for the whole system and moreover the technical Solution to the architecture problem puzzles you. You decide to make your time and join the developer in the implementation effort. ',
        stateFrom: 2,
        stateTo: 5,
      },
      {
        id: 49,
        // tslint:disable-next-line:max-line-length
        description: 'consider your architecture to be correct and the problems seem to you as an implementation detail. You explain your intent with the architecture and leave the implementation to the developer.',
        stateFrom: 2,
        stateTo: 6,
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
