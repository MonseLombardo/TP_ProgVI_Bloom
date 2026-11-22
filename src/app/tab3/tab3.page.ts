
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonText
} from '@ionic/angular';

import { TipsService } from '../services/tips.service';
import { Tip } from '../services/tip.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonText
  ],
})
export class Tab3Page implements OnInit {

  tips: Tip[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private tipsService: TipsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('1. Se inició la pantalla Descubrir');
    this.loadTips();
  }

  loadTips(): void {
    console.log('2. Se llamó a loadTips()');

    this.tipsService.getTips().subscribe({

      next: (data) => {
        console.log('3. Se recibieron los consejos:', data);

        this.tips = data;
        this.isLoading = false;

        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Error al cargar los consejos:', error);

        this.errorMessage =
          'No pudimos cargar los consejos. Intentá nuevamente.';

        this.isLoading = false;

        this.cdr.markForCheck();
      },

      complete: () => {
        console.log('4. La petición terminó');
      }

    });
  }
}
