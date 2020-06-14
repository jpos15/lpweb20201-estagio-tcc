import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilService } from 'src/app/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.css']
})
export class CadastrarPerfilComponent implements OnInit {
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
      this.perfil.usuario = this.user.id;
    }else{
      this.router.navigate(['/login']);
    }
  }

  cadastraPerfil(){
    this.perfil$.cadastraPerfil(this.perfil).subscribe(
     () => {
        this.router.navigate(['/inicio','perfil']);
      }
    );
  }
}
