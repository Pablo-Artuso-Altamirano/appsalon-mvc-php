<?php

namespace Model;

class Servicio extends ActiveRecord {
    //Base de datos
    //se coloca asi por la funcion que esta en el ActiveRecord
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio'];

    public $id;
    public $nombre;
    public $precio;
                                
    public function __construct($args = []) { //args es "arreglo"
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->precio = $args['precio'] ?? '';
    }

    public function validarServicio() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Servicio es Obligatorio';
        }
        if(!$this->precio) {
            self::$alertas['error'][] = 'El Precio del Servicio es Obligatorio';
        }
        if(!is_numeric($this->precio)) { //obliga a ingresar numero solamente y no string
            self::$alertas['error'][] = 'El precio no es válido';
        }

        return self::$alertas;
    }
}