import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatoDetailsPage } from './candidato-details.page';

describe('CandidatoDetailsPage', () => {
  let component: CandidatoDetailsPage;
  let fixture: ComponentFixture<CandidatoDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
