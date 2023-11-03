import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/shared/services/cita.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI, MedicoI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-nuevo-cita',
  templateUrl: './nuevo-cita.component.html',
  styleUrls: ['./nuevo-cita.component.css']
})
export class NuevoCitaComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;

  constructor(
    private fb: FormBuilder, 
    private api: CitaService, 
    private router: Router, 
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.setForm();
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
      ID_Paciente: ['', [Validators.required]],
      ID_Medico: ['', [Validators.required]],
      FechaHoraCita: ['', [Validators.required]],
      MotivoCita: ['', [Validators.required]],
      EstadoCita: ['', [Validators.required]]
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Cita creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
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
