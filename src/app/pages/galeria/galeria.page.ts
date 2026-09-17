import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel,
  IonGrid, IonRow, IonCol,
  IonFab, IonFabButton, IonIcon, IonSpinner,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { PerrosService, Perro } from '../../services/perros.service';
import { TarjetaPerroComponent } from '../../components/tarjeta-perro/tarjeta-perro.component';

@Component({
  selector: 'app-galeria',
  templateUrl: 'galeria.page.html',
  styleUrls: ['galeria.page.scss'],
  standalone: true,
  imports: [
    FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonLabel,
    IonGrid, IonRow, IonCol,
    IonFab, IonFabButton, IonIcon, IonSpinner,
    TarjetaPerroComponent,
  ],
})
export class GaleriaPage implements ViewWillEnter {
  private servicio = inject(PerrosService);

  // Lo que se ve en pantalla va en signals: cuando cambian, Angular sabe qué
  // redibujar, aunque el cambio llegue después de un await.
  filtro = signal<'todos' | 'disponibles' | 'adoptados'>('todos');
  cargando = signal(false);
  private todos = signal<Perro[]>([]);

  // computed() se recalcula solo cuando cambian los signals que lee.
  perros = computed(() => {
    const todos = this.todos();
    if (this.filtro() === 'disponibles') return todos.filter((p) => !p.adoptado);
    if (this.filtro() === 'adoptados') return todos.filter((p) => p.adoptado);
    return todos;
  });

  totalTodos = computed(() => this.todos().length);
  totalDisponibles = computed(() => this.todos().filter((p) => !p.adoptado).length);
  totalAdoptados = computed(() => this.todos().filter((p) => p.adoptado).length);

  constructor() {
    addIcons({ add });
  }

  async ionViewWillEnter() {
    await this.cargar();
  }

  private async cargar() {
    this.cargando.set(this.todos().length === 0);
    this.todos.set(await this.servicio.todas());
    this.cargando.set(false);
  }
}
