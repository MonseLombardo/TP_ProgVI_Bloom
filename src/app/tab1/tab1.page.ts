
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

// Herramienta para registrar los iconos.
import { addIcons } from 'ionicons';

// Dibujos que utilizaremos en la pantalla.
import {
  checkmarkCircle,
  ellipseOutline,
  addCircleOutline
} from 'ionicons/icons';

// Componentes de Ionic que utiliza el HTML.
// ModalController permite abrir y controlar ventanas modales.
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  ModalController
} from '@ionic/angular';

// Componente que contiene el formulario para agregar hábitos.
import { AddHabitComponent } from '../add-habit/add-habit.component';

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
  category: string;
  time: string;
  completed: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

  // Componentes que utiliza directamente el HTML de esta pantalla.
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon
  ],
})
export class Tab1Page implements OnInit {

  // Inyectamos el controlador de ventanas modales.
  constructor(private modalController: ModalController, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const savedHabits = localStorage.getItem('bloom_habits');

    if (savedHabits) {
      this.habits = JSON.parse(savedHabits);
    }
  }


  saveHabits(): void {
    localStorage.setItem('bloom_habits', JSON.stringify(this.habits));
  }

  // Lista inicial de hábitos.
  habits: Habit[] = [
    {
      id: 1,
      name: 'Tomar agua',
      category: 'salud',
      time: '08:00',
      completed: true
    },
    {
      id: 2,
      name: 'Leer 20 minutos',
      category: 'estudio',
      time: '10:00',
      completed: true
    },
    {
      id: 3,
      name: 'Hacer ejercicio',
      category: 'bienestar',
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
      this.saveHabits();
    }
  }

  // Abre la ventana para agregar un nuevo hábito.
  async openAddHabitModal(): Promise<void> {

    // Creamos el modal e indicamos qué componente mostrará.
    const modal = await this.modalController.create({
      component: AddHabitComponent
    });

    // Mostramos la ventana en pantalla.
    await modal.present();

    // Esperamos a que el modal se cierre y devuelva sus datos.
    const { data, role } = await modal.onWillDismiss();

    // Si no hay datos o no se confirmó, no agregamos nada.
    if (role !== 'confirm' || !data) {
      return;
    }

    // Creamos el nuevo hábito y lo agregamos a la lista.
    const newHabit: Habit = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      time: data.time.split('T')[1]?.slice(0, 5) ?? data.time,
      completed: false
    };

    this.habits.push(newHabit);
    this.saveHabits();

    // Le avisamos a Angular que debe actualizar la pantalla.
    this.changeDetectorRef.detectChanges();
  }

}
