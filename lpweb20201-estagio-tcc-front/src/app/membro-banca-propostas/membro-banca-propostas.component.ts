import { Component, OnInit } from '@angular/core';
import { MembroService } from '../membro.service';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { FuncionarioService } from './../funcionario.service';
import { ColaboradorexternoService } from '../colaboradorexterno.service';
import { delay } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-membro-banca-propostas',
  templateUrl: './membro-banca-propostas.component.html',
  styleUrls: ['./membro-banca-propostas.component.css']
})
export class MembroBancaPropostasComponent implements OnInit {

  membros: any;
  propostas: any;
  funcionarios: any;
  colaboradores: any;

  proposta_id: any;
  funcionario_id: any;
  colaboradorexterno_id: any;

  constructor(private membro: MembroService, private proposta: PropostaDeTCCService, private funcionario: FuncionarioService, private colaborador: ColaboradorexternoService) { }

  ngOnInit(): void {
    this.pesquisar();
    this.pesquisarProposta();
    this.pesquisarFuncionario();
    this.pesquisarColaboradorExterno();
  }

  pesquisar() {
    this.membro.lista()
      .pipe(delay(500))
      .subscribe(dados => this.membros = dados);
  }

  pesquisarProposta(){
    this.proposta.lista()
    .pipe(delay(500))
    .subscribe(dados => this.propostas = dados);
  }
  
  pesquisarFuncionario(){
    this.funcionario.getFuncionarios()
    .pipe(delay(500))
    .subscribe(dados => this.funcionarios = dados);
  }

  pesquisarColaboradorExterno(){
    this.colaborador.getColaboradores()
    .pipe(delay(500))
    .subscribe(dados => this.colaboradores = dados);
  }

  salvar(){
    this.membro.cadastrar(this.proposta_id, this.funcionario_id, this.colaboradorexterno_id)
    .subscribe(retorno => {
      alert('Membro Cadastrado')
    },
    erro => console.error(error)
    );
    this.pesquisar();
  }


}
