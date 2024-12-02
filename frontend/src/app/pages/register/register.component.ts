import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // Modulo comun para directivas como *ngIf
import { FormsModule } from '@angular/forms'; // Modulo para [(ngModel)]
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Para peticiones HTTP
import { Router } from '@angular/router'; // Para la navegacion

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent {
  nombre = ''; // almacena el nombre del usuario
  correo = ''; // almacena el correo del usuario
  password = ''; // almacena la contrasena del usuario
  confirmPassword = ''; // almacena la confirmacion de la contrasena
  errorMessage = ''; // almacena los mensajes de error para mostrar en la vista

  // patron para validar contrasenas (una mayuscula, un caracter especial, minimo 6 caracteres)
  passwordPattern = '^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{6,}$';

  constructor(private http: HttpClient, private router: Router) {}

  // Metodo para validar que las contrasenas coincidan
  validatePasswords(): boolean {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'las contrasenas no coinciden.';
      return false;
    }
    return true;
  }

  // Metodo para manejar el registro
  onRegister() {
    // Validar que las contrasenas coincidan antes de enviar la peticion
    if (!this.validatePasswords()) {
      return;
    }

    // Prepara los datos del registro
    const data = { nombre: this.nombre, correo: this.correo, password: this.password };

    // Realiza la peticion al backend
    this.http.post('http://localhost:3000/register', data).subscribe(
      (response) => {
        this.errorMessage = ''; // limpia cualquier error previo
        console.log(response);

        // Navega a la pagina de login tras un registro exitoso
        this.router.navigate(['/login']);
      },
      (error) => {
        // Maneja los errores y los muestra en la vista
        this.errorMessage = error.error?.message || 'error desconocido durante el registro.';
        console.error(error);
      }
    );
  }

  // Metodo para navegar a la pagina de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
