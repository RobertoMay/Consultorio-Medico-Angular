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
  idBorrar?: number;
  nombre?: string;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private personalService: PersonalService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.personalService.getAllPatients().subscribe(data => {
        this.personal = data;
        this.filteredCitasList = this.personal;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.personalService.refresh$.subscribe(() => {
        this.personalService.getAllPatients().subscribe(data => {
          this.personal = data;
          this.filteredCitasList = data;
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

  borrar() {
    this.personalService.deletePatient(this.idBorrar!).subscribe(data => {
      this.showAnswer("Personal de consultorio borrado con éxito");
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
      this.filteredCitasList = this.personal.filter((cita) =>
        cita.ID_Personal.toString().includes(this.searchTerm) ||
        cita.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.personal; 
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
