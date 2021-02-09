import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
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
  constructor(public photoService: PhotoService, private toastController: ToastController,private api: ApiService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({

      message: new FormControl('', Validators.required),
    });
    this.buscar();
  }


  load() {
    location.reload()
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async sendPost() {
    const photos = this.photoService.photos;
    if (this.form.valid && photos.length>0 ) {
      await this.api.uploadAll(photos, this.form.value.message);
      this.buscar();
      this.load()
    }else{
      this.apresentarMensagem("São necessárias imagens e uma mensagem para postar o aviso!")
    }
  }
  buscar() {
    var vet: any;
    this.api.listar().subscribe((dados: any) => {
      this.posts = dados;

    });

  }
  async apresentarMensagem(mensagem:string){
     
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1000
    });
    toast.present();
  
}

}