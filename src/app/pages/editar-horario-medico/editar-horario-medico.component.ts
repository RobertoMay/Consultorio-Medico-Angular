import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HorariosMedicosPostI, MedicoI } from 'src/shared/models';
import { HorariosMedicosService } from 'src/shared/services/horarios-medicos.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-editar-horario-medico',
  templateUrl: './editar-horario-medico.component.html',
  styleUrls: ['./editar-horario-medico.component.css']
})
export class EditarHorarioMedicoComponent implements OnInit{
  form!: FormGroup | any;
  horarioMedico!: HorariosMedicosPostI;
  medicos!: MedicoI[];
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
    private api: HorariosMedicosService,
    private pd: DatePipe,
    private medicoService: MedicoService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let citaId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol != 'super-admin') {
        this.router.navigate(['horarios-medicos']);
      }
      this.api.getId(citaId).subscribe(data => {
        this.horarioMedico = data;
        this.form.setValue({
          ID_HorarioMedico: citaId,
          ID_Medico: this.horarioMedico.ID_Medico,
          DiaSemana: this.horarioMedico.DiaSemana,
          HoraInicio: this.pd.transform(this.horarioMedico.HoraInicio , "HH:mm"),
          HoraFin: this.pd.transform(this.horarioMedico.HoraFin, "HH:mm"),
        })
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
      ID_HorarioMedico: [0],
      ID_Medico: [Number, [Validators.required]],
      DiaSemana: ['', [Validators.required]],
      HoraInicio: ['', [Validators.required]],
      HoraFin: ['', [Validators.required]]
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
        setTimeout(() => { this.router.navigate(['horarios-medicos']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['horarios-medicos'])
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
