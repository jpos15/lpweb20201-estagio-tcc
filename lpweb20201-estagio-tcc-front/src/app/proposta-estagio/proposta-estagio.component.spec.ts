import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaEstagioComponent } from './proposta-estagio.component';

describe('PropostaEstagioComponent', () => {
  let component: PropostaEstagioComponent;
  let fixture: ComponentFixture<PropostaEstagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaEstagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaEstagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
