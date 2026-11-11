import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatosPage } from './candidatos.page';

describe('CandidatosPage', () => {
  let component: CandidatosPage;
  let fixture: ComponentFixture<CandidatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
