import { Component } from '@angular/core';
import { HomeheaderComponent } from './homeheader/homeheader.component';
import { SectionAboutusComponent } from './section-aboutus/section-aboutus.component';
import { SectionStudentComponent } from './section-student/section-student.component';
import { SectionSubjectComponent } from './section-subject/section-subject.component';
import { SectionTutorsComponent } from './section-tutors/section-tutors.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeheaderComponent, SectionAboutusComponent, SectionStudentComponent, SectionSubjectComponent, SectionTutorsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
