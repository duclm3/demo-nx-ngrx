import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './store/course.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { CourseService } from './services/course.service';



@NgModule({
  declarations: [
    CoursesListComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('courses1', courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ],
  providers: [CourseService],
  bootstrap: [],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }
