import { Component, input } from '@angular/core';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonBadge,
} from '@ionic/angular';
import { Perro } from '../../services/perros.service';

@Component({
  selector: 'app-tarjeta-perro',
  templateUrl: 'tarjeta-perro.component.html',
  styleUrls: ['tarjeta-perro.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonBadge],
})
export class TarjetaPerroComponent {
  // input.required(): la página siempre le pasa un perro, y se lee como signal.
  perro = input.required<Perro>();
}
