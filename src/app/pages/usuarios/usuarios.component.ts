import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/shared/models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  usuarios!: UsuarioI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  idBorrar?: number;
  nombre?: string
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private usuarioService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol != 'super-admin') {
        this.router.navigate(['dashboard']);
      }
      this.usuarioService.getAll().subscribe(data => {
        this.usuarios = data;
        this.filteredCitasList = this.usuarios;

      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.usuarioService.refresh$.subscribe(() => {
        this.usuarioService.getAll().subscribe(data => {
          this.usuarios = data;
          this.filteredCitasList = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-usuario', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-usuario']);
  }

  borrar() {
    this.usuarioService.deletePatient(this.idBorrar!).subscribe(data => {
      this.showAnswer("Usuario borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " Ha ocurrido un error en el servidor";
        this.showAnswerError(message);
      })
  }

  delete(id: number, nombre: string) {
    this.idBorrar = id;
    this.nombre = nombre;    
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.usuarios.filter((cita) =>
        cita.ID_Usuario.toString().includes(this.searchTerm) ||
        cita.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.usuarios; 
    }
  }

  showAnswer(answer: any) {
    this.isSuccess = true;
    this.answer = answer;
    setTimeout(() => { this.isSuccess = false }, 5000)
  }

  showAnswerError(answer: any) {
    this.error = true;
    this.answer = answer;
    setTimeout(() => { this.error = false }, 5000)
  }

  showWarning(answer: string) {
    this.warning = true;
    this.answer = answer;
    setTimeout(() => { this.warning = false }, 5000)
  }

}
