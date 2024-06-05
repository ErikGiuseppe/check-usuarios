import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../interfaces/Usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-detail',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './usuarios-detail.component.html',
  styleUrl: './usuarios-detail.component.css'
})
export class UsuariosDetailComponent {
  usuario?:Usuario;
  UsuarioForm: FormGroup = new FormGroup({})
usuarios: any;
  constructor (private route: ActivatedRoute, private usuarioService: UsuarioService, private formBuilder: FormBuilder,router: Router){
    this.router = router;
    this.getClientById()
    

  }
  id?: number
  router:Router
  
  getClientById(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id')??"");

    
    this.usuarioService.getByid(this.id).subscribe((usuarioResponse)=>this.usuario = usuarioResponse)

    this.UsuarioForm = this.formBuilder.group({
      id:[this.usuario?.id],
      nome:[this.usuario?.nome],
      senha:[this.usuario?.senha],
   

    })

    

  }
  update():void{

      if(this.UsuarioForm.valid){
        const usuarioNovo: Usuario={
          nome: this.UsuarioForm.value.nome,
          senha: this.UsuarioForm.value.senha,
          id: this.UsuarioForm.value.id,
         
        }
      this.UsuarioForm.reset()

      this.usuarioService.editar(usuarioNovo).subscribe()
      alert('usuario Editado')
      this.router.navigate(['/usuario'
      ]);
   
      }

  }
}
