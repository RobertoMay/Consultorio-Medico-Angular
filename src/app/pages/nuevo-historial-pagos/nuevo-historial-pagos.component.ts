import { Component, OnInit } from '@angular/core';
import { HistorialPagosService } from 'src/shared/services/historial-pagos.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaI } from 'src/shared/models';
import { FacturaService } from 'src/shared/services/factura.service';

@Component({
  selector: 'app-nuevo-historial-pagos',
  templateUrl: './nuevo-historial-pagos.component.html',
  styleUrls: ['./nuevo-historial-pagos.component.css']
})
export class NuevoHistorialPagosComponent implements OnInit{
  facturas!: FacturaI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder, 
    private api: HistorialPagosService, 
    private router: Router, 
    private facturaService: FacturaService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.setForm();
      this.facturaService.getAll().subscribe(data => {
        this.facturas = data;
        this.filteredCitasList = data;
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
      ID_Factura: ['', [Validators.required]],
      FechaPago: ['', [Validators.required]],
      Monto: ['', [Validators.required]],
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Factura creada con éxito");
      },
        error => {
          console.log(error);
          
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
    }


  }

  volver() {
    this.router.navigate(['historial-pagos'])
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.facturas.filter((cita) =>
        cita.ID_Factura.toString().includes(this.searchTerm) ||
        cita.paciente.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.facturas; 
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
