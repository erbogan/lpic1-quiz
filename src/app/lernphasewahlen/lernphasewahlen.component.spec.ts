import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LernphasewahlenComponent } from './lernphasewahlen.component';

describe('LernphasewahlenComponent', () => {
  let component: LernphasewahlenComponent;
  let fixture: ComponentFixture<LernphasewahlenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LernphasewahlenComponent]
    });
    fixture = TestBed.createComponent(LernphasewahlenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
