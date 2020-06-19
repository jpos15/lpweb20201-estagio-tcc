import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  lista() {
    return this.http.get(environment.API_URL.concat('propostas-de-tcc/'), this.auth$.httpOptions());
  }

  cadastrar(proposta_id, funcionario_id, colaboradorexterno_id){
    const membro = {
      proposta_id,
      funcionario_id,
      colaboradorexterno_id
    };
    return this.http.post(environment.API_URL.concat('propostas-de-tcc/'), membro, this.auth$.httpOptions())
      .pipe(
        map(data => this.updateData(data)),
        tap(user => {
          localStorage.setItem('membro', JSON.stringify(membro));
        })
      )
  }

  
  private updateData(data) {
    const token = data['token'];
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    const token_expires = new Date(token_decoded.exp * 1000);
    return {
      id: token_decoded.user_id,
      username: token_decoded.username,
      email: token_decoded.email,
      token: token,
      token_expires: token_expires
    };
  }

}
