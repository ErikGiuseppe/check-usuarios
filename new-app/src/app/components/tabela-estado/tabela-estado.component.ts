import { Component } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { EstadoService } from '../../services/estado.service';
import { CommonModule } from '@angular/common';
import { Estado } from '../interfaces/Estado';

@Component({
  selector: 'app-tabela-estado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-estado.component.html',
  styleUrl: './tabela-estado.component.css',
})
export class TabelaEstadoComponent {

  estados: Estado[] = [];

  constructor(

    private estadoService: EstadoService
  ) {}
 
  listarEstado(): void {
    this.estadoService.listar().subscribe((item) => (this.estados = item));
  }

  ngOnInit(): void {

    this.listarEstado();
  }
}
