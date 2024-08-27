<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        //Crear el objeto de mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port =  $_ENV['EMAIL_PORT'];
        $mail->Username =  $_ENV['EMAIL_USER'];
        $mail->Password =  $_ENV['EMAIL_PASS'];

        //Quien envia el mensaje -- un email o dominio de pagina
        $mail->setFrom('cuantas@appsalon.com');
        $mail->addAddress('cuentas@apsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta';

        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        //Creamos el contenido del mensaje // El .= concatena con el elemento anterior
        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->email . "</strong> has creado tu cuenta en AppSalon, solo debes confirmarla presionando el siguiente enlace.</p>";
        $contenido .= "<p> Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a> </p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar este mensaje.<p/>";
        $contenido .= "</html>";

        //Agregamos el mensaje al body del mail
        $mail->Body = $contenido;

        //Enviar el mail
        $mail->send();
    }



    public function enviarIntrucciones() {
        //Crear el objeto de mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port =  $_ENV['EMAIL_PORT'];
        $mail->Username =  $_ENV['EMAIL_USER'];
        $mail->Password =  $_ENV['EMAIL_PASS'];

        //Quien envia el mensaje -- un email o dominio de pagina
        $mail->setFrom('cuantas@appsalon.com');
        $mail->addAddress('cuentas@apsalon.com', 'AppSalon.com');
        $mail->Subject = 'Reestablece tu password';

        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        //Creamos el contenido del mensaje // El .= concatena con el elemento anterior
        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> has solicitado reestablecer tu password, sigue el siguiente enlace.</p>";
        $contenido .= "<p> Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Reestablecer Password</a> </p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar este mensaje.<p/>";
        $contenido .= "</html>";

        //Agregamos el mensaje al body del mail
        $mail->Body = $contenido;

        //Enviar el mail
        $mail->send();
    }

}