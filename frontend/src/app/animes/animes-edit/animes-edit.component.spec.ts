import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesEditComponent } from './animes-edit.component';

describe('AnimesEditComponent', () => {
  let component: AnimesEditComponent;
  let fixture: ComponentFixture<AnimesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
