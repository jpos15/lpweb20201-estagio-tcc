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
  mostrar: boolean = false;
  mostrarEditar: boolean = false;
  mostarAprovar: boolean = false;

  constructor(
    private proposta$: PropostaDeTCCService,
    private route: ActivatedRoute,
    private avaliacao$: AvaliacaoService,
    private auth$: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.obterProposta(params.get('id'));
    });

    this.usuario = this.auth$.usuarioDetalhes();
  }

  obterProposta(id) {
    this.proposta$.get(id)
      .subscribe((proposta) => {
        this.proposta = proposta;

        this.avaliacao$.avaliacoes().subscribe((data: any) => {
          this.avaliacoes = data.results;
          this.verificar();
        });
      });
  }

  verificar() {
    this.usuario.groups.find((grupo) => {
      if (grupo.name === 'Professor') {
        this.mostrar = true;
        this.mostrarEditar = true;
      }
      if (grupo.name === 'Aluno') {
        this.mostrarEditar = true;
      }
      if (grupo.name === 'Coordenação de Estágio e TCC') {
        this.mostarAprovar = true;
      }
    });
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

  aprovar(aprovar: boolean) {
    this.proposta.aprovada = aprovar;
    this.proposta.orientacao_id = this.proposta.orientacao.id;

    this.proposta$.update(this.proposta, this.proposta.id)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
