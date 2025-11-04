import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAboutusComponent } from './section-aboutus.component';

describe('SectionAboutusComponent', () => {
  let component: SectionAboutusComponent;
  let fixture: ComponentFixture<SectionAboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAboutusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
