import { Component, OnInit } from '@angular/core';
import { PropostaEstagioService } from 'src/app/proposta-estagio.service';
import { OrientacaoService } from 'src/app/orientacao.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AvaliacaoService } from 'src/app/avaliacao.service';

@Component({
  selector: 'app-abrir-proposta-de-estagio',
  templateUrl: './abrir-proposta-de-estagio.component.html',
  styleUrls: ['./abrir-proposta-de-estagio.component.css'],
})
export class AbrirPropostaDeEstagioComponent implements OnInit {
  proposta: any;
  comentario: string = null;
  aprovada: boolean;
  publicada: false;
  usuario;
  mostrar: boolean = false;
  mostrarEditar: boolean = false;

  constructor(
    private propostaEstagio: PropostaEstagioService,
    private router: ActivatedRoute,
    private avaliacao$: AvaliacaoService,
    private auth$: AuthService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.propostaEstagio.get(params.get('id')).subscribe((proposta) => {
        this.proposta = proposta;
        this.verificar();
      });
    });
    this.usuario = this.auth$.usuarioDetalhes();
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
    });
  }

  atualizaProposta() {
    this.router.paramMap.subscribe((params) => {
      this.propostaEstagio.get(params.get('id')).subscribe((proposta) => {
        this.proposta = proposta;
        this.verificar();
      });
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
        this.atualizaProposta();
      });
  }
}
