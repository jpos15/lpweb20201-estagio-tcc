import { Component, OnInit } from '@angular/core';
import { PropostaEstagioService } from 'src/app/proposta-estagio.service';
import { OrientacaoService } from 'src/app/orientacao.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-abrir-proposta-de-estagio',
  templateUrl: './abrir-proposta-de-estagio.component.html',
  styleUrls: ['./abrir-proposta-de-estagio.component.css']
})
export class AbrirPropostaDeEstagioComponent implements OnInit {
  proposta: any;

  constructor(
    private propostaEstagio: PropostaEstagioService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params => {
        this.propostaEstagio.get(params.get('id'))
          .subscribe(proposta => this.proposta = proposta);
      }
    );
  }
}
