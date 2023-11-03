import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { Router } from '@angular/router';
import { ListaPacientesI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private pacientesService: PacientesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.pacientesService.getAllPatients().subscribe(data => {
        this.pacientes = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.pacientesService.refresh$.subscribe(() => {
        this.pacientesService.getAllPatients().subscribe(data => {
          this.pacientes = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo']);
  }

  delete(id: number) {
    this.pacientesService.deletePatient(id).subscribe(data => {
      this.showAnswer("Paciente borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " El paciente se encuentra relacionado con otra tabla";
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
