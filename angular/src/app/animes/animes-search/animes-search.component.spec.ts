import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesSearchComponent } from './animes-search.component';

describe('AnimesSearchComponent', () => {
  let component: AnimesSearchComponent;
  let fixture: ComponentFixture<AnimesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
