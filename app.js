var GASTOS_SERVICIO = 1.50;

var botonMenu = document.getElementById("btn-menu");
var menu = document.getElementById("menu");
var enlaces = document.querySelectorAll(".menu-navegacion a");
var formulario = document.getElementById("formulario-reserva");

var resumenLista = document.getElementById('factura-desglose');
var tarifaSelect = document.getElementById('tarifa-seleccionada');
var cantidadInput = document.getElementById('cantidad');
var alertaTaquilla = document.getElementById('mensaje-taquilla');
var campoNombre = document.getElementById('nombre');
var campoEmail = document.getElementById('correo');

function actualizarFacturaPrevia() {
    var precioEntrada = parseFloat(tarifaSelect.value);
    var cantidadPases = parseInt(cantidadInput.value, 10);
    var tarifaTexto = tarifaSelect.options[tarifaSelect.selectedIndex].getAttribute('data-nombre') || "Entrada";
    
    if (isNaN(precioEntrada) || isNaN(cantidadPases) || cantidadPases <= 0) {
        resumenLista.innerHTML = '<li class="resumen__vacio">Todavía no has elegido ningún pase.</li>';
        document.getElementById('factura-pases').textContent = "0";
        document.getElementById('factura-subtotal').textContent = "0,00 €";
        document.getElementById('factura-gastos').textContent = "0,00 €";
        document.getElementById('factura-total').textContent = "0,00 €";
        return;
    }

    var subtotalNeto = precioEntrada * cantidadPases;
    var gastosGestion = cantidadPases * GASTOS_SERVICIO;
    var totalFinal = subtotalNeto + gastosGestion;

    resumenLista.innerHTML = '<li><span>' + cantidadPases + ' × ' + tarifaTexto + '</span><strong>' + subtotalNeto.toFixed(2).replace('.', ',') + ' €</strong></li>';
    
    document.getElementById('factura-pases').textContent = cantidadPases;
    document.getElementById('factura-subtotal').textContent = subtotalNeto.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('factura-gastos').textContent = gastosGestion.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('factura-total').textContent = totalFinal.toFixed(2).replace('.', ',') + ' €';
}

botonMenu.addEventListener("click", function() {
    menu.classList.toggle("activo");
});

enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        menu.classList.remove("activo"); 
    });
});

tarifaSelect.addEventListener('change', actualizarFacturaPrevia);
cantidadInput.addEventListener('input', actualizarFacturaPrevia);

campoNombre.addEventListener('input', function() { campoNombre.classList.remove('is-error'); });
campoEmail.addEventListener('input', function() { campoEmail.classList.remove('is-error'); });

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var nombreVal = campoNombre.value.trim();
    var emailVal = campoEmail.value.trim();
    var erroresDetectados = false;

    if (nombreVal === "") {
        campoNombre.classList.add('is-error');
        erroresDetectados = true;
    }

    if (emailVal === "" || emailVal.indexOf('@') === -1 || emailVal.indexOf('.') === -1) {
        campoEmail.classList.add('is-error');
        erroresDetectados = true;
    }

    if (erroresDetectados) {
        alertaTaquilla.textContent = 'No se puede realizar la solicitud porque faltan campos por llenar o el formato es incorrecto.';
        alertaTaquilla.className = 'mensaje-alerta mensaje-alerta--error';
        return;
    }

    var montoTotal = document.getElementById('factura-total').textContent;
    alertaTaquilla.textContent = '¡Pago completado con éxito, ' + nombreVal + '! El desglose por un total de ' + montoTotal + ' y tus boletas digitales han sido enviados a tu correo electrónico.';
    alertaTaquilla.className = 'mensaje-alerta mensaje-alerta--ok';

    formulario.reset();
    actualizarFacturaPrevia();
});

function conectarEnlaceTarifa(idEnlace, indiceSelect) {
    var boton = document.getElementById(idEnlace);
    if (boton) {
        boton.addEventListener('click', function() {
            document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
            tarifaSelect.selectedIndex = indiceSelect;
            actualizarFacturaPrevia();
        });
    }
}

conectarEnlaceTarifa('enlace-general', 0);
conectarEnlaceTarifa('enlace-inmersiva', 1);
conectarEnlaceTarifa('enlace-familiar', 2);

actualizarFacturaPrevia();
