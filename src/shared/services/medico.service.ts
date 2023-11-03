import { Injectable } from '@angular/core';
import { MedicoI } from '../models';
import { ResponseI } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url: string = 'http://localhost:3000/medico/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAll(): Observable<MedicoI[]> {
    return this.http.get<MedicoI[]>(this.url);
  }

  getId(id: any): Observable<MedicoI> {
    let direction = this.url + 'medicoId/' + id;
    return this.http.get<MedicoI>(direction)
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
