import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/shared/services/personal.service';
import { Router } from '@angular/router';
import { PersonalConsultorioI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit{
  personal!: PersonalConsultorioI[];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private personalService: PersonalService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.personalService.getAllPatients().subscribe(data => {
        this.personal = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.personalService.refresh$.subscribe(() => {
        this.personalService.getAllPatients().subscribe(data => {
          this.personal = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-personal', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-personal']);
  }

  delete(id: number) {
    this.personalService.deletePatient(id).subscribe(data => {
      this.showAnswer("Personal de consultorio borrado con éxito");
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
