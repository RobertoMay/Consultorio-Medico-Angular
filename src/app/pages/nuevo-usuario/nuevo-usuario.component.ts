import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI, MedicoI } from 'src/shared/models';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;
  visible: boolean = true;
  changetype: boolean = true;
  filteredCitasList: any[] = [];
  searchTerm: string = '';
  filteredCitasListM: any[] = [];
  searchTermM: string = '';

  constructor(
    private fb: FormBuilder, 
    private usuarioService: LoginService, 
    private router: Router, 
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
    ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
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
    this.form = this.fb.group({
      // CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // Nombre: ['', [Validators.required]],
      Contraseña: ['', [Validators.required]],
      Rol: ['', [Validators.required]],
      ID_Paciente: [null],
      ID_Medico: [null],
    })
  }

  create() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      this.usuarioService.post(this.form.value).subscribe(data => {
        this.showAnswer("Usuario creado con éxito");
      },
        error => {
          let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
          this.showAnswerError(message);
          console.log(error);
          
        })
    }

  }

  volver() {
    this.router.navigate(['usuarios'])
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

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
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
