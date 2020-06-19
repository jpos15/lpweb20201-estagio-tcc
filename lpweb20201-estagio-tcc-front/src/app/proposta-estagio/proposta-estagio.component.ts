import { Component, OnInit } from '@angular/core';
import { PropostaEstagioService } from '../proposta-estagio.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-proposta-estagio',
  templateUrl: './proposta-estagio.component.html',
  styleUrls: ['./proposta-estagio.component.css']
})
export class PropostaEstagioComponent implements OnInit {
  propostas = null;
  usuario: any;
  mostrar: boolean = false;

  constructor(
    private proposta$: PropostaEstagioService,
    private auth$: AuthService
  ) { }

  ngOnInit(): void {
    this.proposta$.lista()
      .subscribe(lista => this.propostas = lista);
    this.usuario = this.auth$.usuarioDetalhes();
    this.verificar();
  }

  verificar() {
    this.usuario.groups.find((grupo) => {
      if (grupo.name === 'Aluno') {
        this.mostrar = true;
      }
    });
  }

}
