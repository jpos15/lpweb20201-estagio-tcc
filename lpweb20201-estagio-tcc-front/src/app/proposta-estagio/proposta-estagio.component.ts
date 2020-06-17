import { Component, OnInit } from '@angular/core';
import { PropostaEstagioService } from '../proposta-estagio.service';

@Component({
  selector: 'app-proposta-estagio',
  templateUrl: './proposta-estagio.component.html',
  styleUrls: ['./proposta-estagio.component.css']
})
export class PropostaEstagioComponent implements OnInit {
  propostas = null;

  constructor(private proposta$: PropostaEstagioService) { }

  ngOnInit(): void {
    this.proposta$.lista()
      .subscribe(lista => this.propostas = lista);
  }

}
