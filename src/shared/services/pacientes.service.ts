import { Injectable } from '@angular/core';
import { ListaPacientesI } from '../models';
import { PacienteI } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  url: string = 'http://localhost:3000/paciente/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getAllPatients(): Observable<ListaPacientesI[]> {
    return this.http.get<ListaPacientesI[]>(this.url);
  }

  getPatient(id: any): Observable<PacienteI> {
    let direction = this.url + 'pacienteId/' + id;
    return this.http.get<PacienteI>(direction)
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
