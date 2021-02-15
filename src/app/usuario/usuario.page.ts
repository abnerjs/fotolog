import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private toastController:ToastController,
    private router: Router
    ) { 
      this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.required),
        login: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
        tipo : new FormControl('', Validators.required),
      });
    }
 
  ngOnInit() {
  }

  async cadastrar(){
    if(this.form.valid){
      
      await this.api.novoUsuario(this.form.value.nome,this.form.value.login, this.form.value.senha,this.form.value.tipo );
      this.router.navigate(['/home']);
    }else{
      this.apresentarMensagem("Preencha corretamente os campos!");
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
