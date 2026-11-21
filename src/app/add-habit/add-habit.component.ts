
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
  ModalController
} from '@ionic/angular';

@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
  styleUrls: ['./add-habit.component.scss'],
  imports: [
    FormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonDatetime
  ],
})
export class AddHabitComponent {

  // Guarda el nombre del hábito.
  habitName: string = '';

  // Guarda la categoría seleccionada.
  habitCategory: string = '';

  // Guarda el horario elegido.
  habitTime: string = '';

  // Inyectamos el controlador para manejar la ventana modal.
  constructor(private modalController: ModalController) { }

  // Guarda el nuevo hábito y devuelve sus datos a la pantalla principal.
  async saveHabit(): Promise<void> {

    // Mostramos los valores recibidos del formulario.
    console.log('Datos del formulario:', {
      nombre: this.habitName,
      categoria: this.habitCategory,
      horario: this.habitTime
    });

    // Comprobamos que todos los campos estén completos.
    if (
      !this.habitName.trim() ||
      !this.habitCategory ||
      !this.habitTime
    ) {
      return;
    }

    // Devolvemos los datos a la pantalla principal.
    await this.modalController.dismiss(
      {
        name: this.habitName.trim(),
        category: this.habitCategory,
        time: this.habitTime
      },
      'confirm'
    );
  }

  // Cierra la ventana sin guardar el hábito.
  async cancel(): Promise<void> {
    await this.modalController.dismiss(null, 'cancel');
  }
}
