import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:3333';
  private token: any = null;
  public static userGlobal;

  constructor(private http: HttpClient, private storage: StorageService, private router:Router) { }

  async login(usuario): Promise<boolean> {
    if (usuario) {
      return this.http
        .post<boolean>(`${this.baseUrl}/login`, usuario)
        .toPromise()
        .then((resultado: any) => {
          this.token = resultado.token;
          this.storage.armazenar("token", resultado.token);
          this.storage.armazenar("user", resultado.user);
          AuthenticationService.userGlobal = resultado.user;
          return true;
        })
        .catch((err) => {
          this.token = null;
          return false;
        });
    }
    return false;
  }

  async logout() {
    this.token = null;
    await this.storage.remover("token");
    await this.storage.remover("user");

    this.router.navigate(["/login"]);
    AuthenticationService.userGlobal =[];
  }

  getToken() {
    return this.token;
  }

  async isLogado(): Promise<boolean> {
    var dados = null;
    await this.storage.recuperar("token").then((data) => {
      if (data != null) {
        this.token = data;
        console.log(this.token);
      }
      dados = data;

    });
    return dados === null ? false : true;
  }
  async getUser(): Promise<any> {
    var dados = null;
    await this.storage.recuperar("user").then((data) => {
      if (data != null) {
        AuthenticationService.userGlobal = data;
        console.log(AuthenticationService.userGlobal);
      }
      dados = data;

    });
    return AuthenticationService.userGlobal;
  }
  
}