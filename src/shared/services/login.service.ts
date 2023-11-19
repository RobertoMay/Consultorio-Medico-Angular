import { Injectable } from '@angular/core';
import { LoginI, ResponseI, UsuarioI, UsuarioPostI } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:3000/usuario/';
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  login(form: LoginI):Observable<ResponseI>{
    let direction = this.url + 'login';
    return this.http.post<ResponseI>(direction, form);
  }

  getAll(): Observable<UsuarioI[]> {
    return this.http.get<UsuarioI[]>(this.url);
  }

  getId(id: any): Observable<UsuarioPostI> {
    let direction = this.url + 'Id/' + id;
    return this.http.get<UsuarioPostI>(direction)
  }

  put(form: any): Observable<any> {
    let direction = this.url + 'update';
    return this.http.post<any>(direction, form);
  }

  putNP(form: any): Observable<any> {
    let direction = this.url + 'updateNP';
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

  post(form: any): Observable<any> {
    let direction = this.url + 'register';
    return this.http.post<any>(direction, form);
  }


}
