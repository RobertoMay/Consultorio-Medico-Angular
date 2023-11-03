import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  form!: FormGroup | any;
  paciente!: PacienteI;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private pacienteService: PacientesService,
    private pd: DatePipe,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let pacienteId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.pacienteService.getPatient(pacienteId).subscribe(data => {
        this.paciente = data;
        let fecha = this.paciente.FechaNacimiento;
        this.form.setValue({
          ID_Paciente: pacienteId,
          Nombre: this.paciente.Nombre,
          Apellido: this.paciente.Apellido,
          FechaNacimiento: this.pd.transform(this.paciente.FechaNacimiento, "yyyy-MM-dd"),
          Genero: this.paciente.Genero,
          Direccion: this.paciente.Direccion,
          Telefono: this.paciente.Telefono,
          CorreoElectronico: this.paciente.CorreoElectronico,
        })
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
      ID_Paciente: [0],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      FechaNacimiento: ['', [Validators.required]],
      Genero: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.pacienteService.putPatient(this.form.value).subscribe(data => {
        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['dashboard']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['pacientes'])
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
