import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEstadoComponent } from './tabela-estado.component';

describe('TabelaEstadoComponent', () => {
  let component: TabelaEstadoComponent;
  let fixture: ComponentFixture<TabelaEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
