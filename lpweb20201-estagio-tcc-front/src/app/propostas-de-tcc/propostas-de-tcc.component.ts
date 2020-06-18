import { Component, OnInit } from '@angular/core';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-propostas-de-tcc',
  templateUrl: './propostas-de-tcc.component.html',
  styleUrls: ['./propostas-de-tcc.component.css']
})
export class PropostasDeTCCComponent implements OnInit {
  propostas = null;

  constructor(private proposta$: PropostaDeTCCService) { }

  ngOnInit(): void {
    this.proposta$.lista()
      .pipe(delay(500))
      .subscribe(lista => this.propostas = lista);
  }

}
