import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {Course} from "../model/course";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpOptions} from "@ngrx/data/src/dataservices/interfaces";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(private httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', httpClient, httpUrlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.httpClient.get('/api/courses').pipe(
        map(response => response['payload'])
      );
  }
}
