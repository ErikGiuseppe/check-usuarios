import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../interfaces/Cliente';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent {
  
  cliente?:Cliente;
  clienteForm: FormGroup = new FormGroup({})
  constructor (private route: ActivatedRoute, private clienteService: ClienteService, private formBuilder: FormBuilder,router: Router){
    this.router = router;
    this.getClientById()
    

  }
  id?: string
  router:Router
  
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id')??"";

    
    this.clienteService.getByid(this.id).subscribe((clienteResponse)=>this.cliente = clienteResponse)

    this.clienteForm = this.formBuilder.group({
      id:[this.cliente?.id],
      nome:[this.cliente?.nome],
      telefone:[this.cliente?.telefone]

    })

    

  }
  update():void{

      if(this.clienteForm.valid){
        const clienteNovo: Cliente={
          nome: this.clienteForm.value.nome,
          telefone: this.clienteForm.value.telefone,
          id: this.clienteForm.value.id
        }
      this.clienteForm.reset()

      this.clienteService.editar(clienteNovo).subscribe()
      alert('Cliente Editado')
      this.router.navigate(['/cliente'
      ]);
   
      }
      
    
  }

 




}
