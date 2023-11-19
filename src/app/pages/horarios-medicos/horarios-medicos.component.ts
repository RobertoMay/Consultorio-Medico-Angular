import { Component, OnInit } from '@angular/core';
import { HorariosMedicosService } from 'src/shared/services/horarios-medicos.service';
import { Router } from '@angular/router';
import { HorariosMedicosI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horarios-medicos',
  templateUrl: './horarios-medicos.component.html',
  styleUrls: ['./horarios-medicos.component.css']
})
export class HorariosMedicosComponent implements OnInit{
  citas!: HorariosMedicosI[];
  citasP: HorariosMedicosI[] = [];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  idBorrar?: number;
  nombre?: string;
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private api: HorariosMedicosService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.api.getAll().subscribe(data => {
        this.citas = data;
        this.filteredCitasList = this.citas;
        
        for (let index = 0; index < this.citas.length; index++) {
          if (this.id == this.citas[index].medico.ID_Medico) {
            this.citasP.push(this.citas[index]);
          }
        }
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.citas = data;
          this.filteredCitasList = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-horario-medico', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-horario-medico']);
  }

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Horario borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " El horario se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number, nombre: string) {
    this.idBorrar = id;
    this.nombre = nombre;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.citas.filter((cita) =>
        cita.ID_HorarioMedico.toString().includes(this.searchTerm) ||
        cita.medico.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.citas; 
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
