import { AbrirPropostaDeEstagioComponent } from './proposta-estagio/abrir-proposta-de-estagio/abrir-proposta-de-estagio.component';
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
import { AbrirPropostaDeTCCComponent } from './proposta-de-tcc/abrir-proposta-de-tcc/abrir-proposta-de-tcc.component';
import { CadastrarPropostaDeTccComponent } from './proposta-de-tcc/cadastrar-proposta-de-tcc/cadastrar-proposta-de-tcc.component';
import { CadastrarPropostaDeEstagioComponent } from './proposta-estagio/cadastrar-proposta-de-estagio/cadastrar-proposta-de-estagio.component';
import { EditarPropostaDeTccComponent } from './proposta-de-tcc/editar-proposta-tcc/editar-propostata-de-tcc.component';
import { EditarPropostaDeEstagioComponent } from './proposta-estagio/editar-proposta-de-estagio/editar-proposta-de-estagio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    component: InicioComponent,
    children: [
      { path: 'propostas-de-estagio', component: PropostaEstagioComponent },
      {
        path: 'proposta-de-estagio/cadastro',
        component: CadastrarPropostaDeEstagioComponent,
      },
      {
        path: 'proposta-de-estagio/editar/:id',
        component: EditarPropostaDeEstagioComponent,
      },
      {
        path: 'proposta-de-estagio/:id',
        component: AbrirPropostaDeEstagioComponent,
      },

      { path: 'propostas-de-tcc', component: PropostaDeTCCComponent },
      { path: 'propostas-de-tcc/:id', component: AbrirPropostaDeTCCComponent },
      {
        path: 'propostas-de-tcc/editar/:id',
        component: EditarPropostaDeTccComponent,
      },
      {
        path: 'proposta-de-tcc/cadastro',
        component: CadastrarPropostaDeTccComponent,
      },
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'proposta-de-tcc/cadastro',
        component: CadastrarPropostaDeTccComponent,
      },
      { path: 'perfil', component: PerfilComponent },
      { path: 'sobre', component: SobreComponent },
      { path: '', component: HomeInicioComponent },
    ],
  },
  { path: 'cadastrar-perfil', component: CadastrarPerfilComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
