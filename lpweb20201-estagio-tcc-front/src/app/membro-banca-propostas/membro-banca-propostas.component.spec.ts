import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroBancaPropostasComponent } from './membro-banca-propostas.component';

describe('MembroBancaPropostasComponent', () => {
  let component: MembroBancaPropostasComponent;
  let fixture: ComponentFixture<MembroBancaPropostasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroBancaPropostasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroBancaPropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
