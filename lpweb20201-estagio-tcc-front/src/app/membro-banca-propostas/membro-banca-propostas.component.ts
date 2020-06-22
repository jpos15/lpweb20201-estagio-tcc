import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MembroService } from '../membro.service';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { FuncionarioService } from './../funcionario.service';
import { ColaboradorexternoService } from '../colaboradorexterno.service';
import { delay } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-membro-banca-propostas',
  templateUrl: './membro-banca-propostas.component.html',
  styleUrls: ['./membro-banca-propostas.component.css']
})
export class MembroBancaPropostasComponent implements OnInit {

  prop= null;

  membros: any;
  propostas:any;
  funcionarios: any;
  colaboradores: any;

  proposta_id: any;
  funcionario_id: any;
  colaboradorexterno_id: any;

  constructor(public auth$: AuthService, private membro: MembroService, private proposta: PropostaDeTCCService, private funcionario: FuncionarioService, private colaborador: ColaboradorexternoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.proposta.cadastrarMembro('dados', 'id')
          .subscribe(proposta => this.prop = proposta);
          this.pesquisarProposta();
      }
    );
  }


  pesquisar() {
    this.membro.lista()
      .subscribe(dados => this.membros = dados);
  }

  pesquisarProposta(){
    this.proposta.lista()
    .subscribe(dados => this.propostas = dados);
  }
  
  pesquisarFuncionario(){
    this.funcionario.getFuncionarios()
    .subscribe(dados => this.funcionarios = dados);
  }

  pesquisarColaboradorExterno(){
    this.colaborador.getColaboradores()
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
