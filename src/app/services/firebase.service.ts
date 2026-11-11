import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

/*
{
  "nombres": "Ana Pérez",
  "correo": "ana.ejemplo@correo.test",
  "telefono": "0990000000",
  "fechaNacimiento": "2000-04-15",
  "cargo": "Desarrollador móvil", ---> Lista "Desarrollador Movil", "Desarrollador Web", "Diseñador UX/UI", "Analista de Datos", "Ingeniero de Software"
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

export const CARGOS = [
  "Desarrollador Movil",
  "Desarrollador Web",
  "Diseñador UX/UI",
  "Analista de Datos",
  "Ingeniero de Software"
] as const;

export type CargoDisponible = typeof CARGOS[number];

export interface Candidato {
  nombres: string,
  correo: string,
  telefono: string,
  fechaNacimiento: string,
  cargo: CargoDisponible,
  nivelAcademico: string,
  experienciaAnios: number,
  modalidad: string,
  habilidades: string[],
  fechaDisponibilidad: string,
  aspiracionSalarial: number,
  resumen: string,
  consentimiento: boolean
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app = getApps().length ? getApp() : initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  guardarCandidato(candidato: Candidato) {
    return addDoc(collection(this.db, 'candidatos'), candidato);
  }

  async obtenerCandidatos(): Promise<(Candidato & { id: string })[]> {
    const resultado = await getDocs(collection(this.db, 'candidatos'));
    return resultado.docs.map(doc => ({ id: doc.id, ...(doc.data() as Candidato) }));
  }
}
