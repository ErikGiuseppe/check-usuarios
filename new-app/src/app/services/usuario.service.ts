import { Injectable } from '@angular/core';
import { Usuario } from '../components/interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioUrl = 'http://localhost:5204/Usuario';
  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get(this.usuarioUrl) as Observable<Usuario[]>;
  }
  remover(id:number){


    return this.http.delete(this.usuarioUrl+"/"+id,)

  }
  getByid(id:number) : Observable<Usuario>{

    return this.http.get(this.usuarioUrl+"/"+id,) as Observable<Usuario>
  }
  editar(usuario:Usuario){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }


    return this.http.put(this.usuarioUrl+"/"+usuario.id,usuario,httpHeader)

  }
  adicionar(usuario:Usuario){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }

    return this.http.post(this.usuarioUrl,usuario,httpHeader)
  }
}
