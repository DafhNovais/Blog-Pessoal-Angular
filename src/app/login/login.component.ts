import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.token = this.userLogin.token

      console.log(environment.id)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.token)

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500) {
        this.alerta.showAlertWarning('Usuário ou senha incerretos!')
      }
    })
  }

}
