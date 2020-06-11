import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { InicioComponent } from './inicio/inicio.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { PropostasDeTCCComponent } from './propostas-de-tcc/propostas-de-tcc.component';
import { PropostaDeTCCComponent } from './proposta-de-tcc/proposta-de-tcc.component';
import { PropostaEstagioComponent } from './proposta-estagio/proposta-estagio.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'propostas-de-estagio', component: PropostaEstagioComponent},
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: 'propostas-de-tcc', component: PropostasDeTCCComponent },
      { path: 'propostas-de-tcc/:id', component: PropostaDeTCCComponent },

      { path: '', component: HomeInicioComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
