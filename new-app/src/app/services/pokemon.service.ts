import { Injectable } from '@angular/core';
import { Pokemon } from '../components/interfaces/Pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonsUrl = 'https://demo1290477.mockable.io/pockemon';
  constructor(private http: HttpClient) {}

  listar(): Observable<Pokemon[]> {
    return this.http.get(this.pokemonsUrl) as Observable<Pokemon[]>;
  }
}
