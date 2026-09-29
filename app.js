/* variables de los elementos */
const botonMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

/* busca todos los enlaces del menu */
const enlaces = document.querySelectorAll(".menu-navegacion a");

/* funcion para abrir o cerrar con el boton */
botonMenu.addEventListener("click", function() {
    menu.classList.toggle("activo");
});

/* bucle para cerrar el menu al hacer clic en una opcion */
enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        menu.classList.remove("activo"); /* quita el menu de la pantalla */
    });
});
