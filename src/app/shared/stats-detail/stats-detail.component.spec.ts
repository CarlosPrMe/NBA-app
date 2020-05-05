import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsDetailComponent } from './stats-detail.component';

describe('StatsDetailComponent', () => {
  let component: StatsDetailComponent;
  let fixture: ComponentFixture<StatsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
