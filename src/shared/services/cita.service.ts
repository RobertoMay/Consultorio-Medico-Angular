import { Injectable } from '@angular/core';
import { CitaI, CitaPostI } from '../models';
import { ResponseI } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  url: string = 'http://localhost:3000/cita/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAll(): Observable<CitaI[]> {
    return this.http.get<CitaI[]>(this.url);
  }

  getId(id: any): Observable<CitaPostI> {
    let direction = this.url + 'citaId/' + id;
    return this.http.get<CitaPostI>(direction)
  }

  put(form: any): Observable<ResponseI> {
    let direction = this.url + 'update';
    return this.http.post<ResponseI>(direction, form);
  }

  delete(id: number): Observable<ResponseI> {
    let direction = this.url + 'delete/' + id;
    return this.http.get<ResponseI>(direction)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  post(form: any): Observable<any> {
    return this.http.post<any>(this.url, form);
  }

}
