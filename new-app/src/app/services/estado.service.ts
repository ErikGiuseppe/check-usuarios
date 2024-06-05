import { Injectable } from '@angular/core';
import { Estado } from '../components/interfaces/Estado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private estadosUrl =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  constructor(private http: HttpClient) {}

  listar(): Observable<Estado[]> {
    return this.http.get(this.estadosUrl) as Observable<Estado[]>;
  }
}
