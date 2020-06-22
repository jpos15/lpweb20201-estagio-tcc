import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from '../../orientacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostaDeTCCService } from 'src/app/proposta-de-tcc.service';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/funcionario.service';
import { ColaboradorExternoService } from 'src/app/colaborador-externo.service';

@Component({
  selector: 'app-proposta-de-tcc-cadastro',
  templateUrl: './cadastrar-proposta-de-tcc.component.html',
  styleUrls: ['./cadastrar-proposta-de-tcc.component.css'],
})
export class CadastrarPropostaDeTccComponent implements OnInit {
  cadastroForm: FormGroup;
  propostaDeTcc: any;
  listaOrientacoes: any;
  listaFuncionario: any;
  listaColaboradorExterno: any;

  constructor(
    private orientacao$: OrientacaoService,
    private propostaDeTcc$: PropostaDeTCCService,
    private funcionario$: FuncionarioService,
    private colaboradorExterno$: ColaboradorExternoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.obterOrientacoes();

    this.funcionario$.lista().subscribe((data: any) => {
      console.log('Funcionarios', data.results);
      this.listaFuncionario = data.results;
    });
    this.colaboradorExterno$.lista().subscribe((data: any) => {
      console.log('Colaboradores externos', data.results);
      this.listaColaboradorExterno = data.results;
    });
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
      membros_da_banca_funcionario: [[], [Validators.required]],
      membros_da_banca_colaboradorExterno: [[], [Validators.required]]
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
    this.propostaDeTcc = Object.assign({}, this.propostaDeTcc, this.cadastroForm.value);
    this.propostaDeTcc.orientacao_id = parseInt(this.propostaDeTcc.orientacao_id);

    const membrosDaBanca = [];

    this.cadastroForm.controls.membros_da_banca_funcionario.value.map(funcionario => {
      membrosDaBanca.push({membro_interno_id : funcionario});
    });

    this.cadastroForm.controls.membros_da_banca_colaboradorExterno.value.map(colaboradorExterno => {
      membrosDaBanca.push({membro_externo_id : colaboradorExterno});
    });

    this.propostaDeTcc.membros_da_banca = membrosDaBanca;

    delete this.propostaDeTcc.membros_da_banca_funcionario;
    delete this.propostaDeTcc.membros_da_banca_colaboradorExterno;
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
