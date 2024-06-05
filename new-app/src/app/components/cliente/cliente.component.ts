import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../interfaces/Cliente';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';




@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  clienteForm: FormGroup = new FormGroup({})
  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 
  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.clienteForm = formBuilder.group({
      nome:['',Validators.required],
      telefone:['',Validators.required],

    })
  }
  inserir(){
    if(this.clienteForm.valid){
      const clienteNovo: Cliente={
        nome: this.clienteForm.value.nome,
        telefone: this.clienteForm.value.telefone,
        id: this.generateRandomString(8)
      }
    this.clienteForm.reset()
    this.clientes.push(clienteNovo)
    this.clienteService.adicionar(clienteNovo).subscribe()
    alert('Cliente Cadastrado')
    }
    
  }
  remover(id:string):void{
    this.clientes = this.clientes.filter((c)=>c.id !==id)
    this.clienteService.remover(id).subscribe()
    alert("cliente removido")
  }
  listar(): void {
    this.clienteService.listar().subscribe((item)=>(this.clientes = item));
  }

  ngOnInit(): void {
    this.listar();
  }
}
