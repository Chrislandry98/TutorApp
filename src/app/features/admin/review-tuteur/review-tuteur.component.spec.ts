import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTuteurComponent } from './review-tuteur.component';

describe('ReviewTuteurComponent', () => {
  let component: ReviewTuteurComponent;
  let fixture: ComponentFixture<ReviewTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
