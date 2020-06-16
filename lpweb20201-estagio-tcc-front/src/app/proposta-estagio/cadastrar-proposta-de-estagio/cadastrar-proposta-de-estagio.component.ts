import { Component, OnInit } from '@angular/core';
import { PropostaEstagioService } from 'src/app/proposta-estagio.service';
import { OrientacaoService } from 'src/app/orientacao.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-proposta-de-estagio',
  templateUrl: './cadastrar-proposta-de-estagio.component.html',
  styleUrls: ['./cadastrar-proposta-de-estagio.component.css']
})
export class CadastrarPropostaDeEstagioComponent implements OnInit {

  constructor(
    private proposta$: PropostaEstagioService,
    private orientacao$: OrientacaoService,
    private auth$: AuthService,
    private router: ActivatedRoute,) { }

  user: any;
  orientacao = null;
  titulo = null;
  conceitos = null;
  resultados = null;
  minhasOrientacoes = null;
  orientacoes: any;

  error = null;
  sucesso = null;

  ngOnInit(): void {
    this.user = this.auth$.user();

    if (this.user) {
      this.orientacao$.get().subscribe(dados => { this.orientacoes = dados.results; this.encontrarOrientacao(); });
    }

  }
  enviarDados() {
    let dados = {
      orientacao_id: this.orientacao,
      titulo: this.titulo,
      conceitos: this.conceitos,
      resultados_esperados: this.resultados,
      membros_da_banca: []
    }
    this.proposta$.cadastrar(dados).subscribe(() => { this.sucesso = true }, err => this.error = err.error);
    console.log(dados)
  }

  encontrarOrientacao() {


    this.minhasOrientacoes = this.orientacoes.filter((alunoO) => alunoO.tipo === "estagio" && alunoO.aluno.id === this.user.id);


    console.log(this.minhasOrientacoes);
  }

}
