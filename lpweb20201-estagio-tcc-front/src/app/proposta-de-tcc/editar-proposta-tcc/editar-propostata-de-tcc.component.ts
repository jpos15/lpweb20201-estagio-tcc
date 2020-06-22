import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from '../../orientacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostaDeTCCService } from 'src/app/proposta-de-tcc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { FuncionarioService } from 'src/app/funcionario.service';
import { ColaboradorExternoService } from 'src/app/colaborador-externo.service';

@Component({
  selector: 'app-proposta-de-tcc-cadastro',
  templateUrl: './editar-proposta-de-tcc.component.html',
  styleUrls: [],
})
export class EditarPropostaDeTccComponent implements OnInit {
  cadastroForm: FormGroup;
  propostaDeTcc: any;
  listaOrientacoes: any;
  propost_id: any;
  alterar: boolean = false;
  listaFuncionario: any;
  listaColaboradorExterno: any;

  constructor(
    private orientacao$: OrientacaoService,
    private route: ActivatedRoute,
    private propostaDeTcc$: PropostaDeTCCService,
    private funcionario$: FuncionarioService,
    private colaboradorExterno$: ColaboradorExternoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.propost_id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.criarFormulario();
    this.propostaDeTcc$
      .get(this.propost_id)
      .subscribe(
        (dados: any) => {
          this.propostaDeTcc = dados;
          this.alterar = true;

          this.criarFormulario();

          this.separarMembroDaBanca(dados.membros_da_banca);
        },
        (erro) => {
          console.error(erro);
        }
      );

    this.funcionario$.lista().subscribe((data: any) => {
      console.log('Funcionarios', data.results);
      this.listaFuncionario = data.results;
    });
    this.colaboradorExterno$.lista().subscribe((data: any) => {
      console.log('Colaboradores externos', data.results);
      this.listaColaboradorExterno = data.results;
    });
  }

  separarMembroDaBanca(membros: any[]) {
    const membroInterno = [];
    const membroExterno = [];

    membros.map((data) => {
      if (data.membro_externo != null) {
        membroExterno.push(data.membro_externo.id);
      }
      else {
        membroInterno.push(data.membro_interno.id);
      }
    });

    this.cadastroForm.controls.membros_da_banca_funcionario.setValue(membroInterno);
    this.cadastroForm.controls.membros_da_banca_colaboradorExterno.setValue(membroExterno);
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      orientacao_id: [
        !this.alterar ? null : this.propostaDeTcc.orientacao.id,
        [Validators.required],
      ],
      titulo: [
        !this.alterar ? '0' : this.propostaDeTcc.titulo,
        [Validators.required],
      ],
      conceitos: [
        !this.alterar ? '' : this.propostaDeTcc.conceitos,
        [Validators.required],
      ],
      resultados_esperados: [
        !this.alterar ? '' : this.propostaDeTcc.resultados_esperados,
        [Validators.required],
      ],
      objetivo: [
        !this.alterar ? '' : this.propostaDeTcc.objetivo,
        [Validators.required],
      ],
      tecnologias: [
        !this.alterar ? '' : this.propostaDeTcc.tecnologias,
        [Validators.required],
      ],
      metodologia: [
        !this.alterar ? '' : this.propostaDeTcc.metodologia,
        [Validators.required],
      ],
      membros_da_banca_funcionario: [[], [Validators.required]],
      membros_da_banca_colaboradorExterno: [[], [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.cadastroForm.dirty || !this.cadastroForm.valid) {
      this.cadastroForm.markAllAsTouched();
      return '';
    }
    this.atualizar();
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

  atualizar() {
    this.AtualizarDadosObjeto();
    this.propostaDeTcc$.update(this.propostaDeTcc, this.propost_id).subscribe(
      (retorno: any) => {
        this.router.navigate([
          `/inicio/propostas-de-tcc`,
        ]);
      },
      (error) => console.log(error)
    );
  }
}
