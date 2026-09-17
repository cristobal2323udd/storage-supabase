import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonChip, IonLabel, IonButton, IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, heart } from 'ionicons/icons';
import { PerrosService, Perro } from '../../services/perros.service';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.page.html',
  styleUrls: ['detalle.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonChip, IonLabel, IonButton, IonIcon,
  ],
})
export class DetallePage implements ViewWillEnter {
  private route = inject(ActivatedRoute);
  private servicio = inject(PerrosService);
  perro = signal<Perro | undefined>(undefined);

  constructor() {
    addIcons({ checkmarkCircle, heart });
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.perro.set(await this.servicio.obtener(id));
  }

  async adoptar() {
    const perro = this.perro();
    if (!perro) return;
    await this.servicio.adoptar(perro.id);
    this.perro.set({ ...perro, adoptado: true });
  }
}
