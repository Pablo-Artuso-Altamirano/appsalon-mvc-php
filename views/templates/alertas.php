<?php 
    foreach($alertas as $tipo => $mensajes): // $tipo contiene 'error' o 'exito'
        foreach ($mensajes as $mensaje): // $mensaje contiene cada mensaje individual
?>
    <div class="alerta <?php echo $tipo; ?>">
        <?php echo $mensaje; ?>
    </div>
<?php 
        endforeach;
    endforeach;
?>