import { Component, OnInit } from '@angular/core';
import { HistorialMedicoService } from 'src/shared/services/historial-medico.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';


@Component({
  selector: 'app-nuevo-historial-medico',
  templateUrl: './nuevo-historial-medico.component.html',
  styleUrls: ['./nuevo-historial-medico.component.css']
})
export class NuevoHistorialMedicoComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;

  constructor(
    private fb: FormBuilder, 
    private api: HistorialMedicoService, 
    private router: Router, 
    private pacientesService: PacientesService,
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
    } else {
      this.router.navigate(['login'])
    }
  }


  setForm() {
    this.form = this.fb.group({
      ID_Paciente: ['', [Validators.required]],
      FechaRegistro: ['', [Validators.required]],
      Diagnostico: ['', [Validators.required]],
      Tratamiento: ['', [Validators.required]],
      NotasMedicas: ['', [Validators.required]]
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Historial creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
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
