import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorValidationComponent } from './tutor-validation.component';

describe('TutorValidationComponent', () => {
  let component: TutorValidationComponent;
  let fixture: ComponentFixture<TutorValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
