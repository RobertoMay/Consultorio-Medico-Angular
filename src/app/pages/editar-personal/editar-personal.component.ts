import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalConsultorioI } from 'src/shared/models';
import { PersonalService } from 'src/shared/services/personal.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.component.html',
  styleUrls: ['./editar-personal.component.css']
})
export class EditarPersonalComponent implements OnInit{
  form!: FormGroup | any;
  personal!: PersonalConsultorioI;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private personalService: PersonalService,
    private pd: DatePipe,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let pacienteId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.personalService.getPatient(pacienteId).subscribe(data => {
        this.personal = data;
        this.form.setValue({
          ID_Personal: pacienteId,
          Nombre: this.personal.Nombre,
          Apellido: this.personal.Apellido,
          Cargo: this.personal.Cargo,
          Telefono: this.personal.Telefono,
          CorreoElectronico: this.personal.CorreoElectronico,
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
      ID_Personal: [0],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Cargo: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.personalService.putPatient(this.form.value).subscribe(data => {
        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['personal']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['personal'])
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
