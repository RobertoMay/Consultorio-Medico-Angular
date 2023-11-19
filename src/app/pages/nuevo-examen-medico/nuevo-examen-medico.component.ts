import { Component, OnInit } from '@angular/core';
import { ExamenMedicoService } from 'src/shared/services/examen-medico.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';

@Component({
  selector: 'app-nuevo-examen-medico',
  templateUrl: './nuevo-examen-medico.component.html',
  styleUrls: ['./nuevo-examen-medico.component.css']
})
export class NuevoExamenMedicoComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder, 
    private api: ExamenMedicoService, 
    private router: Router, 
    private pacientesService: PacientesService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol == 'Paciente') {
        this.router.navigate(['examen-medicos']);
      }
      this.setForm();
      this.pacientesService.getAllPatients().subscribe(data => {
        this.pacientes = data;
        this.filteredCitasList = this.pacientes;
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
      TipoExamen: ['', [Validators.required]],
      FechaExamen: ['', [Validators.required]],
      Resultados: ['', [Validators.required]],
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Examen médico creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
    }


  }

  volver() {
    this.router.navigate(['examen-medicos'])
  }

  search() {
    if (this.searchTerm) {
      this.filteredCitasList = this.pacientes.filter((cita) =>
        cita.ID_Paciente.toString().includes(this.searchTerm) ||
        cita.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCitasList = this.pacientes; 
    }
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
