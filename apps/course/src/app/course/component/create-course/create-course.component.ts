import { Course } from './../../model/course.model';
import { createCourse } from './../../store/course.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { AppState } from '../../store';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm :any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const course: Course = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.store.dispatch(createCourse({course}));

  }
}
