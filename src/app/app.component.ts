import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './Service/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontg2';
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login') {
        this.showHeader = false; // Ocultar el encabezado en la ruta "login"
      } else {
        this.showHeader = true; // Mostrar el encabezado en otras rutas
      }
    });
  }
}
