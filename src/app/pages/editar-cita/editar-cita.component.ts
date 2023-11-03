import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaPostI, ListaPacientesI, MedicoI } from 'src/shared/models';
import { CitaService } from 'src/shared/services/cita.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {
  form!: FormGroup | any;
  cita!: CitaPostI;
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CitaService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let citaId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(citaId).subscribe(data => {
        this.cita = data;
        this.form.setValue({
          ID_Cita: citaId,
          ID_Paciente: this.cita.ID_Paciente,
          ID_Medico: this.cita.ID_Medico,
          FechaHoraCita: this.pd.transform(this.cita.FechaHoraCita , "yyyy-MM-ddThh:mm"),
          MotivoCita: this.cita.MotivoCita,
          EstadoCita: this.cita.EstadoCita,
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
      this.medicoService.getAll().subscribe(data => {
        this.medicos = data;
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
      ID_Cita: [0],
      ID_Paciente: [Number, [Validators.required]],
      ID_Medico: [Number, [Validators.required]],
      FechaHoraCita: ['', [Validators.required]],
      MotivoCita: ['', [Validators.required]],
      EstadoCita: ['', [Validators.required]]
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
        setTimeout(() => { this.router.navigate(['citas']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['citas'])
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
