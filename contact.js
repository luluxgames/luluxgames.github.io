function procesa_envio(event)
{
	event.preventDefault();
	
	console.log("Procesando envío.");
	
	let nombre = document.getElementById("name");
	let salida = document.getElementById("salida");
	
	if (nombre.value.length < 2){
		salida.value = "El nombre debe tener al menos 2 caracteres.";
		
		salida.style.color = "#ff0000";
		nombre.style.color = "#ff0000";
		nombre.style.border = "2px solid red";
		
		nombre.focus();
		
		return false;
	}
	
	let email = document.getElementById("email");
	
	if (email.value.length < 6){
		salida.value = "El email debe tener al menos 6 caracteres.";
		
		salida.style.color = "#ff0000";
		email.style.color = "#ff0000";
		email.style.border = "2px solid red";
		
		return false;
	}
	
	document.getElementById("form_contacto").submit();
}