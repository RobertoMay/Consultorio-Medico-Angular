import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/shared/services/cita.service';
import { Router } from '@angular/router';
import { CitaI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas!: CitaI[];
  citasP: CitaI[] = [];
  citasM: CitaI[] = [];
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  idBorrar?: number;
  rol!: string;
  id!: number;
  contador!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(private api: CitaService, private router: Router) { this.contador = 0; }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.api.getAll().subscribe(data => {
        this.citas = data;
        this.filteredCitasList = this.citas;

        for (let index = 0; index < this.citas.length; index++) {
          if (this.id == this.citas[index].paciente.ID_Paciente) {
            this.citasP.push(this.citas[index]);
          }

          if (this.id == this.citas[index].medico.ID_Medico) {
            this.citasM.push(this.citas[index]);
          }
        }

      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.filteredCitasList = data;
          let aux: CitaI[] = [];
          for (let index = 0; index < this.filteredCitasList.length; index++) {
            if (this.id == this.citas[index].medico.ID_Medico) {
              aux.push(this.citas[index]);
            }
          }
          this.citasM = aux;
        })
      })


    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-cita', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-cita']);
  }

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Cita borradoa con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La cita se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })
  }

  delete(id: number) {
    this.idBorrar = id;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.citas.filter((cita) =>
        cita.paciente.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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

  getIncrementedCounter(index: number): number {
    if (index === this.citas.length - 1) {
      this.contador = this.contador + 1;
    }
    return this.contador;
  }

}
