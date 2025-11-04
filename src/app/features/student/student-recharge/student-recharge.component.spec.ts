import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRechargeComponent } from './student-recharge.component';

describe('StudentRechargeComponent', () => {
  let component: StudentRechargeComponent;
  let fixture: ComponentFixture<StudentRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
