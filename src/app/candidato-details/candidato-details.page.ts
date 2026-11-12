import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonChip, IonSpinner,
} from '@ionic/angular/standalone';
import { FirebaseService, CandidatoGuardado } from '../services/firebase.service';

@Component({
  selector: 'app-candidato-details',
  standalone: true,
  templateUrl: './candidato-details.page.html',
  styleUrls: ['./candidato-details.page.css'],
  imports: [
    DatePipe, CurrencyPipe,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonList, IonItem, IonLabel,
    IonChip, IonSpinner,
  ],
})
export class CandidatoDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);

  candidato: CandidatoGuardado | null = null;
  cargando = true;
  mensaje = '';

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.detalleCandidato(id);
    } else {
      this.mensaje = 'No se indicó un candidato.';
      this.cargando = false;
    }
  }

  async detalleCandidato(id: string) {
    try {
      this.candidato = await this.firebaseService.obtenerCandidatoPorId(id);
      if (!this.candidato) {
        this.mensaje = 'No se encontró un candidato con ese ID.';
      }
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo consultar Firestore.';
    } finally {
      this.cargando = false;
    }
  }
}