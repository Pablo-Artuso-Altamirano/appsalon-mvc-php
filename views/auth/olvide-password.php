<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Restablce tu password escribinde tu email a continuación</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" method="POST" action="/olvide">
    <div class="campo">
        <label for="email">Email</label>
        <input
            type="email"
            id="email" 
            placeholder="Tu Email"
            name="email" 
        />
    </div>

    <input type="submit" class="boton" value="Enviar Intrucciones">
</form>

<div class="acciones">
    <a href="/login">¿Ya tienes una cuenta? Inciar Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una</a>
</div>