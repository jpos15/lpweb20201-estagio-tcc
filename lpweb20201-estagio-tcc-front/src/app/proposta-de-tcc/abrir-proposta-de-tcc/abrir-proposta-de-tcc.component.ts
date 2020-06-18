import { Component, OnInit } from '@angular/core';
import { PropostaDeTCCService } from '../../proposta-de-tcc.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AvaliacaoService } from 'src/app/avaliacao.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-proposta-de-tcc-abrir',
  templateUrl: './abrir-proposta-de-tcc.component.html',
  styleUrls: ['./abrir-proposta-de-tcc.component.css'],
})
export class AbrirPropostaDeTCCComponent implements OnInit {
  proposta = null;
  avaliacoes: Array<any> = [];
  comentario: string = null;
  aprovada: boolean;
  publicada: false;
  usuario;

  constructor(
    private proposta$: PropostaDeTCCService,
    private route: ActivatedRoute,
    private avaliacao$: AvaliacaoService,
    private auth$: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.proposta$
        .get(params.get('id'))
        .pipe(delay(100))
        .subscribe((proposta) => {
          this.proposta = proposta;

          this.avaliacao$.avaliacoes().subscribe((data: any) => {
            for (let result of data.results) {
              if (result.proposta == this.proposta.id) {
                this.avaliacoes.push(result);
              }
            }
          });
        });
    });

    this.usuario = this.auth$.user();
  }

  atualizaAvaliacoes() {
    this.avaliacoes = [];
    this.avaliacao$.avaliacoes().subscribe((data: any) => {
      for (let result of data.results) {
        if (result.proposta == this.proposta.id) {
          this.avaliacoes.push(result);
        }
      }
    });
  }

  salvarAvaliacao() {
    this.avaliacao$
      .avaliar({
        usuario: this.usuario.id,
        usuario_id: this.usuario.id,
        comentario: this.comentario,
        aprovada: this.aprovada,
        publicada: this.publicada,
        proposta: this.proposta.id,
      })
      .subscribe((resposta) => {
        this.publicada = false;
        this.comentario = null;
        this.aprovada = null;
        this.atualizaAvaliacoes();
      });
  }
}
