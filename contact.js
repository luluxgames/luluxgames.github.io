function procesa_envio(event) {
    event.preventDefault();

    console.log("Procesando envío.");
    
    let nombre = document.getElementById("name");
    let email = document.getElementById("email");
    let mensaje = document.getElementById("message");
    let salida = document.getElementById("salida");
    let valido = true;

    function marcarCampo(campo, correcto) {
        if (correcto) {
            campo.style.border = "2px solid green";
            campo.style.color = "black";
        } else {
            campo.style.border = "2px solid red";
            campo.style.color = "red";
            valido = false;
        }
    }

    if (nombre.value.length < 2) {
        salida.innerText = "El nombre debe tener al menos 2 caracteres.";
        marcarCampo(nombre, false);
        nombre.focus();
    } else {
        marcarCampo(nombre, true);
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        salida.innerText = "Introduce un email válido.";
        marcarCampo(email, false);
    } else {
        marcarCampo(email, true);
    }

    if (mensaje.value.length < 5) {
        salida.innerText = "El mensaje debe tener al menos 5 caracteres.";
        marcarCampo(mensaje, false);
    } else {
        marcarCampo(mensaje, true);
    }

    if (valido) {
        salida.innerText = "Formulario enviado correctamente.";
        salida.style.color = "green";
        document.getElementById("form_contacto").submit();
    }
}