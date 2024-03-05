// Exportar la funcion para parar el cronometro
export { parar };

// Variables tiempo
let Horas;      // Las variables con mayusculas puede tener un 0 delante
let Minutos;
let Segundos;
let horas = 0;  // Estas variables son contadores simples para horas
let minutos = 0;
let segundos = 0;

// Variable del cronometro
let control;

// FUNCIONES
// -------------

// Funcion de iniciar el cronometro
function inicio() {

    // Recogemos en la variable la informacion del tiempo actualizado(o no) de la pantalla del usuario
    let tiempo = document.querySelector('#tiempo a').innerHTML.split(':');

    // Actualizamos los contadores lowercase con la informacion de la variable(array) actual
    segundos = tiempo[2];
    minutos = tiempo[1];
    horas = tiempo[0];

    // Inicializamos el cronometro(llamamos la funcion cada segundo)
    control = setInterval(cronometro, 1000);   
}

// Funcion para parar el cronometro
function parar() {

    // Paramos la variable del cronometro(el intervalo lo paramos)
    clearInterval(control);

}

// Funcion de cronomtero que se llaman cada segundo
function cronometro() {
		
    // Si el segundo es 59 
    if (segundos == 59) {

        // Actualizamos los segundos a -1(para que se inicialice en la siguinete pasada a 0)
        segundos = -1;      

    }

    // Si los segundos estan a 0(ya ha pasado de la segundo -1 a 0)
    if(segundos == 0) {

        // Actualizamos los minutos +1
        minutos++;

    }

    // Si los minutos estan a 59(hacemos lo mismo que en los segundos)
    if (minutos == 59) {

        // Actualizamos los minutos a -1
		minutos = -1;

	}

    // Si los segundos estan a 0 y los minutos a 0
	if ( (segundos == 0) && (minutos == 0) ) {

        // Subimos las horas +1
		horas ++;

	} 
    
    // Subimos el segundo +1
    segundos++;

    // Actualizamos en las variables en las mayores(tienen los 0)
    Horas = (horas > 10) ? horas : (horas < 10 && horas > 0) ? "0" + horas : "00";
    Minutos = (minutos > 10) ? minutos : (minutos < 10 && minutos > 0) ? "0" + minutos : "00";
    Segundos = (segundos > 10) ? segundos : (segundos < 10 && segundos > 0) ? "0" + segundos : "00";

    // Mostramos el tiempo en pantalla(con 0)
    document.querySelector('#tiempo a').innerHTML = Horas + ":" + Minutos + ":" + Segundos;

       

}

//Recoger info de pantalla 0.2 segundos despues, para dejar que se carge el script
setTimeout(inicio, 200);
