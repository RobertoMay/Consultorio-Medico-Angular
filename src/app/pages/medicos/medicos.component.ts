import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/shared/services/medico.service';
import { Router } from '@angular/router';
import { MedicoI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos!: MedicoI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private api: MedicoService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.api.getAll().subscribe(data => {
        this.medicos = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.medicos = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-medico', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-medico']);
  }

  delete(id: number) {
    this.api.delete(id).subscribe(data => {
      this.showAnswer("Médico borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " El médico se encuentra relacionado con otra tabla";
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
