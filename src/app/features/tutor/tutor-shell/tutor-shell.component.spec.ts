import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorShellComponent } from './tutor-shell.component';

describe('TutorShellComponent', () => {
  let component: TutorShellComponent;
  let fixture: ComponentFixture<TutorShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
