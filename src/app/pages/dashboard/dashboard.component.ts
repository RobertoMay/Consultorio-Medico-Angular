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
  idBorrar?: number;
  nombre?: string
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private pacientesService: PacientesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.pacientesService.getAllPatients().subscribe(data => {
        this.pacientes = data;
        this.filteredCitasList = this.pacientes;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.pacientesService.refresh$.subscribe(() => {
        this.pacientesService.getAllPatients().subscribe(data => {
          this.pacientes = data;
          this.filteredCitasList = data;
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

  borrar() {
    this.pacientesService.deletePatient(this.idBorrar!).subscribe(data => {
      this.showAnswer("Paciente borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " El paciente se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number, nombre: string) {
    this.idBorrar = id;
    this.nombre = nombre;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.pacientes.filter((cita) =>
        cita.ID_Paciente.toString().includes(this.searchTerm) ||
        cita.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.pacientes; 
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
