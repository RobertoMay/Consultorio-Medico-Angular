import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorialPagosPostI, FacturaI } from 'src/shared/models';
import { HistorialPagosService } from 'src/shared/services/historial-pagos.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FacturaService } from 'src/shared/services/factura.service';

@Component({
  selector: 'app-editar-historial-pagos',
  templateUrl: './editar-historial-pagos.component.html',
  styleUrls: ['./editar-historial-pagos.component.css']
})
export class EditarHistorialPagosComponent implements OnInit{
  form!: FormGroup | any;
  ob!: HistorialPagosPostI;
  facturas!: FacturaI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: HistorialPagosService,
    private pd: DatePipe,
    private facturaService: FacturaService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let id = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(id).subscribe(data => {
        this.ob = data;
        this.form.setValue({
          ID_HistorialPago: id,
          ID_Factura: this.ob.ID_Factura,
          FechaPago: this.pd.transform(this.ob.FechaPago, "yyyy-MM-dd"),
          Monto: this.ob.Monto,
        })
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.facturaService.getAll().subscribe(data => {
        this.facturas = data;
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })
    } else {
      this.router.navigate(['login'])
    }

  }

  setForm() {
    this.form = this.fb.group({
      ID_HistorialPago: [0],
      ID_Factura: [Number, [Validators.required]],
      FechaPago: [Number, [Validators.required]],
      Monto: ['', [Validators.required]],
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.put(this.form.value).subscribe(data => {
        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['historial-pagos']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['historial-pagos'])
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
