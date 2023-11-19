import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/shared/services/login.service';
import { LoginI, ResponseI } from 'src/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error?: boolean;
  answer?: string;
  warning?: boolean;
  isSuccess?: boolean;
  form: FormGroup | any;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { this.setForm() }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
    }
  }

  setForm() {
    this.form = this.fb.group({
      CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Contraseña: ['', [Validators.required]]
    })
  }

  onLogin(form: LoginI) {
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.showWarning('Ingresa datos validos');
    } else {
      this.loginService.login(form).subscribe(data => {
        let dataResponse: ResponseI = data;
        localStorage.setItem("token", dataResponse.data.token);
        localStorage.setItem("rol", dataResponse.data.usuario.Rol);
        let rol = dataResponse.data.usuario.Rol;
        if (rol == 'Paciente') {
          localStorage.setItem("id", dataResponse.data.usuario.paciente.ID_Paciente);
        }else if (rol == 'Médico') {
          localStorage.setItem("id", dataResponse.data.usuario.medico.ID_Medico);
        }

        this.router.navigate(['dashboard']);
      },
        error => {
          switch (error.error.response) {
            case 'USER_NOT_FOUND': {
              this.showAnswerError("Error: El usuario no existe");
              break;
            }
            case 'PASSWORD_INCORRECT': {
              this.showAnswerError("Error: La contraseña es incorrecta");
              break;
            }
            default: {
              let message = "Error: " + error.status + " Ha ocurrio un error en el servidor al enviar los datos";
              this.showAnswerError(message);
            }
          }
        });

    }

  }

  showAnswer(answer: any) {
    this.isSuccess = true;
    this.answer = answer;
    setTimeout(() => { this.isSuccess = false }, 2500)
  }

  showAnswerError(answer: any) {
    this.error = true;
    this.answer = answer;
    setTimeout(() => { this.error = false }, 2500)
  }

  showWarning(answer: string) {
    this.warning = true;
    this.answer = answer;
    setTimeout(() => { this.warning = false }, 2500)
  }

}
