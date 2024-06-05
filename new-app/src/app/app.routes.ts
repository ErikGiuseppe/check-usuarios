import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component';
import { RotasComponentComponent } from './components/rotas-component/rotas-component.component';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { TabelaEstadoComponent } from './components/tabela-estado/tabela-estado.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { FornecedorDetailComponent } from './components/fornecedor-detail/fornecedor-detail.component';
import { UsuariosDetailComponent } from './components/usuarios-detail/usuarios-detail.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'nova-rota', component: RotasComponentComponent },
  { path: 'cliente/:id', component: ClienteDetailComponent },
  { path: 'cliente', component: ClienteComponent },
  {path:'fornecedor/:id',component: FornecedorDetailComponent},
  {path:'fornecedor',component:FornecedorComponent},
  {path:'usuario/:id',component: UsuariosDetailComponent},
  {path:'usuario',component:UsuariosComponent},
  { path: 'pokemon', component: ListPokemonsComponent },
  { path: 'estado', component: TabelaEstadoComponent },
  { path: '**', component: HomeComponentComponent },
  
];
