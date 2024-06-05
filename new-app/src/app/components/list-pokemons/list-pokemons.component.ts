import { Component } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonService } from '../../services/pokemon.service';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-pokemons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-pokemons.component.html',
  styleUrl: './list-pokemons.component.css',
})
export class ListPokemonsComponent {
  pokemons: Pokemon[] = [];


  constructor(
    private pokemonService: PokemonService,

  ) {}
  listarPokemon(): void {
    this.pokemonService.listar().subscribe((item) => (this.pokemons = item));
  }


  ngOnInit(): void {
    this.listarPokemon();
    
  }
}
