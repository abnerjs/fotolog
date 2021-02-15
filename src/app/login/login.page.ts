import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;
  constructor(private authentication: AuthenticationService, private toastController: ToastController, private formBuilder: FormBuilder
    , private router: Router) {
   // this.login();
    this.form = this.formBuilder.group({

      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  async login() {
    if (this.form.valid) {
      const usuario = {
        login: this.form.value.login,
        senha: this.form.value.senha,
      };
      const retorno = await this.authentication.login(usuario);
      console.log(retorno);

      if (retorno) {
        console.log('Login OK');
        this.router.navigate(["/home"]);
      } else {
        console.log('Login failed.');
        this.apresentarMensagem("Usuario e senha não estão corretos!");
      }
    } else {
     
      this.apresentarMensagem("Preencha o login e a senha corretamente!");
    }
  }
  async apresentarMensagem(mensagem: string) {

    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1000
    });
    toast.present();

  }
}