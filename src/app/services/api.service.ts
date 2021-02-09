import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { Photo } from "./photo.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {this.listar()}

  public async uploadAll(photos: Photo[], message:string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: "Uploading...",
    });
    await loading.present();

    const formData = new FormData();
    formData.append("message", message);
    for (let photo of photos) {
      const blob = await fetch(photo.webviewPath).then((r) => r.blob());
      formData.append("images", blob, `photo.${photo.format}`);
      formData.append("autorizacao","false");
      formData.append("data",new Date().toDateString());
    }
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
}