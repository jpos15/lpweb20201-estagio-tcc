import { Component, OnInit } from '@angular/core';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-proposta-de-tcc',
  templateUrl: './proposta-de-tcc.component.html',
  styleUrls: ['./proposta-de-tcc.component.css']
})
export class PropostaDeTCCComponent implements OnInit {
  proposta = null;

  constructor(private proposta$: PropostaDeTCCService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.proposta$.get(params.get('id'))
          .pipe(delay(500))
          .subscribe(proposta => this.proposta = proposta);
      }
    );
  }

}
