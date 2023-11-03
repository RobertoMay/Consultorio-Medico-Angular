import { Component, OnInit } from '@angular/core';
import { HistorialMedicoService } from 'src/shared/services/historial-medico.service';
import { Router } from '@angular/router';
import { HistorialMedicoI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial-medicos',
  templateUrl: './historial-medicos.component.html',
  styleUrls: ['./historial-medicos.component.css']
})
export class HistorialMedicosComponent implements OnInit {
  historialMedico!: HistorialMedicoI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private api: HistorialMedicoService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.api.getAll().subscribe(data => {
        this.historialMedico = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.historialMedico = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-historial-medico', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-historial-medico']);
  }

  delete(id: number) {
    this.api.delete(id).subscribe(data => {
      this.showAnswer("Historial borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " Historial se encuentra relacionado con otra tabla";
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
