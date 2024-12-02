import { Routes } from '@angular/router'; 
import { RegisterComponent } from './pages/register/register.component'; // Componente para registro
import { LoginComponent } from './pages/login/login.component'; // Componente para la inicio de sesion
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Componente para el tpanel
import { AuthGuard } from './auth/auth.guard'; // Guard para proteger rutas 

// definicion de rutas de la aplicación
export const routes: Routes = [
  { 
    path: '', // Ruta raiz
    redirectTo: '/login', // Redirige la página de inicio de sesion
    pathMatch: 'full' // Asegura que la redireccion ocurra solo si el path esta vacio
  },
  { 
    path: 'register', // ruta para la pagina de registro
    component: RegisterComponent // carga el componente 
  },
  { 
    path: 'login', // ruta para la página de inicio de sesión
    component: LoginComponent 
  },
  { 
    path: 'dashboard', // Ruta para el panel
    component: DashboardComponent, 
    canActivate: [AuthGuard] // protege esta ruta con el AuthGuard
  },
];
