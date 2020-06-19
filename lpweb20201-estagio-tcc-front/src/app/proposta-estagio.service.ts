
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RetornoApiViewModel } from './uteis/retorno-api';

@Injectable({
  providedIn: 'root'
})
export class PropostaEstagioService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  cadastrar(proposta: any) {
    return this.http.post(environment.API_URL.concat(`propostas-de-estagio/`), proposta, this.auth$.httpOptions());
  }

  editar(proposta, id) {
    return this.http.put(environment.API_URL.concat(`propostas-de-estagio/${id}/`), proposta, this.auth$.httpOptions());
  }

  get(id) {
    return this.http.get(environment.API_URL.concat(`propostas-de-estagio/${id}/`), this.auth$.httpOptions());
  }

  lista() {
    return this.http.get(environment.API_URL.concat('propostas-de-estagio/'), this.auth$.httpOptions());
  }
}
