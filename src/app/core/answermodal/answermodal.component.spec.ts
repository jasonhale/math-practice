import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswermodalComponent } from './answermodal.component';

describe('AnswermodalComponent', () => {
  let component: AnswermodalComponent;
  let fixture: ComponentFixture<AnswermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswermodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
