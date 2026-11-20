
import { Component } from '@angular/core';

// Herramienta para registrar los iconos.
import { addIcons } from 'ionicons';

// Dibujos que utilizaremos en la pantalla.
import {
  checkmarkCircle,
  ellipseOutline,
  addCircleOutline
} from 'ionicons/icons';

// Componentes de Ionic que utiliza el HTML.
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/angular';

// Registramos los iconos para que Ionic pueda mostrarlos.
addIcons({
  'checkmark-circle': checkmarkCircle,
  'ellipse-outline': ellipseOutline,
  'add-circle-outline': addCircleOutline
});

// INTERFAZ: define la estructura de cada hábito.
interface Habit {
  id: number;
  name: string;
  time: string;
  completed: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
})
export class Tab1Page {

  // Lista inicial de hábitos.
  habits: Habit[] = [
    {
      id: 1,
      name: 'Tomar agua',
      time: '08:00',
      completed: true
    },
    {
      id: 2,
      name: 'Leer 20 minutos',
      time: '10:00',
      completed: true
    },
    {
      id: 3,
      name: 'Hacer ejercicio',
      time: '16:00',
      completed: false
    }
  ];

  // Cuenta los hábitos completados.
  get completedHabits(): number {
    return this.habits.filter(habit => habit.completed).length;
  }

  // Calcula el porcentaje de progreso.
  get progress(): number {
    if (this.habits.length === 0) {
      return 0;
    }

    return (this.completedHabits / this.habits.length) * 100;
  }

  // Cambia el estado del hábito seleccionado.
  toggleHabit(id: number): void {
    const habit = this.habits.find(h => h.id === id);

    if (habit) {
      habit.completed = !habit.completed;
    }
  }
}
