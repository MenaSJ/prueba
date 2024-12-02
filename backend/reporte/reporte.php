<?php
// incluimos la libreria FPDF para generar archivos pdf
require('fpdf/fpdf.php'); 

// definimos una clase personalizada que extiende la funcionalidad de FPDF
class PDF extends FPDF
{
    // Metodo para configurar el encabezado del pdf
    function Header()
    {
        $this->SetFont('Arial', 'B', 14); // Configuramos la fuente
        $this->Cell(0, 10, 'Reporte de Usuario', 0, 1, 'C'); // Aagregamos un titulo centrado
        $this->Ln(10); // agregamos un salto d linea
    }

    // Metodo para configurar el pie de pagina del pdf
    function Footer()
    {
        $this->SetY(-15); // Posicionamos el pie de pagina a 15 mm del borde inferior
        $this->SetFont('Arial', 'I', 8); // Configuramos la fuente
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo(), 0, 0, 'C'); // Mostramos el numero de pagina centrado
    }
}

// configuramos los encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// mnejamos solicitudes preflight (OPTIONS) enviadas por el cliente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Terminamos el proceso si el metodo es OPTIONS
}

// Verificamos que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // configuramos la zona horaria de Ciudad de Mexico
    date_default_timezone_set('America/Mexico_City');

    // Obtenemos los datos enviados desde el cliente en formato JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // registramos los datos recibidos para depuracion
    error_log(print_r($data, true));

    // verificamos que los datos requeridos esten presentes
    if (!$data || !isset($data['nombre']) || !isset($data['correo']) || !isset($data['fechaCreacion'])) {
        http_response_code(400); // Enviamos un error 400 si faltan datos
        echo json_encode(['error' => 'Datos insuficientes para generar el reporte.']);
        exit; // Terminamos el proceso
    }

    // Asignamos los datos del usuario a la variable $usuario
    $usuario = $data;

    // Obtenemos la fecha y hora actual para el reporte
    $fechaGeneracion = date('d/m/Y H:i:s'); // Formato dd/mm/yyyy hh:mm:ss

    // Creamos el pdf
    $pdf = new PDF();
    $pdf->AddPage(); // agregamos una pagina
    $pdf->SetFont('Arial', '', 12); // configuramos la fuente
    $pdf->Cell(0, 10, 'Nombre: ' . $usuario['nombre'], 0, 1); // mostramos el nombre del usuario
    $pdf->Cell(0, 10, 'Correo: ' . $usuario['correo'], 0, 1); // mostramos el correo
    $pdf->Cell(0, 10, 'Fecha de Registro: ' . $usuario['fechaCreacion'], 0, 1); // Mostramos la fecha de registro
    $pdf->Cell(0, 10, 'Fecha de Generacion del Reporte: ' . $fechaGeneracion, 0, 1); // Mostramos la fecha actual

    // enviamos el PDF como respuesta al cliente
    header('Content-Type: application/pdf');
    $pdf->Output('I', 'reporte_usuario.pdf'); // modo de salida 'I' muestra el PDF en el navegador
} else {
    // si el metodo no es POST, enviamos un error 405
    http_response_code(405); 
    echo json_encode(['error' => 'Metodo no permitido.']); 
    exit; // Terminamos el proceso
}
