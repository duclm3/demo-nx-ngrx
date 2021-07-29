import { areCoursesLoaded } from './store/course.selectors';
import { loadCourses, coursesLoaded } from './store/course.actions';
import { Course } from './model/course.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { AppState } from './store';

@Injectable()
export class CourseResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
          console.log('111', coursesLoaded);
          if (!coursesLoaded) {
            this.store.dispatch(loadCourses());
          }

        }),
        filter(coursesLoaded => coursesLoaded),
        first()
    );
  }
}
