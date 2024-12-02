# Proyecto: Dashboard de Usuario

## Descripción
Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión, ver su información personal, y descargar reportes en formato PDF. Desarrollado con **Angular** para el frontend, un backend en **Node.js**, una base de datos **PostgreSQL**, y un servidor **PHP** para el manejo de PDFs.


## Requisitos previos
- [Node.js](https://nodejs.org/) (v14 o superior)
- [Angular CLI](https://angular.io/cli) (v13 o superior)
- [PostgreSQL](https://www.postgresql.org/) (para la base de datos)
- [PHP](https://www.php.net/) (v7.4 o superior)


## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/proyecto-dashboard.git
cd pruebatec
```

### 2. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 3. Instalar dependencias del backend
```bash
cd ../backend
npm install
```

## Configuración

### 1. Configurar variables de entorno (backend)
Crea un archivo `.env` en el directorio `backend` con el siguiente contenido y llena las variables faltantes con tus propios valores:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
ACCESS_TOKEN_SECRET=tu_clave_secreta_para_access_token
REFRESH_TOKEN_SECRET=tu_clave_secreta_para_refresh_token

```

### 2. Configurar el frontend
Si el backend está en un servidor distinto, actualiza la URL base de los archivos en los directorios `frontend/src/app/pages/~` tendras que cambiar manualmente cada directorio:


## Ejecución

### 1. Iniciar el backend
```bash
cd backend
npm run dev
```
El backend estará disponible en [http://localhost:3000](http://localhost:3000).

### 2. Iniciar el frontend
En otra terminal:
```bash
cd frontend
ng serve
```
El frontend estará disponible en [http://localhost:4200](http://localhost:4200).

### 3. Iniciar el servidor PHP
En otra terminal:
```bash
cd backend/reporte
php -S localhost:8000
```
El servidor estará disponible en [http://localhost:8000](http://localhost:8000).

## Uso
1. Accede a [http://localhost:4200](http://localhost:4200) en tu navegador.
2. Regístrate o inicia sesión con un usuario existente.
3. Navega al dashboard para descargar reportes o cerrar sesión.


## Estructura del proyecto
```
proyecto-dashboard/
├── frontend/           # Código del frontend en Angular
├── backend/            # Código del backend en Node.js
    └── reporte/         # Código del servidor PHP para generar PDFs
```
