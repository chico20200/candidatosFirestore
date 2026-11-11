import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonList, 
  IonLabel, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonCheckbox,
  IonTextarea
} from '@ionic/angular/standalone';
import { FirebaseService, Candidato } from '../services/firebase.service';

/*
{
  "nombres": "Ana Pérez",
  "correo": "ana.ejemplo@correo.test",
  "telefono": "0990000000",
  "fechaNacimiento": "2000-04-15",
  "cargo": "Desarrollador móvil",
  "nivelAcademico": "Tercer nivel",
  "experienciaAnios": 3,
  "modalidad": "Híbrida",
  "habilidades": ["Ionic", "Angular", "Git"],
  "fechaDisponibilidad": "2026-12-01",
  "aspiracionSalarial": 1200,
  "resumen": "Desarrolladora de aplicaciones móviles con experiencia en interfaces y servicios web.",
  "consentimiento": true
}
*/

@Component({
  selector: 'app-home', standalone: true, templateUrl: './home.page.html', styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonList, 
    IonLabel, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    IonDatetime,
    IonRadioGroup,
    IonRadio,
    IonSelect,
    IonCheckbox,
    IonTextarea
  ]
})
export class HomePage implements OnInit {
  private firebase = inject(FirebaseService);

  nombres = '';
  correo = '';
  telefono = '';
  fechaNacimiento = '';
  cargo = '';
  nivelAcademico = '';
  experienciaAnios = 0;
  modalidad = '';
  habilidades: string[] = [];
  fechaDisponibilidad = '';
  aspiracionSalarial = 0;
  resumen = '';
  consentimiento = false;
  

  candidatos: (Candidato & { id: string })[] = [];
  guardando = false;
  mensaje = '';

  async ngOnInit() { await this.cargarCandidatos(); }

  async guardar() {
    if (
      !this.nombres.trim() || 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo.trim()) ||
      !this.fechaNacimiento.trim() ||
      !this.cargo.trim() ||
      !this.nivelAcademico.trim() ||
      this.experienciaAnios < 0 ||
      !this.modalidad.trim() ||
      this.habilidades.length === 0 ||
      !this.fechaDisponibilidad.trim() ||
      this.aspiracionSalarial < 0 ||
      !this.resumen.trim() ||
      !this.consentimiento
    ) 
      {
      this.mensaje = 'Ingrese información válida.';
      return;
    }
    this.guardando = true;
    this.mensaje = '';
    try {
      await this.firebase.guardarCandidato({ nombres: this.nombres.trim(), correo: this.correo.trim(), telefono: this.telefono, fechaNacimiento: this.fechaNacimiento, cargo: this.cargo, nivelAcademico: this.nivelAcademico, experienciaAnios: this.experienciaAnios, modalidad: this.modalidad, habilidades: this.habilidades, fechaDisponibilidad: this.fechaDisponibilidad, aspiracionSalarial: this.aspiracionSalarial, resumen: this.resumen, consentimiento: this.consentimiento });
      this.nombres = ''; this.correo = '';
      this.mensaje = 'Candidato guardado correctamente.';
      await this.cargarCandidatos();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo guardar. Revise la configuración y las reglas de Firestore.';
    } finally { this.guardando = false; }
  }

  async cargarCandidatos() {
    try { this.candidatos = await this.firebase.obtenerCandidatos(); }
    catch (error) { console.error(error); this.mensaje = 'No se pudo consultar Firestore. Revise la configuración.'; }
  }
}
