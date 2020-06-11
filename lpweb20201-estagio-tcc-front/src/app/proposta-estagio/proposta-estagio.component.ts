import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { PropostaEstagioService } from './proposta-estagio.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-proposta-estagio',
  templateUrl: './proposta-estagio.component.html',
  styleUrls: ['./proposta-estagio.component.css']
})
export class PropostaEstagioComponent implements OnInit {

  constructor(
    public proposta$: PropostaEstagioService,
    public auth$: AuthService,
    private router: ActivatedRoute,
    ) {
  }

  user:any;
  orientacao = null;
  titulo = null;
  conceitos = null;
  resultados = null;
  minhasOrientacoes = null;
  orientacoes: any;

 ngOnInit(): void {
    this.user = this.auth$.user();

    if(this.user){


          this.proposta$.orientacao()

            .subscribe(dados => {
              this.orientacoes = dados.results;
              this.encontrarOrientacao();

            });
          }

  }

  enviarDados(){
    let dados = {
      orientacao_id: this.orientacao,
      titulo: this.titulo,
      conceitos: this.conceitos,
      resultados_esperados: this.resultados,
      membros_da_banca: []


    }
    this.proposta$.cadastrar(dados)
    console.log(dados)


  }

  encontrarOrientacao(){


    this.minhasOrientacoes = this.orientacoes.filter((alunoO)=> alunoO.tipo === "estagio" && alunoO.aluno.id === this.user.id)


    console.log(this.minhasOrientacoes)
  }

}

