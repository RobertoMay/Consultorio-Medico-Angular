import { Component, OnInit } from '@angular/core';
import { HorariosMedicosService } from 'src/shared/services/horarios-medicos.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicoI } from 'src/shared/models';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-nuevo-horario-medico',
  templateUrl: './nuevo-horario-medico.component.html',
  styleUrls: ['./nuevo-horario-medico.component.css']
})
export class NuevoHorarioMedicoComponent implements OnInit {
  medicos!: MedicoI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  rol!: string;
  id!: number;
  filteredCitasListM: any[] = [];
  searchTermM: string = '';

  constructor(
    private fb: FormBuilder,
    private api: HorariosMedicosService,
    private router: Router,
    private medicoService: MedicoService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol != 'super-admin') {
        this.router.navigate(['horarios-medicos']);
      }
      this.setForm();
      this.medicoService.getAll().subscribe(data => {
        this.medicos = data;
        this.filteredCitasListM = this.medicos;
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
      ID_Medico: ['', [Validators.required]],
      DiaSemana: ['', [Validators.required]],
      HoraInicio: ['', [Validators.required]],
      HoraFin: ['', [Validators.required]],
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Horario creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
    }


  }

  searchM() {
    if (this.searchTermM) {
      this.filteredCitasListM = this.medicos.filter((cita) =>
        cita.ID_Medico.toString().includes(this.searchTermM) ||
        cita.Nombre.toLowerCase().includes(this.searchTermM.toLowerCase())
      );
    } else {
      this.filteredCitasListM = this.medicos; 
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
