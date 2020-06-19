import { Component, OnInit } from '@angular/core';
import { OrientacaoService } from '../../orientacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropostaDeTCCService } from 'src/app/proposta-de-tcc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

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

  constructor(
    private orientacao$: OrientacaoService,
    private route: ActivatedRoute,
    private propostaDeTcc$: PropostaDeTCCService,
    private fb: FormBuilder,
    private routerLink: Router
  ) {
    this.propost_id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.criarFormulario();
    this.propostaDeTcc$
      .get(this.propost_id)
      .pipe(delay(1000))
      .subscribe(
        (dados) => {
          this.propostaDeTcc = dados;
          this.alterar = true;
          this.criarFormulario();
        },
        (erro) => {
          console.error(erro);
        }
      );
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
    this.propostaDeTcc$.update(this.propostaDeTcc, this.propost_id).subscribe(
      (retorno: any) => {
        this.routerLink.navigate([
          `/inicio/propostas-de-tcc/${this.propost_id}`,
        ]);
      },
      (error) => console.log(error)
    );
  }
}
