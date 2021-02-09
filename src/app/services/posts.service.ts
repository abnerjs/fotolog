import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private base: string = "https://api.themoviedb.org/3";
  private key: string = "dd424320be6c83c68320915f7cce5121";

  constructor(private http: HttpClient) { }
  
  buscar (pagina =  1){
    
  }
 
}
