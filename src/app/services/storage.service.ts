import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async armazenar(key:string, valor:any){
    await Storage.set(
      {
        key:key, 
        value: JSON.stringify(valor)//transformando para string o valor
      }
    );
  }
  //retornando uma promessa (tipando o retorno)
  async recuperar(key: string): Promise<{value:any}>{
    const dados = await Storage.get({key});
    return JSON.parse(dados.value);
  }
  async remover(key: string) {
    await Storage.remove({key})
    
  }
}
