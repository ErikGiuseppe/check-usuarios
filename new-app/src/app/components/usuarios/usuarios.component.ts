import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../interfaces/Usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup = new FormGroup({})
 
  constructor(private usuarioservice: UsuarioService, private formBuilder: FormBuilder) {
    this.usuarioForm = formBuilder.group({
      nome:['',Validators.required],
      senha:['',Validators.required],
      id:['',Validators.required],

    })
  }
  inserir(){
    const idNumber=  parseInt(this.usuarioForm.value.id) 
    if(this.usuarioForm.valid){
      const usuarioNovo: Usuario={
        nome: this.usuarioForm.value.nome,
        senha: this.usuarioForm.value.senha,
        id:idNumber,
 
      }
    this.usuarioForm.reset()
    this.usuarios.push(usuarioNovo)
    this.usuarioservice.adicionar(usuarioNovo).subscribe()
    alert('usuario Cadastrado')
    }
    
  }
  remover(id:number):void{
    this.usuarios = this.usuarios.filter((c)=>c.id !==id)
    this.usuarioservice.remover(id).subscribe()
    alert("usuario removido")
  }
  listar(): void {
    this.usuarioservice.listar().subscribe((item)=>(this.usuarios = item));
  }

  ngOnInit(): void {
    this.listar();
  }
}
