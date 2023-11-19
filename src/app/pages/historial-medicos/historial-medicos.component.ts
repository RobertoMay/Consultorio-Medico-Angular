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
  historialMedicoP: HistorialMedicoI[] = [];
  historialMedicoM: HistorialMedicoI[] = [];
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

  constructor(private api: HistorialMedicoService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.api.getAll().subscribe(data => {
        this.historialMedico = data;
        console.log(this.historialMedico);
        
        for (let index = 0; index < this.historialMedico.length; index++) {
          if (this.id == this.historialMedico[index].paciente.ID_Paciente) {
            this.historialMedicoP.push(this.historialMedico[index]);
          }
        }
        this.filteredCitasList = this.historialMedico;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.historialMedico = data;
          this.filteredCitasList = data;
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

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Historial borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " Historial se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number) {
    this.idBorrar = id;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.historialMedico.filter((cita) =>
        cita.paciente.ID_Paciente.toString().includes(this.searchTerm) ||
        cita.paciente.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.historialMedico; // Restauramos la lista completa si el término de búsqueda está vacío
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
