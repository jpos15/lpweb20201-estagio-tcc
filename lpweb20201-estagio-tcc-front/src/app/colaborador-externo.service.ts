import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorExternoService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  lista() {
    return this.http.get(environment.API_URL.concat('colaboradores-externos/'), this.auth$.httpOptions());
  }
}
