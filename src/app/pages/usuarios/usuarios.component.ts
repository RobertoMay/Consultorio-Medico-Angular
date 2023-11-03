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

  constructor(private usuarioService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.usuarioService.getAll().subscribe(data => {
        this.usuarios = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.usuarioService.refresh$.subscribe(() => {
        this.usuarioService.getAll().subscribe(data => {
          this.usuarios = data;
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

  delete(id: number) {
    this.usuarioService.deletePatient(id).subscribe(data => {
      this.showAnswer("Usuario borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " Ha ocurrido un error en el servidor";
        this.showAnswerError(message);
      })

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
