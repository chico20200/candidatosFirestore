import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel, 
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

  import {
  FirebaseService,
  Candidato,
  CARGOS,
  CargoDisponible,
} from '../services/firebase.service';


@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.page.html',
  styleUrls: ['./candidatos.page.css'],
  imports: [
    RouterLink,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonList, 
    IonListHeader, 
    IonItem, 
    IonLabel, 
    CommonModule, 
    FormsModule,
    IonButtons,
    IonBackButton
  ]
})
export class CandidatosPage implements OnInit {

  private firebaseService = inject(FirebaseService);

  mensaje = '';
  
  async ngOnInit() {
    this.cargarCandidatos();
  }

  candidatos: (Candidato & { id: string })[] = [];
  async cargarCandidatos() {
    try {
      this.candidatos = await this.firebaseService.obtenerCandidatos();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo consultar Firestore. Revise la configuración.';
    }
  }


}
