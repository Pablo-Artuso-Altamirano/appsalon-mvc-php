<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function esUltimo(string $actual, string $proximo) : bool {

    if($actual != $proximo) {
        return true;
    }
    
    return false;
}

//Función que revisa que el usuario este autenticado
function isAuth() : void {
    if(!isset($_SESSION['login'])) {
        header('Location: /login');
    }
}

//Función que revisa que el usuario este autenticado
function isAdmin() : void {
    if(!isset($_SESSION['admin'])) {
        header('Location: /login');
    }
}

//Pasos para hacer una consulta a una base de datos
/*function obtenerServicios() {

    try {
        //Importar las credenciales
        require 'database.php';

        //Consulta SQL
        $sql = "SELECT * from servicios;";

        //Realizar la consulta
        $query = mysqli_query($db, $sql); //(le pasamos la conexión y la variable con la consulta)

        //Acceder al resultado 
        /*(esto se hace en donde lo quiera mostrar colocando (__DIR__ . '/includes/funciones.php)ruta hacia la carpeta y la hoja donde esta la consulta y llamar la funcion colocandola en una variable/
        //mysqli_fetch_... se utiliza para acceder a una consulta que se realizo previamente
        echo 'pre';
        var_dump(mysqli_fetch_assoc($query));
        echo '/pres';

        //Cerrar conexión (opcional) ya que php detecta si hay una conexión abierta lo cierra automaticamente
        mysqli_close($db);

    } catch (\Throwable $th) {
        var_dump($th);
    }


}

obtenerServicios();*/