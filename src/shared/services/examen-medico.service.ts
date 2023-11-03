import { Injectable } from '@angular/core';
import { ExamenMedicoI, ExamenMedicoPostI } from '../models';
import { ResponseI } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamenMedicoService {
  url: string = 'http://localhost:3000/examen-medico/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAll(): Observable<ExamenMedicoI[]> {
    return this.http.get<ExamenMedicoI[]>(this.url);
  }

  getId(id: any): Observable<ExamenMedicoPostI> {
    let direction = this.url + 'Id/' + id;
    return this.http.get<ExamenMedicoPostI>(direction)
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
