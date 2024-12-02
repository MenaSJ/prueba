import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// configuracion especifica para el lado del servidor
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // habilita la renderizacion en el servidor
    provideServerRoutesConfig(serverRoutes) // configura las rutas del servidor
  ]
};

// fusiona la configuracion general de la aplicacion con la configuracion del servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
