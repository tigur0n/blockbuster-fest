/* variables */
const botonMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const enlaces = document.querySelectorAll(".menu-navegacion a");
const formulario = document.getElementById("formulario-reserva");

/* menu */
botonMenu.addEventListener("click", function() {
    menu.classList.toggle("activo");
});

/* menu enlaces con click */
enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        menu.classList.remove("activo"); 
    });
});

/* formulario */
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    // Recopilar datos
    const nombreInput = document.getElementById("nombre").value.trim();
    const correoInput = document.getElementById("correo").value.trim();
    const tarifaSelect = document.getElementById("tarifa-seleccionada");
    const tarifaNombre = tarifaSelect.options[tarifaSelect.selectedIndex].text;
    const cantidad = document.getElementById("cantidad").value;

    // Si faltan campos por llenar
    if (nombreInput === "" || correoInput === "") {
        alert("¡Error en la solicitud!\nNo se puede realizar la solicitud porque faltan campos por llenar.\nPor favor, ingresa tu nombre y correo electrónico.");
    } else {
        // Alerta de confirmación exitosa si todo está completo
        alert("¡Reserva confirmada, " + nombreInput + "!\nHas adquirido " + cantidad + " pase(s) para la siguiente opción:\n" + tarifaNombre + ".\nNos vemos en la Galería de Cristal.");
        formulario.reset(); 
    }
});
