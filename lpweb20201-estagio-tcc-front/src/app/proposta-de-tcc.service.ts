import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropostaDeTCCService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  lista() {
    return this.http.get(environment.API_URL.concat('propostas-de-tcc/'), this.auth$.httpOptions());
  }

  get(id) {
    return this.http.get(environment.API_URL.concat(`propostas-de-tcc/${id}/`), this.auth$.httpOptions());
  }

  cadastrar(proposta:any){
    return this.http.post(environment.API_URL.concat(`propostas-de-tcc/`), proposta, this.auth$.httpOptions());
  }

  update(proposta_tcc,id) {
    return this.http.put(environment.API_URL.concat(`propostas-de-tcc/${id}/`),proposta_tcc, this.auth$.httpOptions());
  }
}
