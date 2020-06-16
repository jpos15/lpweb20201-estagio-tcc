import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetornoApiViewModel } from './uteis/retorno-api';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrientacaoService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  get() : Observable<any> {
    return this.http.get<RetornoApiViewModel<any>>(environment.API_URL.concat('orientacoes/'), this.auth$.httpOptions());
  }
}
