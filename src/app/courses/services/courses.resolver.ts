import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {filter, first, tap} from "rxjs/operators";
import {CourseEntityService} from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  loading = false;

  constructor(private coursesService: CourseEntityService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.coursesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) this.coursesService.getAll();
      }),
      filter(loaded => !!loaded),
      first()
    );
  }


  /**
   * WITH @ngrx/entity
   * */

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  //   return this.store.pipe(
  //     select(areCoursesLoaded),
  //     tap(coursesLoaded => {
  //       if (!this.loading && !coursesLoaded) {
  //         this.loading = true;
  //         this.store.dispatch(loadAllCourses());
  //       }
  //     }),
  //     filter(courseLoader => courseLoader),
  //     first(),
  //     finalize(() => this.loading = false)
  //   );
  // }

}
