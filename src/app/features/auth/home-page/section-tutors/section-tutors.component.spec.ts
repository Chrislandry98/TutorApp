import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTutorsComponent } from './section-tutors.component';

describe('SectionTutorsComponent', () => {
  let component: SectionTutorsComponent;
  let fixture: ComponentFixture<SectionTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTutorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
