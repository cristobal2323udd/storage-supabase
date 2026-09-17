import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonToggle, IonButton, IonText, IonSpinner,
} from '@ionic/angular';
import { PerrosService } from '../../services/perros.service';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: 'nuevo.page.html',
  styleUrls: ['nuevo.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonToggle, IonButton, IonText, IonSpinner,
  ],
})
export class NuevoPage {
  private servicio = inject(PerrosService);
  private fotos = inject(FotosService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  cargandoFoto = signal(false);

  form = this.fb.nonNullable.group({
    foto: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    raza: ['', Validators.required],
    edad: ['', Validators.required],
    tipo: ['Perro', Validators.required],
    sexo: ['Macho', Validators.required],
    tamano: ['Mediano', Validators.required],
    vacunada: [false],
    descripcion: ['', Validators.required],
  });

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  // Carga la foto elegida a Supabase Storage y guarda su URL pública en el formulario.
  async alElegirArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;
    this.cargandoFoto.set(true);
    try {
      const url = await this.fotos.cargar(archivo);
      this.form.patchValue({ foto: url });
    } finally {
      this.cargandoFoto.set(false);
      input.value = ''; // permite volver a elegir el mismo archivo
    }
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = this.form.getRawValue();
    await this.servicio.agregar({
      nombre: datos.nombre.trim(),
      tipo: datos.tipo,
      raza: datos.raza.trim(),
      edad: datos.edad.trim(),
      sexo: datos.sexo,
      tamano: datos.tamano,
      vacunada: datos.vacunada,
      descripcion: datos.descripcion.trim(),
      foto: datos.foto.trim() || 'https://placedog.net/600/600?id=20',
      adoptado: false,
    });
    this.router.navigateByUrl('/');
  }
}
