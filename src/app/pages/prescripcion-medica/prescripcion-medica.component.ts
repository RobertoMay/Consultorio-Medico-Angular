import { Component, OnInit } from '@angular/core';
import { PrescripcionMedicaService } from 'src/shared/services/prescripcion-medica.service';
import { Router } from '@angular/router';
import { PrescripcionMedicaI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prescripcion-medica',
  templateUrl: './prescripcion-medica.component.html',
  styleUrls: ['./prescripcion-medica.component.css']
})
export class PrescripcionMedicaComponent implements OnInit {
  prescripcionMedicas!: PrescripcionMedicaI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private api: PrescripcionMedicaService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.api.getAll().subscribe(data => {
        this.prescripcionMedicas = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.prescripcionMedicas = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-prescripcion-medica', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-prescripcion-medica']);
  }

  delete(id: number) {
    this.api.delete(id).subscribe(data => {
      this.showAnswer("Prescripción borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La prescripción se encuentra relacionado con otra tabla";
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
