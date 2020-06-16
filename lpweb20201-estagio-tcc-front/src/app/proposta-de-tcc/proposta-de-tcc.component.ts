import { Component, OnInit } from '@angular/core';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-propostas-de-tcc',
  templateUrl: './proposta-de-tcc.component.html',
  styleUrls: ['./proposta-de-tcc.component.css']
})
export class PropostaDeTCCComponent implements OnInit {
  propostas = null;

  constructor(private proposta$: PropostaDeTCCService) { }

  ngOnInit(): void {
    this.proposta$.lista()
      .pipe(delay(2000))
      .subscribe(lista => this.propostas = lista);
  }

}
