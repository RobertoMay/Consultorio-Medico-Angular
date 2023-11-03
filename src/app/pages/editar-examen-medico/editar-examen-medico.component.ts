import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenMedicoPostI, ListaPacientesI } from 'src/shared/models';
import { ExamenMedicoService } from 'src/shared/services/examen-medico.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';

@Component({
  selector: 'app-editar-examen-medico',
  templateUrl: './editar-examen-medico.component.html',
  styleUrls: ['./editar-examen-medico.component.css']
})
export class EditarExamenMedicoComponent implements OnInit{
  form!: FormGroup | any;
  ob!: ExamenMedicoPostI;
  pacientes!: ListaPacientesI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: ExamenMedicoService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let id = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(id).subscribe(data => {
        this.ob = data;
        this.form.setValue({
          ID_Examen: id,
          ID_Paciente: this.ob.ID_Paciente,
          TipoExamen: this.ob.TipoExamen,
          FechaExamen: this.pd.transform(this.ob.FechaExamen, "yyyy-MM-dd"),
          Resultados: this.ob.Resultados,
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
      ID_Examen: [0],
      ID_Paciente: [Number, [Validators.required]],
      TipoExamen: [Number, [Validators.required]],
      FechaExamen: ['', [Validators.required]],
      Resultados: ['', [Validators.required]],
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
        setTimeout(() => { this.router.navigate(['examen-medicos']) }, 1000)
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['examen-medicos'])
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
