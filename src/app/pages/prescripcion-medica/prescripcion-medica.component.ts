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
  prescripcionMedicasP: PrescripcionMedicaI[] = [];
  prescripcionMedicasM: PrescripcionMedicaI[] = [];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  idBorrar?: number;
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';
  
  constructor(private api: PrescripcionMedicaService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.api.getAll().subscribe(data => {
        this.prescripcionMedicas = data;
        this.filteredCitasList = this.prescripcionMedicas;

        for (let index = 0; index < this.prescripcionMedicas.length; index++) {
          if (this.id == this.prescripcionMedicas[index].paciente.ID_Paciente) {
            this.prescripcionMedicasP.push(this.prescripcionMedicas[index]);
          }

          if (this.id == this.prescripcionMedicas[index].medico.ID_Medico) {
            this.prescripcionMedicasM.push(this.prescripcionMedicas[index]);
          }
        }
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.prescripcionMedicas = data;
          let aux: PrescripcionMedicaI[] = [];
          for (let index = 0; index < this.prescripcionMedicas.length; index++) {
            if (this.id == this.prescripcionMedicas[index].medico.ID_Medico) {
              aux.push(this.prescripcionMedicas[index]);
            }
          }
          this.prescripcionMedicasM = aux;
          this.filteredCitasList = data;
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

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Prescripción borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La prescripción se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number) {
    this.idBorrar = id;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.prescripcionMedicas.filter((cita) =>
        cita.paciente.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cita.medico.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.prescripcionMedicas;
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
