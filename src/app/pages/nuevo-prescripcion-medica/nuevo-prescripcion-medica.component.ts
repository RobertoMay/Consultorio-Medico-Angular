import { Component, OnInit } from '@angular/core';
import { PrescripcionMedicaService } from 'src/shared/services/prescripcion-medica.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI, MedicoI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-nuevo-prescripcion-medica',
  templateUrl: './nuevo-prescripcion-medica.component.html',
  styleUrls: ['./nuevo-prescripcion-medica.component.css']
})
export class NuevoPrescripcionMedicaComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  rol!: string;
  id!: number;
  filteredCitasList: any[] = [];
  searchTerm: string = '';
  filteredCitasListM: any[] = [];
  searchTermM: string = '';

  constructor(
    private fb: FormBuilder, 
    private api: PrescripcionMedicaService, 
    private router: Router, 
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
      if (this.rol == 'Paciente') {
        this.router.navigate(['prescripcion-medicas']);
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
    if (this.rol == 'super-admin') {
      this.form = this.fb.group({
        ID_Paciente: ['', [Validators.required]],
        ID_Medico: ['', [Validators.required]],
        Medicamento: ['', [Validators.required]],
        Dosis: ['', [Validators.required]],
        Frecuencia: ['', [Validators.required]],
        FechaEmision: ['', [Validators.required]],
      })
    }else if (this.rol == 'Médico') {
      this.form = this.fb.group({
        ID_Paciente: ['', [Validators.required]],
        ID_Medico: [this.id, [Validators.required]],
        Medicamento: ['', [Validators.required]],
        Dosis: ['', [Validators.required]],
        Frecuencia: ['', [Validators.required]],
        FechaEmision: ['', [Validators.required]],
      })
    }
    
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Prescripción médica creada con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
    }


  }

  volver() {
    this.router.navigate(['prescripcion-medicas'])
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
