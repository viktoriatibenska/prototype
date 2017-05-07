import { Component, OnInit } from '@angular/core';
import { AccordionConfig } from 'ng2-bootstrap';
import { Router } from '@angular/router';
import { Pattern } from '../objects/pattern';

import { PatternService } from '../pattern.service';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class BrowseComponent implements OnInit {
  public oneAtATime: boolean = true;

  public max: number = 5;
  public isReadonly: boolean = true;

  public status: any = {
    isFirstOpen: true,
    isOpen: false
  };

  public patterns: Pattern[] = [];

  public patternsEmpty: boolean;

  constructor(private patternService: PatternService, private router: Router) {}

  ngOnInit() {
    this.patternService
      .getPatterns()
      .subscribe((p) => {
        this.patterns = p;
      
        console.log(this.patterns[0].primaryVariation.startStateId);

        if (this.patterns.length > 0){
          this.patternsEmpty = false;
        } else {
          this.patternsEmpty = true;
        }
      });
  }

  deletePattern(patternId: number){
    console.log("Deleting pattern", patternId);

    this.patternService.deletePattern(patternId)
        .subscribe(() => {
          console.log("Ok")

          this.patterns = this.patterns.filter(function(pattern){
            return pattern.getId() != patternId;
          });

          if (this.patterns.length > 0){
            this.patternsEmpty = false;
          } else {
            this.patternsEmpty = true;
          }
        })
  }

  onPlayBtn(variationId: number){
    this.router.navigate(['/play', variationId]);
  }

  editPattern(id: number) {
    this.router.navigate(['/create', id]);
  }
}
