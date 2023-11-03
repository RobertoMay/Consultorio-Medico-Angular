import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrescripcionMedicaPostI, ListaPacientesI, MedicoI } from 'src/shared/models';
import { PrescripcionMedicaService } from 'src/shared/services/prescripcion-medica.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-editar-prescripcion-medica',
  templateUrl: './editar-prescripcion-medica.component.html',
  styleUrls: ['./editar-prescripcion-medica.component.css']
})
export class EditarPrescripcionMedicaComponent implements OnInit {
  form!: FormGroup | any;
  prescripcionMedica!: PrescripcionMedicaPostI;
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
    private api: PrescripcionMedicaService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let id = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.api.getId(id).subscribe(data => {
        this.prescripcionMedica = data;
        this.form.setValue({
          ID_Prescripcion: id,
          ID_Paciente: this.prescripcionMedica.ID_Paciente,
          ID_Medico: this.prescripcionMedica.ID_Medico,
          Medicamento: this.prescripcionMedica.Medicamento,
          Dosis: this.prescripcionMedica.Dosis,
          Frecuencia: this.prescripcionMedica.Frecuencia,
          FechaEmision: this.pd.transform(this.prescripcionMedica.FechaEmision , "yyyy-MM-dd"),
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
      ID_Prescripcion: [0],
      ID_Paciente: [Number, [Validators.required]],
      ID_Medico: [Number, [Validators.required]],
      Medicamento: ['', [Validators.required]],
      Dosis: ['', [Validators.required]],
      Frecuencia: ['', [Validators.required]],
      FechaEmision: ['', [Validators.required]]
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      console.log(this.form.value);
      
      this.api.put(this.form.value).subscribe(data => {
        this.showAnswer("Datos actualizados con éxito");
        setTimeout(() => { this.router.navigate(['prescripcion-medicas']) }, 1000)
      },
        error => {
          console.log(error);
          
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
    }
  }

  volver() {
    this.router.navigate(['prescripcion-medicas'])
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
