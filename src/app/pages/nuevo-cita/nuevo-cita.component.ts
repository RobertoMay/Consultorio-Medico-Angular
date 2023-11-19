import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/shared/services/cita.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HorariosMedicosI, ListaPacientesI, MedicoI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';
import { HorariosMedicosService } from 'src/shared/services/horarios-medicos.service';

@Component({
  selector: 'app-nuevo-cita',
  templateUrl: './nuevo-cita.component.html',
  styleUrls: ['./nuevo-cita.component.css']
})
export class NuevoCitaComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  horarios!: HorariosMedicosI[];
  horariosP: HorariosMedicosI[] = [];
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
    private api: CitaService, 
    private router: Router, 
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
    private horariosService: HorariosMedicosService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rol = localStorage.getItem('rol')!;
      this.id = Number(localStorage.getItem('id'))!;
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
        this.horariosService.getAll().subscribe(data => {
          this.horarios = data;

          for (let index = 0; index < this.horarios.length; index++) {
            if (this.id == this.horarios[index].medico.ID_Medico) {
              this.horariosP.push(this.horarios[index]);
            }
          }
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
    if (this.rol == 'Paciente') {
      this.form = this.fb.group({
        ID_Paciente: [this.id],
        ID_Medico: ['', [Validators.required]],
        FechaHoraCita: ['', [Validators.required]],
        MotivoCita: ['', [Validators.required]],
        EstadoCita: ['', [Validators.required]]
      })
    } else if (this.rol == 'Médico') {
      this.form = this.fb.group({
        ID_Paciente: ['', [Validators.required]],
        ID_Medico: [this.id],
        FechaHoraCita: ['', [Validators.required]],
        MotivoCita: ['', [Validators.required]],
        EstadoCita: ['', [Validators.required]]
      })
    }else{
      this.form = this.fb.group({
        ID_Paciente: ['', [Validators.required]],
        ID_Medico: ['', [Validators.required]],
        FechaHoraCita: ['', [Validators.required]],
        MotivoCita: ['', [Validators.required]],
        EstadoCita: ['', [Validators.required]]
      })
    }
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
      console.log(this.form.value);
      
    } else {
      this.api.post(this.form.value).subscribe(data => {
        this.showAnswer("Cita creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
        })
      this.setForm();
    }


  }

  volver() {
    this.router.navigate(['citas'])
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
