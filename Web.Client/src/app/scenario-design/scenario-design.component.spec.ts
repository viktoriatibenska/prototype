import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDesignComponent } from './scenario-design.component';

describe('ScenarioDesignComponent', () => {
  let component: ScenarioDesignComponent;
  let fixture: ComponentFixture<ScenarioDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
