import { Injectable } from "@angular/core";
import {
  Plugins,
  CameraResultType,
  CameraSource,
} from "@capacitor/core";

const { Camera } = Plugins;

export interface Photo {
  webviewPath: string;
  format: string;
}

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() {}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.photos.unshift({
      webviewPath: capturedPhoto.webPath,
      format: capturedPhoto.format
    });
  }
}