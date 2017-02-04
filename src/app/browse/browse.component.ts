import { Component, OnInit } from '@angular/core';
import { AccordionConfig } from 'ng2-bootstrap';
import { Pattern } from '../objects/pattern';

import { PatternService } from '../pattern.service';

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

  public max: number = 5;
  public isReadonly: boolean = true;

  public status: any = {
    isFirstOpen: true,
    isOpen: false
  };

  patterns;

  ngOnInit(): void {
      this.getPatterns();
  }

  constructor(private patternService: PatternService) { }

  getPatterns(): void {
      this.patternService.getPatterns().then(patterns => this.patterns = patterns);
  }

}
