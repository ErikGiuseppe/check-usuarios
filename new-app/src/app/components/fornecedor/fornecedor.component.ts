import { Component } from '@angular/core';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../interfaces/Fornecedor';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
FornecedorService

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores: Fornecedor[] = [];
  fornecedorForm: FormGroup = new FormGroup({})
  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 
  constructor(private fornecedoreservice: FornecedorService, private formBuilder: FormBuilder) {
    this.fornecedorForm = formBuilder.group({
      nome:['',Validators.required],
      telefone:['',Validators.required],
      endereco:['',Validators.required],

    })
  }
  inserir(){
    if(this.fornecedorForm.valid){
      const fornecedorNovo: Fornecedor={
        nome: this.fornecedorForm.value.nome,
        telefone: this.fornecedorForm.value.telefone,
        id: this.generateRandomString(8),
        endereco: this.fornecedorForm.value.endereco
      }
    this.fornecedorForm.reset()
    this.fornecedores.push(fornecedorNovo)
    this.fornecedoreservice.adicionar(fornecedorNovo).subscribe()
    alert('fornecedor Cadastrado')
    }
    
  }
  remover(id:string):void{
    this.fornecedores = this.fornecedores.filter((c)=>c.id !==id)
    this.fornecedoreservice.remover(id).subscribe()
    alert("fornecedor removido")
  }
  listar(): void {
    this.fornecedoreservice.listar().subscribe((item)=>(this.fornecedores = item));
  }

  ngOnInit(): void {
    this.listar();
  }

}
