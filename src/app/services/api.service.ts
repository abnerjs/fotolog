import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";
import { Photo } from "./photo.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authentication:AuthenticationService
  ) {this.listar()}

  public async uploadAll(photos: Photo[], message:string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: "Uploading...",
    });
    await loading.present();
    var user;
    await this.authentication.getUser().then((u)=>{
      user = u.id;
    })
    const formData = new FormData();
    formData.append("message", message);
    for (let photo of photos) {
      const blob = await fetch(photo.webviewPath).then((r) => r.blob());
      formData.append("images", blob, `photo.${photo.format}`);
    }
   
      formData.append("autorizacao","false");
      formData.append("user_id",user);
      formData.append("data",new Date().toDateString());
    const url = `${environment.serverUrl}/posts`;

    this.http
      .post<boolean>(url, formData)
      .subscribe(
        (ok) => {
          loading?.dismiss();
          this.showToast(true);
        },
        (err) => {
          loading?.dismiss();
          this.showToast(false);
        }
      );
  }

  public async novoUsuario(nome:string, login:string, senha:string, tipo:string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: "Carregando...",
    });
    await loading.present();

    const formData = new FormData();
    const url = `${environment.serverUrl}/users/${nome}/${login}/${senha}/${tipo}`;

    this.http
      .post<boolean>(url, formData)
      .subscribe(
        (ok) => {
          loading?.dismiss();
          this.showToast(true);
        },
        (err) => {
          loading?.dismiss();
          this.showToast(false);
        }
      );
  }
  private async showToast(ok: boolean): Promise<void> {
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: "Upload successful",
        duration: 3000,
        position: "top",
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: "Upload failed",
        duration: 3000,
        position: "top",
      });
      toast.present();
    }
  }
  public listar(){
 
    return this.http.get(`${environment.serverUrl}/posts`);
    
  }
  public async aut(id:number){
    const loading = await this.loadingCtrl.create({
      message: "Carregando...",
    });
    await loading.present();
    console.log(id);
    const formData = new FormData();
    formData.append("id", id.toString());
    const url = `${environment.serverUrl}/posts/autorizar/${id}`;
    this.http
    .post<boolean>(url, formData)
    .subscribe(
      (ok) => {
        loading?.dismiss();
        this.showToast(true);
      },
      (err) => {
        loading?.dismiss();
        this.showToast(false);
      }
    );
      
  
  }
}