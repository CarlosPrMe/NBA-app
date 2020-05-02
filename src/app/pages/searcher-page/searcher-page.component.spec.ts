import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherPageComponent } from './searcher-page.component';

describe('SearcherPageComponent', () => {
  let component: SearcherPageComponent;
  let fixture: ComponentFixture<SearcherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
