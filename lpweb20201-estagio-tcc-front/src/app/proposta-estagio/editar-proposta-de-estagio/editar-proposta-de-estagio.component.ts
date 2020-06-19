import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from 'src/app/orientacao.service';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PropostaEstagioService } from 'src/app/proposta-estagio.service';
@Component({
  selector: 'app-editar-proposta-de-estagio',
  templateUrl: './editar-proposta-de-estagio.component.html',
  styleUrls: ['./editar-proposta-de-estagio.component.css'],
})
export class EditarPropostaDeEstagioComponent implements OnInit {
  user: any;
  idProposta = null;
  orientacao = null;
  titulo = null;
  conceitos = null;
  resultados = null;
  orientacoes: any;

  error = null;
  sucesso = null;

  constructor(
    private proposta$: PropostaEstagioService,
    private route: ActivatedRoute,
    private orientacao$: OrientacaoService,
    private auth$: AuthService,
    private router: Router
  ) {}

  private delay(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  ngOnInit(): void {
    this.user = this.auth$.user();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.proposta$.get(id))
      )
      .subscribe((proposta) => this.getProposta(proposta));
  }

  getProposta(proposta) {
    // (document.getElementById('orienta') as HTMLSelectElement).value = proposta.orientacao.id;
    this.orientacao = proposta.orientacao.id;
    this.titulo = proposta.titulo;
    this.conceitos = proposta.conceitos;
    this.resultados = proposta.resultados_esperados;
    this.idProposta = proposta.id;
  }

  enviarDados() {
    let dados = {
      orientacao_id: this.orientacao,
      titulo: this.titulo,
      conceitos: this.conceitos,
      resultados_esperados: this.resultados,
      membros_da_banca: [],
    };
    this.proposta$.editar(dados, this.idProposta).subscribe(
      async () => {
        this.sucesso = true;
        await this.delay(3000);
        await this.router.navigate(['inicio/propostas-de-estagio/']);
      },
      (err) => (this.error = err.error)
    );
  }
}
