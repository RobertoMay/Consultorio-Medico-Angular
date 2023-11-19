import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/shared/services/factura.service';
import { Router } from '@angular/router';
import { FacturaI } from 'src/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit{
  ob!: FacturaI[];
  obP: FacturaI[] = [];
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

  constructor(private api: FacturaService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      this.api.getAll().subscribe(data => {
        this.ob = data;
        this.filteredCitasList = this.ob;

        for (let index = 0; index < this.ob.length; index++) {
          if (this.id == this.ob[index].paciente.ID_Paciente) {
            this.obP.push(this.ob[index]);
          }
        }
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.ob = data;
          this.filteredCitasList = data;
        })
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  editPatient(id: number) {
    this.router.navigate(['editar-factura', id]);
  }

  newPatient() {
    this.router.navigate(['nuevo-factura']);
  }

  borrar() {
    this.api.delete(this.idBorrar!).subscribe(data => {
      this.showAnswer("Factura borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La factura se encuentra relacionado con otra tabla";
        this.showAnswerError(message);
      })

  }

  delete(id: number) {
    this.idBorrar = id;
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.ob.filter((cita) =>
        cita.paciente.ID_Paciente.toString().includes(this.searchTerm) ||
        cita.paciente.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.ob; 
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
