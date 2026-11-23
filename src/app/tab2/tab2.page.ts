
// Importamos Component para crear la pantalla y OnInit para ejecutar
// una acción cuando la pantalla se inicializa.
import { Component, OnInit } from '@angular/core';

// Importamos los componentes de Ionic que utilizaremos en el HTML.
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonProgressBar
} from '@ionic/angular';

// Importamos addIcons para registrar los iconos que utilizaremos.
import { addIcons } from 'ionicons';

// Importamos los iconos de completar y no completar una misión.
import { checkmarkCircleOutline, ellipseOutline } from 'ionicons/icons';

// Definimos la estructura que tendrá cada misión.
interface Mission {
  id: number;           // Identificador único de la misión.
  title: string;        // Nombre de la misión.
  description: string;  // Explicación de lo que se debe realizar.
  icon: string;         // Emoji que representa la misión.
  completed: boolean;   // Indica si la misión está completada.
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],

  // Declaramos los componentes de Ionic que utilizaremos en esta pantalla.
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonProgressBar
  ],
})
export class Tab2Page implements OnInit {

  // Clave utilizada para identificar las misiones guardadas
  // en el almacenamiento local del navegador o dispositivo.
  private readonly storageKey = 'bloom_missions';

  // Lista inicial de misiones que se mostrarán en la pantalla.
  missions: Mission[] = [
    {
      id: 1,
      title: 'Hidratación consciente',
      description: 'Tomá suficiente agua durante el día.',
      icon: '💧',
      completed: false
    },
    {
      id: 2,
      title: 'Un momento para leer',
      description: 'Dedicá 15 minutos a leer algo que te guste.',
      icon: '📖',
      completed: false
    },
    {
      id: 3,
      title: 'Movimiento y energía',
      description: 'Realizá algunos minutos de actividad física.',
      icon: '🌷',
      completed: false
    },
    {
      id: 4,
      title: 'Ordená tu espacio',
      description: 'Organizá un pequeño rincón de tu entorno.',
      icon: '🪴',
      completed: false
    },
    {
      id: 5,
      title: 'Tiempo para vos',
      description: 'Regalate un momento de descanso.',
      icon: '🧘',
      completed: false
    }
  ];

  // Constructor: se ejecuta al crear la pantalla.
  constructor() {

    // Registramos los iconos para poder utilizarlos en el HTML.
    addIcons({
      checkmarkCircleOutline,
      ellipseOutline
    });
  }

  // ngOnInit se ejecuta cuando Angular inicializa el componente.
  // Lo utilizamos para recuperar el progreso de las misiones guardadas.
  ngOnInit(): void {
    this.loadMissions();
  }

  // Getter que calcula cuántas misiones fueron completadas.
  // filter() selecciona solamente las misiones cuyo completed es true.
  get completedMissions(): number {
    return this.missions.filter(mission => mission.completed).length;
  }

  // Getter que calcula el progreso general de las misiones.
  // Divide las misiones completadas por el total de misiones.
  // El resultado es un valor entre 0 y 1.
  get progress(): number {
    return this.missions.length > 0
      ? this.completedMissions / this.missions.length
      : 0;
  }

  // Cambia el estado de una misión:
  // si estaba pendiente, la marca como completada;
  // si estaba completada, vuelve a dejarla pendiente.
  toggleMission(mission: Mission): void {
    mission.completed = !mission.completed;

    // Después de cambiar el estado, guardamos la lista actualizada.
    this.saveMissions();
  }

  // Recupera las misiones que fueron guardadas anteriormente.
  private loadMissions(): void {

    // Buscamos en localStorage los datos asociados a nuestra clave.
    const savedMissions = localStorage.getItem(this.storageKey);

    // Comprobamos si existen datos guardados.
    if (savedMissions) {
      try {

        // Convertimos el texto JSON recuperado en una lista de misiones.
        const parsedMissions: Mission[] = JSON.parse(savedMissions);

        // Recorremos las misiones iniciales para recuperar su estado.
        this.missions = this.missions.map(mission => {

          // Buscamos la misión guardada que tenga el mismo identificador.
          const savedMission = parsedMissions.find(
            saved => saved.id === mission.id
          );

          // Conservamos los datos iniciales y recuperamos
          // el estado de completado de la misión guardada.
          return {
            ...mission,
            completed: savedMission?.completed ?? false
          };
        });

      } catch (error) {

        // Si los datos guardados no se pueden interpretar,
        // mostramos el error en la consola.
        console.error('Error al recuperar las misiones:', error);
      }
    }
  }

  // Guarda la lista actual de misiones en localStorage.
  private saveMissions(): void {

    // JSON.stringify convierte la lista de objetos en texto JSON,
    // que es el formato que localStorage puede almacenar.
    localStorage.setItem(this.storageKey, JSON.stringify(this.missions));
  }

}
