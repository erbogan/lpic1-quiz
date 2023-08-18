import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnphaseComponent } from './learnphase.component';

describe('LearnphaseComponent', () => {
  let component: LearnphaseComponent;
  let fixture: ComponentFixture<LearnphaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnphaseComponent]
    });
    fixture = TestBed.createComponent(LearnphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
