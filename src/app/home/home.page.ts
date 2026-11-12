import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonTextarea,
  IonButton,
} from '@ionic/angular/standalone';
import {
  FirebaseService,
  Candidato,
  CARGOS,
  CargoDisponible,
} from '../services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    RouterLink,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonCheckbox,
    IonTextarea,
    IonButton,
  ],
})
export class HomePage implements OnInit {
  private firebase = inject(FirebaseService);

  // Opciones para los selects y radios
  cargos = CARGOS;
  niveles = ['Bachillerato', 'Tecnólogo', 'Tercer nivel', 'Cuarto nivel'];
  modalidades = ['Presencial', 'Remota', 'Híbrida'];
  listaHabilidades = [
    'Ionic', 'Angular', 'TypeScript', 'JavaScript', 'HTML/CSS',
    'Git', 'Firebase', 'SQL', 'Python', 'Figma',
  ];

  // Campos del formulario
  nombres = '';
  correo = '';
  telefono = '';
  fechaNacimiento = '';
  cargo: CargoDisponible | '' = '';
  nivelAcademico = '';
  experienciaAnios: number | null = null;
  modalidad = '';
  habilidades: string[] = [];
  fechaDisponibilidad = '';
  aspiracionSalarial: number | null = null;
  resumen = '';
  consentimiento = false;
  fechaRegistro: Date | null = null;

  candidatos: (Candidato & { id: string })[] = [];
  guardando = false;
  mensaje = '';

  async ngOnInit() {
    
  }

  /** Devuelve un mensaje de error, o null si todo está bien. */
  private validar(): string | null {
    if (!this.nombres.trim()) return 'Ingrese sus nombres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo.trim())) return 'Ingrese un correo válido.';
    if (!/^\d{10}$/.test(this.telefono.trim())) return 'El teléfono debe tener 10 dígitos.';
    if (!this.fechaNacimiento) return 'Seleccione su fecha de nacimiento.';
    if (!this.cargo) return 'Seleccione un cargo.';
    if (!this.nivelAcademico) return 'Seleccione su nivel académico.';
    if (this.experienciaAnios === null || Number(this.experienciaAnios) < 0) return 'Ingrese sus años de experiencia.';
    if (!this.modalidad) return 'Seleccione una modalidad.';
    if (this.habilidades.length === 0) return 'Seleccione al menos una habilidad.';
    if (!this.fechaDisponibilidad) return 'Seleccione su fecha de disponibilidad.';
    if (this.aspiracionSalarial === null || Number(this.aspiracionSalarial) <= 0) return 'Ingrese su aspiración salarial.';
    if (!this.resumen.trim()) return 'Escriba un resumen de su perfil.';
    if (!this.consentimiento) return 'Debe aceptar el tratamiento de sus datos.';
    return null;
  }

  async guardar() {
    const error = this.validar();
    if (error) {
      this.mensaje = error;
      return;
    }

    this.guardando = true;
    this.mensaje = '';

    try {
      await this.firebase.guardarCandidato({
        nombres: this.nombres.trim(),
        correo: this.correo.trim(),
        telefono: this.telefono.trim(),
        fechaNacimiento: this.fechaNacimiento,
        cargo: this.cargo as CargoDisponible,
        nivelAcademico: this.nivelAcademico,
        experienciaAnios: Number(this.experienciaAnios),
        modalidad: this.modalidad,
        habilidades: this.habilidades,
        fechaDisponibilidad: this.fechaDisponibilidad,
        aspiracionSalarial: Number(this.aspiracionSalarial),
        resumen: this.resumen.trim(),
        consentimiento: this.consentimiento,
      });
      this.limpiar();
      this.mensaje = 'Candidato guardado correctamente.';
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo guardar. Revise la configuración y las reglas de Firestore.';
    } finally {
      this.guardando = false;
    }
  }

  private limpiar() {
    this.nombres = '';
    this.correo = '';
    this.telefono = '';
    this.fechaNacimiento = '';
    this.cargo = '';
    this.nivelAcademico = '';
    this.experienciaAnios = null;
    this.modalidad = '';
    this.habilidades = [];
    this.fechaDisponibilidad = '';
    this.aspiracionSalarial = null;
    this.resumen = '';
    this.consentimiento = false;
  }

  /*
  async cargarCandidatos() {
    try {
      this.candidatos = await this.firebase.obtenerCandidatos();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo consultar Firestore. Revise la configuración.';
    }
  }
    
  */
}
