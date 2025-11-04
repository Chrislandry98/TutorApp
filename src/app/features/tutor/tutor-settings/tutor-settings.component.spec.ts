import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsComponent } from './tutor-settings.component';

describe('TutorSettingsComponent', () => {
  let component: TutorSettingsComponent;
  let fixture: ComponentFixture<TutorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
