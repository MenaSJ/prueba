import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true, // permite usar el componente sin un modulo
  selector: 'app-dashboard', // selector para este componente
  templateUrl: './dashboard.component.html', // archivo HTML de la plantilla
  styleUrls: ['./dashboard.component.css'], // archivo css para estilos
  imports: [CommonModule, HttpClientModule], // Modulos necesarios
  encapsulation: ViewEncapsulation.Emulated // usa encapsulacion predeterminada para estilos
})
export class DashboardComponent implements OnInit {
  user: any = null; // almacena la informacion del usuario
  loading = true; // Controla el estado de carga
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Se ejecuta cuando el componente se inicia
    this.fetchUserData();
  }

  fetchUserData() {
    const token = localStorage.getItem('accessToken'); // obtiene el token de acceso
    const correo = localStorage.getItem('correo'); // otiene el correo del usuario

    if (!token || !correo) {
      // MUESTRA ALERTA SI LA SESION NO ES VALIDA
      alert('Invalid session. Please log in again.');
      this.router.navigate(['/login']); // Redirige al login
      return;
    }

    this.http
      .get(`http://localhost:3000/usuarios?correo=${correo}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          // respuesta
          console.log('USER DATA FETCHED:', response);
          this.user = response;
          this.loading = false;
        },
        (error) => {
          console.error('ERROR FETCHING USER DATA:', error);
          alert('Failed to fetch user data. Please log in again.');
          this.router.navigate(['/login']);
        }
      );
  }

  downloadReport() {
    // generar pdf
    const { correo } = this.user || {};
    const token = localStorage.getItem('accessToken');
    if (!correo) {
      alert('correo no disponible');
      return;
    }

    this.http
      .post(
        'http://localhost:3000/reporte',
        { correo },
        {
          responseType: 'blob', // Define el tipo de respuesta como blob (PDF)
          headers: { Authorization: `Bearer ${token}` }, // agregamos el header authorization con bearer y la token
          withCredentials: true,
        }
      )
      .subscribe(
        (response) => {
          // genera un enlace para descargar pdf
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob); // genera una url temporal que apunta al contenido del blob
          const a = document.createElement('a'); // crea un elemento <a> para permitir la descarga
          a.href = url;
          a.download = 'user_report.pdf'; // define el nombre del archivo que se descargara
          a.click();
          window.URL.revokeObjectURL(url); 
        },
        (error) => {
          console.error('Error descargando reporte:', error);
          this.errorMessage = 'No se pudo descargar, intenta de nuevo mas tarde.';
        }
      );
  }

  logout() {
    // cierra seseion
    localStorage.removeItem('accessToken'); // Elimina el token
    localStorage.removeItem('correo'); // Elimina el correo
    this.router.navigate(['/login']); // Redirige al login
  }
}
