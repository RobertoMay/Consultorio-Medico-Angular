import { Injectable } from '@angular/core';
import { PersonalConsultorioI } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  url: string = 'http://localhost:3000/personal-consultorio/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAllPatients(): Observable<PersonalConsultorioI[]> {
    return this.http.get<PersonalConsultorioI[]>(this.url);
  }

  getPatient(id: any): Observable<PersonalConsultorioI> {
    let direction = this.url + 'Id/' + id;
    return this.http.get<PersonalConsultorioI>(direction)
  }

  putPatient(form: any): Observable<any> {
    let direction = this.url + 'update';
    return this.http.post<any>(direction, form);
  }

  deletePatient(id: number): Observable<any> {
    let direction = this.url + 'delete/' + id;
    return this.http.get<any>(direction)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  postPatient(form: any): Observable<any> {
    return this.http.post<any>(this.url, form);
  }

}
