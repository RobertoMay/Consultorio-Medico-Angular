import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/shared/services/cita.service';
import { Router } from '@angular/router';
import { CitaI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas!: CitaI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private api: CitaService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.api.getAll().subscribe(data => {
        this.citas = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.citas = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-cita', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-cita']);
  }

  delete(id: number) {
    this.api.delete(id).subscribe(data => {
      this.showAnswer("Cita borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La cita se encuentra relacionado con otra tabla";
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
