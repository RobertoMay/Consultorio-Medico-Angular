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
  suscription!: Subscription;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(private api: FacturaService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.api.getAll().subscribe(data => {
        this.ob = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.suscription = this.api.refresh$.subscribe(() => {
        this.api.getAll().subscribe(data => {
          this.ob = data;
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

  delete(id: number) {
    this.api.delete(id).subscribe(data => {
      this.showAnswer("Factura borrado con éxito");
    },
      error => {
        let message = "Error: " + error.status + " La factura se encuentra relacionado con otra tabla";
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
