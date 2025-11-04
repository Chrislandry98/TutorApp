import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorEarningsComponent } from './tutor-earnings.component';

describe('TutorEarningsComponent', () => {
  let component: TutorEarningsComponent;
  let fixture: ComponentFixture<TutorEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorEarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
