import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilService } from 'src/app/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  perfil: any = {
    "id":null,
    "usuario": null,
    "nome": null,
    "sexo": null,
    "cpf": null,
    "telefone": null,
    "endereco": null,
    "estado_uf": null,
    "cidade": null,
    "cep": null
  };
  user = null

  constructor(public auth$: AuthService, private perfil$: PerfilService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth$.user();
    if (this.user) {
      this.perfil$.perfilLogado()
        .subscribe(
          dados => this.perfil = dados
        );
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  editarPerfil(){
    this.perfil$.editarPerfil(this.perfil).subscribe(
      () => {
        this.router.navigate(['/inicio','perfil']);
      }
    );
  }
}
