import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // el guard está disponible en toda la aplicación
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {} // inyecta el servicio Router para manejar redirecciones

  canActivate(
    route: ActivatedRouteSnapshot, // informacioo sobre la ruta actual
    state: RouterStateSnapshot // vstado del router en el momento de la activación
  ): Observable<boolean> | Promise<boolean> | boolean {
    // verifica si el usuario está autenticado revisando el localStorage
    const accessToken = localStorage.getItem('accessToken'); // busca el token de acceso
    const correo = localStorage.getItem('correo'); // busca el correo asociado

    if (accessToken && correo) {
      // si hay un token y un correo, el usuario esta autenticado
      return true; // permite la navegación a la ruta solicitada
    } else {
      // si no hay token o correo, el usuario no está autenticado
      this.router.navigate(['/login']); // redirige al usuario a la página de inicio de sesión
      return false; // bloquea la navegación
    }
  }
}
