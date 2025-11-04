import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorScheduleComponent } from './tutor-schedule.component';

describe('TutorScheduleComponent', () => {
  let component: TutorScheduleComponent;
  let fixture: ComponentFixture<TutorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
