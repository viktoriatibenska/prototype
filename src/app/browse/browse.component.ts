import { Component, OnInit } from '@angular/core';
import { AccordionConfig } from 'ng2-bootstrap';
import { Pattern } from '../objects/pattern'

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), {closeOthers: true});
}

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [{provide: AccordionConfig, useFactory: getAccordionConfig}]
})
export class BrowseComponent implements OnInit {

  public oneAtATime: boolean = true;

  public status: any = {
    isFirstOpen: true,
    isOpen: false
  };

  patterns: Pattern[] = [
    { 
      id: 17, 
      name: 'Architect also implements', 
      description: 'The project needs the necessary architectural breadth to cover its markets and to ensure smooth evolution, but it can’t be blindsided by pragmatic engineering and implementation concerns. Furthermore, the project needs to carry through a singular architectural vision from conception to implementation if it is to have conceptual integrity.' 
    },
    { 
      id: 18, 
      name: 'Standards linking locations' ,
      description: 'The project was spread across three states and two countries, though most of the work centered in two states. Each of those two locations built software for the locations’ respective hardware boxes, and those boxes communicated closely with each other. There of course was a standard message protocol, but it wasn’t articulated anywhere: each location used its own C language structures to define its understanding of the messages. Each location emphasized the message fields most of interest to it; in some cases, one location would give a field one name while another location gave it another name. It doesn’t take much imagination to envision the confusion that ensued.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
