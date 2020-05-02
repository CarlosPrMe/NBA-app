import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultStatsComponent } from './result-stats.component';

describe('ResultStatsComponent', () => {
  let component: ResultStatsComponent;
  let fixture: ComponentFixture<ResultStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
