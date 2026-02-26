import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';             // composant standalone
import { routes } from './app/app.routes';   // tableau de routes

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),        // HTTP pour tes services
    provideRouter(routes)       // Routes définies dans app.routes.ts
  ]
}).catch(err => console.error(err));