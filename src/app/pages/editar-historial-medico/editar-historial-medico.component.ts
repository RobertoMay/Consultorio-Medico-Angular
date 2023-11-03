import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorialMedicoPostI, ListaPacientesI } from 'src/shared/models';
import { HistorialMedicoService } from 'src/shared/services/historial-medico.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';

@Component({
  selector: 'app-editar-historial-medico',
  templateUrl: './editar-historial-medico.component.html',
  styleUrls: ['./editar-historial-medico.component.css']
})
export class EditarHistorialMedicoComponent implements OnInit {
  form!: FormGroup | any;
  historial!: HistorialMedicoPostI;
  pacientes!: ListaPacientesI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: HistorialMedicoService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let historialId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(historialId).subscribe(data => {
        this.historial = data;
        this.form.setValue({
          ID_Historial: historialId,
          ID_Paciente: this.historial.ID_Paciente,
          FechaRegistro: this.pd.transform(this.historial.FechaRegistro , "yyyy-MM-dd"),
          Diagnostico: this.historial.Diagnostico,
          Tratamiento: this.historial.Tratamiento,
          NotasMedicas: this.historial.NotasMedicas,
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
      ID_Historial: [0],
      ID_Paciente: [Number, [Validators.required]],
      FechaRegistro: [Number, [Validators.required]],
      Diagnostico: ['', [Validators.required]],
      Tratamiento: ['', [Validators.required]],
      NotasMedicas: ['', [Validators.required]]
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.put(this.form.value).subscribe(data => {
        console.log(data);

        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['historial-medicos']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['historial-medicos'])
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
