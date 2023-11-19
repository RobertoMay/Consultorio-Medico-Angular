import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/shared/services/medico.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-medico',
  templateUrl: './nuevo-medico.component.html',
  styleUrls: ['./nuevo-medico.component.css']
})
export class NuevoMedicoComponent implements OnInit {
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  rol!: string;

  constructor(private fb: FormBuilder, private api: MedicoService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      if (this.rol != 'super-admin') {
        this.router.navigate(['medicos']);
      }
      this.setForm();
    } else {
      this.router.navigate(['login'])
    }
  }


  setForm() {
    this.form = this.fb.group({
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Especialidad: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Médico creado con éxito");
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
