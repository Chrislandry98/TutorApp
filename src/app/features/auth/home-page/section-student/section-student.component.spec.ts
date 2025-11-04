import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStudentComponent } from './section-student.component';

describe('SectionStudentComponent', () => {
  let component: SectionStudentComponent;
  let fixture: ComponentFixture<SectionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
