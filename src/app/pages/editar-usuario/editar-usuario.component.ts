import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPacientesI, MedicoI, UsuarioI, UsuarioPostI } from 'src/shared/models';
import { LoginService } from 'src/shared/services/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PacientesService } from 'src/shared/services/pacientes.service';
import { MedicoService } from 'src/shared/services/medico.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  pacientes!: ListaPacientesI[];
  medicos!: MedicoI[];
  form!: FormGroup | any;
  usuario!: UsuarioPostI;
  userData?: any;
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  visible: boolean = true;
  changetype: boolean = true;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private usuarioService: LoginService,
    private pd: DatePipe,
    private pacientesService: PacientesService,
    private medicoService: MedicoService,
  ) { this.setForm() }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let pacienteId = Number(this.activeRouter.snapshot.paramMap.get('id'));
      this.id = pacienteId;
      this.usuarioService.getId(pacienteId).subscribe(data => {
        this.usuario = data;
        this.form.setValue({
          ID_Usuario: pacienteId,
          CorreoElectronico: this.usuario.CorreoElectronico,
          Nombre: this.usuario.Nombre,
          Contraseña: '',
          Rol: this.usuario.Rol,
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
      ID_Usuario: [0],
      CorreoElectronico: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Contraseña: [''],
      Rol: ['', [Validators.required]],
    })
  }

  update() {

    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa los datos como se indica');
    } else {
      if (this.form.get('Contraseña').value) {
        this.usuarioService.putNP(this.form.value).subscribe(data => {
          this.showAnswer("Datos actualizados con éxito");
          setTimeout(() => { this.router.navigate(['usuarios']) }, 1000)
        },
          error => {
            let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
            this.showAnswerError(message);
          })
      } else {
        this.userData = {
          ID_Usuario: this.usuario.ID_Usuario,
          CorreoElectronico:this.form.get('CorreoElectronico').value,
          Nombre: this.form.get('Nombre').value,
          Rol: this.form.get('Rol').value,
        }
        
        this.usuarioService.putNP(this.userData).subscribe(data => {
          this.showAnswer("Datos actualizados con éxito");
          setTimeout(() => { this.router.navigate(['usuarios']) }, 1000)
        },
          error => {
            let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
            this.showAnswerError(message);
            console.log(error);
          })
      }

    }
  }

  volver() {
    this.router.navigate(['usuarios'])
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