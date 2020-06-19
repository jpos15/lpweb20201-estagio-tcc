import { Component, OnInit } from '@angular/core';
import { PropostaDeTCCService } from '../proposta-de-tcc.service';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-propostas-de-tcc',
  templateUrl: './proposta-de-tcc.component.html',
  styleUrls: ['./proposta-de-tcc.component.css']
})
export class PropostaDeTCCComponent implements OnInit {
  propostas = null;
  usuario: any;
  mostrar: boolean = false;

  constructor(
    private proposta$: PropostaDeTCCService,
    private auth$: AuthService
  ) { }

  ngOnInit(): void {
    this.proposta$.lista()
      .subscribe(lista => this.propostas = lista);
    this.usuario = this.auth$.usuarioDetalhes();
    this.verificar();
  }

  verificar() {
    this.usuario.groups.find((grupo) => {
      if (grupo.name === 'Aluno') {
        this.mostrar = true;
      }
    });
  }

}
