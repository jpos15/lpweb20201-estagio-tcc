import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { InicioComponent } from './inicio/inicio.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { PropostaDeTCCComponent } from './proposta-de-tcc/proposta-de-tcc.component';
import { PropostaEstagioComponent } from './proposta-estagio/proposta-estagio.component';
import { CadastrarPerfilComponent } from './perfil/cadastrar-perfil/cadastrar-perfil.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { PropostaDeTCCAbrirComponent } from './proposta-de-tcc/proposta-de-tcc-abrir/proposta-de-tcc-abrir.component';
import { PropostaDeTccCadastroComponent } from './proposta-de-tcc/proposta-de-tcc-cadastro/proposta-de-tcc-cadastro.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'propostas-de-estagio', component: PropostaEstagioComponent},
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: 'propostas-de-tcc', component: PropostaDeTCCComponent },
      { path: 'propostas-de-tcc/:id', component: PropostaDeTCCAbrirComponent },
      { path: 'proposta-de-tcc/cadastro', component: PropostaDeTccCadastroComponent },
      { path: 'perfil', component: PerfilComponent},
      { path: 'sobre', component: SobreComponent },
      
      { path: '', component: HomeInicioComponent }
    ]
  },
  {path: 'cadastrar-perfil',component: CadastrarPerfilComponent},
  {path: 'editar-perfil',component: EditarPerfilComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
