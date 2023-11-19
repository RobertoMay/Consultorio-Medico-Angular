import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaPostI, ListaPacientesI } from 'src/shared/models';
import { FacturaService } from 'src/shared/services/factura.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styleUrls: ['./editar-factura.component.css']
})
export class EditarFacturaComponent implements OnInit{
  form!: FormGroup | any;
  ob!: FacturaPostI;
  pacientes!: ListaPacientesI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  rol!: string;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: FacturaService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol == 'Paciente') {
        this.router.navigate(['facturas']);
      }
      let id = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(id).subscribe(data => {
        this.ob = data;
        this.form.setValue({
          ID_Factura: id,
          ID_Paciente: this.ob.ID_Paciente,
          FechaFacturacion: this.pd.transform(this.ob.FechaFacturacion, "yyyy-MM-dd"),
          Total: this.ob.Total,
          EstadoPago: this.ob.EstadoPago,
        })
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al cargar los datos";
          this.showAnswerError(message);
        })

      this.pacientesService.getAllPatients().subscribe(data => {
        this.pacientes = data;
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
      ID_Factura: [0],
      ID_Paciente: [Number, [Validators.required]],
      FechaFacturacion: [Number, [Validators.required]],
      Total: ['', [Validators.required]],
      EstadoPago: ['', [Validators.required]],
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.put(this.form.value).subscribe(data => {
        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['facturas']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['facturas'])
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
