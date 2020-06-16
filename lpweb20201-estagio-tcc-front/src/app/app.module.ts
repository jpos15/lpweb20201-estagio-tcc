import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
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

registerLocaleData(localePt, 'pt', localePtExtra);


@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    LoginComponent,
    SobreComponent,
    PaginaNaoEncontradaComponent,
    InicioComponent,
    HomeInicioComponent,
    PropostaDeTCCAbrirComponent,
    PropostaDeTCCComponent,
    PropostaEstagioComponent,
    CadastrarPerfilComponent,
    EditarPerfilComponent,
    PropostaDeTccCadastroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
