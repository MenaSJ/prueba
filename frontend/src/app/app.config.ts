import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importamos FormsModule
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    FormsModule, // agregamos FormsModule para ngModel soporte
  ],
};
