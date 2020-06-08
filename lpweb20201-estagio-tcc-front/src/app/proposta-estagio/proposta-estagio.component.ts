import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PropostaEstagioService } from '../proposta-estagio.service';


@Component({
  selector: 'app-proposta-estagio',
  templateUrl: './proposta-estagio.component.html',
  styleUrls: ['./proposta-estagio.component.css']
})
export class PropostaEstagioComponent implements OnInit {

  constructor(
    public proposta$: PropostaEstagioService,
    public auth$: AuthService,
    private router: Router,
    ) {
  }

  user:any;
  orientador = null;
  titulo = null;
  conceitos = null;
  resultados = null;



  ngOnInit(): void {
    this.user = this.auth$.user();
  }

  enviarDados(){
    let dados = {
      orientador: this.user.id,
      titulo: this.titulo,
      conceitos: this.conceitos,
      resultado: this.resultados


    }
    this.proposta$.adicionar(dados)
  }
}
