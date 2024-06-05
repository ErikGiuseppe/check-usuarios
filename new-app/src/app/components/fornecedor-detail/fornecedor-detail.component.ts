import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../interfaces/Fornecedor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {
  fornecedor?:Fornecedor;
  fornecedorForm: FormGroup = new FormGroup({})
  constructor (private route: ActivatedRoute, private fornecedorService: FornecedorService, private formBuilder: FormBuilder,router: Router){
    this.router = router;
    this.getClientById()
    

  }
  id?: string
  router:Router
  
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id')??"";

    
    this.fornecedorService.getByid(this.id).subscribe((fornecedorResponse)=>this.fornecedor = fornecedorResponse)

    this.fornecedorForm = this.formBuilder.group({
      id:[this.fornecedor?.id],
      nome:[this.fornecedor?.nome],
      telefone:[this.fornecedor?.telefone],
      endereco:[this.fornecedor?.endereco]

    })

    

  }
  update():void{

      if(this.fornecedorForm.valid){
        const fornecedorNovo: Fornecedor={
          nome: this.fornecedorForm.value.nome,
          telefone: this.fornecedorForm.value.telefone,
          id: this.fornecedorForm.value.id,
          endereco: this.fornecedorForm.value.endereco,
        }
      this.fornecedorForm.reset()

      this.fornecedorService.editar(fornecedorNovo).subscribe()
      alert('fornecedor Editado')
      this.router.navigate(['/fornecedor'
      ]);
   
      }

  }
}
