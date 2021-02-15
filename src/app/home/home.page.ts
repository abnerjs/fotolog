import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public message: string;
  public posts: any[] = [];
  private total: number;
  public form: FormGroup;
  public user: any;
  constructor(private router: Router, private authentication: AuthenticationService, public photoService: PhotoService, private toastController: ToastController, private api: ApiService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({

      message: new FormControl('', Validators.required),
    });
    this.buscar();
    if(this.user==null){
      this.user = AuthenticationService.userGlobal;
      console.log(AuthenticationService.userGlobal);
    }
   
    
  }

  load() {
    location.reload()
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async sendPost() {
    const photos = this.photoService.photos;
    if (this.form.valid) {

      if (photos.length > 5) {
        this.apresentarMensagem("São permitidas menos de 5 imagens!")
      } else {
        await this.api.uploadAll(photos, this.form.value.message);
        this.buscar();
        this.load();
      }
    } else {
      this.apresentarMensagem("Preencha o campo de mensagem!");
    }
  }
  async buscar() {
    await this.authentication.getUser().then((d) => {
      this.user = d;
    });
    var vet: any;
    this.posts = [];
    await this.api.listar().subscribe((dados: any) => {
      this.posts = dados;

    });

  }
  async apresentarMensagem(mensagem: string) {

    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();

  }
  async autoriza(id: number) {
    await this.api.aut(id);
    this.buscar();
    this.load();

  }
  async novoUser() {
    let tipo;
    await this.authentication.getUser().then((x) => {
      tipo = x.tipo;
    })
    if (tipo == "adm") {
      this.router.navigate(['/usuario']);
    } else {
      this.apresentarMensagem("você não é autorizado para esta ação!");
    }
  }
  async logout() {
   
    await this.authentication.logout();
    this.load();
  }


}