import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  correo = ''; // almacena el correo del usuario
  password = ''; // almacena la contrasena del usuario
  errorMessage = ''; // almacena el mensaje de error para mostrar en la vista

  constructor(private http: HttpClient, private router: Router) {}

  validateInputs(): boolean {
    // verifica que el correo no este vacio y contenga un @
    if (!this.correo || !this.correo.includes('@')) {
      this.errorMessage = 'please enter a valid email address.';
      return false;
    }

    // verifica que la contrasena no este vacia
    if (!this.password) {
      this.errorMessage = 'password cannot be empty.';
      return false;
    }

    // limpia el mensaje de error si todo es valido
    this.errorMessage = '';
    return true;
  }

  onLogin() {
    // valida las credenciales antes de hacer la peticion
    if (!this.validateInputs()) {
      return;
    }

    // crea el objeto con los datos ingresados
    const data = { correo: this.correo, password: this.password };

    // realizamos la peticion al backend para autenticar al usuario
    this.http.post('http://localhost:3000/auth', data, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log(response);

        // si el backend devuelve un token y correo, los guardamos en localstorage
        if (response.accessToken && response.correo) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('correo', response.correo);
        }

        // navega al dashboard si el login es exitoso
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // maneja errores del backend y muestra un mensaje en la vista
        this.errorMessage = 'login failed: ' + (error.error?.message || 'unknown error');
        console.error(error);
      }
    );
  }

  goToRegister() {
    // navega a la pagina de registro
    this.router.navigate(['/register']);
  }
}
