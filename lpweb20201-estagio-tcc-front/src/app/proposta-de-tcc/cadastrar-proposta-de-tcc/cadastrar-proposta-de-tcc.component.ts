import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from '../../orientacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostaDeTCCService } from 'src/app/proposta-de-tcc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposta-de-tcc-cadastro',
  templateUrl: './cadastrar-proposta-de-tcc.component.html',
  styleUrls: ['./cadastrar-proposta-de-tcc.component.css'],
})
export class CadastrarPropostaDeTccComponent implements OnInit {
  cadastroForm: FormGroup;
  propostaDeTcc: any;
  listaOrientacoes: any;

  constructor(
    private orientacao$: OrientacaoService,
    private propostaDeTcc$: PropostaDeTCCService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.obterOrientacoes();
  }

  obterOrientacoes() {
    this.orientacao$.get().subscribe((dados: any) => {
      this.listaOrientacoes = dados.results.filter(
        (tipo) => tipo.tipo === 'tcc'
      );
      console.log(this.listaOrientacoes);
    });
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      orientacao_id: [null, [Validators.required]],
      titulo: ['', [Validators.required]],
      conceitos: ['', [Validators.required]],
      resultados_esperados: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      tecnologias: ['', [Validators.required]],
      metodologia: ['', [Validators.required]],
      membros_da_banca: [[], []],
    });
  }

  onSubmit() {
    if (!this.cadastroForm.dirty || !this.cadastroForm.valid) {
      this.cadastroForm.markAllAsTouched();
      return '';
    }
    this.adicionar();
  }

  AtualizarDadosObjeto() {
    this.propostaDeTcc = Object.assign(
      {},
      this.propostaDeTcc,
      this.cadastroForm.value
    );
    this.propostaDeTcc.orientacao_id = parseInt(
      this.propostaDeTcc.orientacao_id
    );
  }

  adicionar() {
    this.AtualizarDadosObjeto();
    this.propostaDeTcc$.cadastrar(this.propostaDeTcc).subscribe(
      (retorno: any) => {
        this.router.navigate(['/inicio/propostas-de-tcc']);
      },
      (error) => console.log(error)
    );
  }
}
