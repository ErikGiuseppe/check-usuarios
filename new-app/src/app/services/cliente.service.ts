import { Injectable } from '@angular/core';
import { Cliente } from '../components/interfaces/Cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientesUrl ="http://localhost:3000/clientes";
  constructor(private http: HttpClient) {}
  clientes: Cliente[] = [
    
  ];
  listar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.clientesUrl) as Observable<Cliente[]>
    
  };
  remover(id:string){

      return this.http.delete(this.clientesUrl+"/"+id,)
  
  }
  getByid(id:string) : Observable<Cliente>{
    return this.http.get(this.clientesUrl+"/"+id,) as Observable<Cliente>
  }
  editar(cliente:Cliente){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }

    return this.http.put(this.clientesUrl+"/"+cliente.id,cliente,httpHeader)

}
  adicionar(cliente:Cliente){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }
    return this.http.post(this.clientesUrl,cliente,httpHeader)
  }
}
