export { parar };

//Constantes tiempo
let Horas;
let Minutos;
let Segundos;
let control;
let horas = 0;
let minutos = 0;
let segundos = 0;

function inicio() {
    
    let tiempo = document.querySelector('#tiempo a').innerHTML  .split(':');
    segundos = tiempo[2];
    minutos = tiempo[1];
    horas = tiempo[0];

    console.log(horas);
    console.log(segundos);
    console.log(horas);
    control = setInterval(cronometro, 1000);   
}

function parar() {
    clearInterval(control);
}

function cronometro() {
    segundos++;
		
    if (segundos == 59) {
        segundos = -1;
    }
    if(segundos == 0) {
        minutos++;
		// Minutos = minutos;
    }
    if (minutos == 59) {
		minutos = -1;
	}
	if ( (segundos == 0)&&(minutos == 0) ) {
		horas ++;
		// Horas = horas;
	} 

    Horas = (horas > 10) ? horas : (horas < 10 && horas > 0) ? "0" + horas : "00";
    Minutos = (minutos > 10) ? minutos : (minutos < 10 && minutos > 0) ? "0" + minutos : "00";
    Segundos = (segundos > 10) ? segundos : (segundos < 10 && segundos > 0) ? "0" + segundos : "00";

    document.querySelector('#tiempo a').innerHTML = Horas + ":" + Minutos + ":" + Segundos;
}

//Recoger info de pantalla
setTimeout(inicio, 200);
