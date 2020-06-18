import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  constructor(private http: HttpClient, private auth$: AuthService) {}

  avaliacoes() {
    return this.http.get(
      environment.API_URL.concat('avaliacoes-de-propostas/'),
      this.auth$.httpOptions()
    );
  }

  avaliar(avaliacao: any) {
    return this.http.post(
      environment.API_URL.concat('avaliacoes-de-propostas/'),
      avaliacao,
      this.auth$.httpOptions()
    );
  }
}
