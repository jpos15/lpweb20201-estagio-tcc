import { environment } from './../environments/environment';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private url: string = "http://localhost:8000/api/"

  constructor(private http: HttpClient,private auth$: AuthService) { }

  getFuncionarios(){
    return this.http.get(environment.API_URL.concat('funcionarios/'),this.auth$.httpOptions());
  }

}
