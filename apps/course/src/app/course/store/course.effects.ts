import { courseActionTypes, coursesLoaded, updateCourse } from './course.actions';
import { CourseService } from './../services/course.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CourseEffects {

  //load course
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.loadCourses),//chuyền vào acion
      concatMap(() => this.courseService.getAllCourses()),// gọi api
      map(courses => courseActionTypes.coursesLoaded({courses}))// trả về một action kèm theo dữ liệu 
      // đầu vào của action đó 
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.createCourse),
      concatMap((action) => this.courseService.createCourse(action.course)),
      tap(() => this.router.navigateByUrl('/courses'))
    ),
    {dispatch: false}
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.deleteCourse),
      concatMap((action) => this.courseService.deleteCourse(action.courseId))
    ),
    {dispatch: false}
  );

  updateCOurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => this.courseService.updateCourse(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(private courseService: CourseService, private actions$: Actions, private router: Router) {}
}
