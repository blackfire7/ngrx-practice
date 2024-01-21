import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {map} from 'rxjs/operators';
import {CourseEntityService} from "../services/course-entity.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private dialog: MatDialog,
    private coursesService: CourseEntityService) {

  }

  ngOnInit() {
    this.reload();
  }

  reload() {

    this.beginnerCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );


    this.advancedCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.promo).length)
      );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


  /**
   * WITH @ngrx/entity
   * */

  //   promoTotal$: Observable<number>;
  //
  //   beginnerCourses$: Observable<Course[]>;
  //
  //   advancedCourses$: Observable<Course[]>;
  //
  //
  //   constructor(
  //     private dialog: MatDialog,private store: Store<AppState>) {
  //
  //   }
  //
  //   ngOnInit() {
  //     this.reload();
  //   }
  //
  // reload() {
  //
  //   this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
  //   this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
  //   this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  //
  // }
  //
  // onAddCourse() {
  //
  //   const dialogConfig = defaultDialogConfig();
  //
  //   dialogConfig.data = {
  //     dialogTitle:"Create Course",
  //     mode: 'create'
  //   };
  //
  //   this.dialog.open(EditCourseDialogComponent, dialogConfig);
  //
  // }


}
