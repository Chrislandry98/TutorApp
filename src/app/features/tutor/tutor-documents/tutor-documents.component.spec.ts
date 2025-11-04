import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDocumentsComponent } from './tutor-documents.component';

describe('TutorDocumentsComponent', () => {
  let component: TutorDocumentsComponent;
  let fixture: ComponentFixture<TutorDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
