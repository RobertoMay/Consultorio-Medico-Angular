import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicoI } from 'src/shared/models';
import { MedicoService } from 'src/shared/services/medico.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css']
})
export class EditarMedicoComponent implements OnInit {
  form!: FormGroup | any;
  medico!: MedicoI;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  rol!: string;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: MedicoService,
    private pd: DatePipe,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      if (this.rol != 'super-admin') {
        this.router.navigate(['medicos']);
      }
      let medicoId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(medicoId).subscribe(data => {
        this.medico = data;
        this.form.setValue({
          ID_Medico: medicoId,
          Nombre: this.medico.Nombre,
          Apellido: this.medico.Apellido,
          Especialidad: this.medico.Especialidad,
          Telefono: this.medico.Telefono,
          CorreoElectronico: this.medico.CorreoElectronico,
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
      ID_Medico: [0],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Especialidad: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
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
        setTimeout(() => { this.router.navigate(['medicos']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['medicos'])
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
