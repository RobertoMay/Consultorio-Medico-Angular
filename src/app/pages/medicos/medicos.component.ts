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
  idBorrar?: number;
  nombre?: string
  rol!: string;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private api: MedicoService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      if (this.rol == 'Médico') {
        this.router.navigate(['dashboard']);
      }
      this.api.getAll().subscribe(data => {
        this.medicos = data;
        this.filteredCitasList = this.medicos;

      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.medicos = data;
          this.filteredCitasList = data;
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

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Médico borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " El médico se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number, nombre: string) {
    this.idBorrar = id;
    this.nombre = nombre;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.medicos.filter((cita) =>
        cita.ID_Medico.toString().includes(this.searchTerm) ||
        cita.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.medicos; 
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
