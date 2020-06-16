import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from '../../orientacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostaDeTCCService } from 'src/app/proposta-de-tcc.service';

@Component({
  selector: 'app-proposta-de-tcc-cadastro',
  templateUrl: './proposta-de-tcc-cadastro.component.html',
  styleUrls: ['./proposta-de-tcc-cadastro.component.css']
})
export class PropostaDeTccCadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  propostaDeTcc: any;
  listaOrientacoes: any;

  constructor(private orientacao$: OrientacaoService, private propostaDeTcc$: PropostaDeTCCService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.obterOrientacoes();
  }

  obterOrientacoes() {
    this.orientacao$.get()
      .subscribe((dados: any) => {
        this.listaOrientacoes = dados.results;
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
      membros_da_banca: [[], []]
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
    console.log(this.propostaDeTcc);
  }

  adicionar() {
      this.AtualizarDadosObjeto()
      this.propostaDeTcc$.cadastrar(this.propostaDeTcc)
        .subscribe(
          (retorno: any) => {
            console.log(retorno)
            // this.router.navigate(['/inicio/professores']);
          },
          error => console.log(error))
  }
}
