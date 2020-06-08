import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { PropostasDeTCCComponent } from './propostas-de-tcc/propostas-de-tcc.component';
import { PropostaEstagioComponent } from './proposta-estagio/proposta-estagio.component';

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
    PropostaDeTCCComponent,
    PropostasDeTCCComponent,
    PropostaEstagioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
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
