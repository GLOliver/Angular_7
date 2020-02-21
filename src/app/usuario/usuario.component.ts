import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [ConfirmationService]
})
export class UsuarioComponent implements OnInit {

  public usuarios:Usuario[]
  constructor(private usuarioServece:UsuarioService,
    private confirmationService:ConfirmationService) { }

  ngOnInit() {
    this.listaUsuario()
 }

 public listaUsuario(){
  this.usuarioServece.listaUsuario().subscribe(
    response => {
      this.usuarios = response
    }, 
    error => {
      alert('Desculpe, não foi carregar os dados... :(')
    }
  )
 }

 public deletar(id:string){
  this.confirmationService.confirm({
    message: 'Você tem certeza que vai deletar isso?',
    accept: () => {
        //Actual logic to perform a confirmation
        this.usuarioServece.delete(id).subscribe(
          response => {
            this.listaUsuario()
          },
          error => {
            alert('Não foi possivel deletar... :(')
          }
     
        )
    }
});
   
 }
}
