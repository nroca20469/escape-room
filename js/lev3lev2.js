// Importar juego y correcciones
import ejercicio from './../json/lev3lev2ejercicio.json' assert { type: 'json' };
import correccion from './../json/lev3lev2correccion.json' assert { type: 'json' };

// Importat stop timer
import { parar } from './tiempo.js';

// Recoger el tablero
const tablero = document.getElementById('tablero');
const tbody = document.querySelector('tbody');
const divContainer = document.getElementById('container');

// Botones
const btnCheck = document.getElementById('check');
const btnNext = document.getElementById('next');
const btnSave = document.getElementById('save');
const btnPista = document.getElementById('pista');

//Faltas i puntuacion
const faltas = document.querySelector('#faltas a');
const puntuacion = document.querySelector('#puntuacion a');
const tiempo = document.querySelector('#tiempo a');

// Variables con tablero i correccion
let jsonTablero;
let jsonPistas;
let jsonCorreccion;

// Variable usuario
let userId;

// FUNCIONES
// ----------

// Funcion para colocar el tablero por pantalla
function colocarTablero() {

    // Recogemos el json en variables
    jsonPistas = jsonTablero.pistas;                // JsonPistas es la informacion para jugar(no las pistas en si)
    let filas = Object.keys(jsonTablero.tablero);   // Recogemos las filas en keys del tablero

    // Creamos la tabla(estructura general vertical | )
    tbody.innerHTML += '<tr id= "vertical"><td></td></tr>'
    let vertical = document.getElementById('vertical');

    // Colocamos para las pistas
    for(let i = 0; i < filas.length ; i++) {
        vertical.innerHTML += '<td id="v' + i + '"> Ver </td>';
    }

    // Colocar en horizontal i colocar los inputs
    for(let i = 0; i < filas.length; i++) {

        // Creamos la fila actual
        tbody.innerHTML += '<tr class="' + filas[i] + '"> <td id = "h' + i + '"> Ver </td> </tr>';

        let filaActual = document.querySelector('.' + filas[i]);  /// Recogemos la fila acual que vamos a estar manipulando
        
        // Recorrer fila
        for(let j = 0; j < filas[i].length + 1; j ++) {
            
            if(jsonTablero.tablero[filas[i]][j] == 'b-black') {  // Creamos div vacio
                filaActual.innerHTML += '<td><div></div></td>';
            } else {        // Sinoo creamos el input tipo text apra poder escribir una sola letra en este mismo
                filaActual.innerHTML += '<td><input type="text" maxlength="1"> </input></td>';
            }

        }
    }
}

// Funcion para ver la informacion de esa fila horizontal/Verticxal
function verInformacion(id) {

    // Recogemos y abrimos el modal
    let modal = document.getElementById('modal');
    modal.className = "open";

    // Recogemos i editamos el contenido del modal
    let contenido = document.getElementById('mensaje-modal');
    contenido.style.padding = '5%'; // Le damos un estilo(paraque salga mas o menos en medio del modal)
    
    // Mostramos la pista desde el json
    contenido.innerHTML = "<strong>Informacion:</strong> <br><br>" + jsonPistas[id] + '<br><br><button id="close"> Cerrar </button>';

    // Recogemos el boton de cerrar
    let closeButton = document.getElementById('close');

    // Al clicar el boton de cerrar
    closeButton.addEventListener('click', () => {
        modal.className = "close";  //Cerramos el modal
    });
}

// Funcion para ver los botones(Ver)
function verBotones() {

    // Recogemos todos los td
    let td = document.querySelectorAll('td');

    // Recorremos el arraty de td's
    td.forEach(element => {

        // Le damos un evento
        element.addEventListener('click', (e) => {

            // Si el elemento tiene un id(solo lo tienen los de informacion)
            if(e.target.id) {
                verInformacion(e.target.id); // Mostraremos la informacion por pantalla
            }
        });
    });
}

// Funcion para recorrer i comprovar la tabla
function recorrerTabla(){

    // Recogemos todos los inputs en un array
    let input = document.querySelectorAll('input');
    let contador = 0;  // Añadiremos un contador para facil acceso
    
    // Recorremos los elementos de las tablas
    tbody.childNodes.forEach(element => {  
        
        if(element.className.length > 0) {  // Si el elemento tiene clase(filaX)

            for ( let i = 0; i < jsonCorreccion[element.className].length; i++) {  // Recorremos el jsonCorreccion

                if(jsonCorreccion[element.className][i] != 'b-black'){  // Si el fondo es un div(no vacio)
                    
                    if(input[contador]) { // Si el input en el indice contador existe

                        if(input[contador].value && input[contador].className != 'pista') {  // Si el input tiene un valor y no es de clase pista(sino siempre esta en correctos)

                            // Si el input a lowercase es igual que el del jsond e correccionv y la clase no es correcto
                            if(input[contador].value.toLowerCase() == jsonCorreccion[element.className][i] && input[contador].className != 'correcto') {

                                // Cambiaremos el nombre de la clase y lo pasamos a readonly
                                input[contador].className = "correcto";
                                input[contador].readOnly = true;
                                puntuacion.innerHTML = +puntuacion.innerHTML + 100;  // Subimos la puntuacion

                            } else if (input[contador].value.toLowerCase() != jsonCorreccion[element.className][i]){  // Si no es del mismo valor

                                // I el nombre anterior no es incorrecto
                                if(input[contador].className != 'incorrecto') {

                                    // Cambiamos la clase a incorrecto
                                    input[contador].className = "incorrecto";

                                    //  las faltas y puntuacion suben i bajan respectivamente
                                    faltas.innerHTML ++;
                                    puntuacion.innerHTML = +puntuacion.innerHTML - 50;

                                }
                            }
                        }
                        contador++;  // Subimos el contador(para saber en que input del json nos encontramos)
                    }
                }
            }
        }
    });
}

// Funcion para recorrer y cambair las clases desde el estado guardado
function recorrerSinPuntuacionNiFaltas() {

    // Recogemos todos los inputs en un array
    let input = document.querySelectorAll('input');
    let contador = 0;  // Añadiremos un contador para facil acceso
    
    // Recorremos los elementos de las tablas
    tbody.childNodes.forEach(element => {  
        
        if(element.className.length > 0) {  // Si el elemento tiene clase(filaX)

            for ( let i = 0; i < jsonCorreccion[element.className].length; i++) {  // Recorremos el jsonCorreccion

                if(jsonCorreccion[element.className][i] != 'b-black'){  // Si el fondo es un div(no vacio)
                    
                    if(input[contador]) { // Si el input en el indice contador existe

                        if(input[contador].value && input[contador].className != 'pista') {  // Si el input tiene un valor y no es de clase pista(sino siempre esta en correctos)

                            // Si el input a lowercase es igual que el del jsond e correccionv y la clase no es correcto
                            if(input[contador].value.toLowerCase() == jsonCorreccion[element.className][i] && input[contador].className != 'correcto') {

                                // Cambiaremos el nombre de la clase y lo pasamos a readonly
                                input[contador].className = "correcto";
                                input[contador].readOnly = true;

                            } else if (input[contador].value.toLowerCase() != jsonCorreccion[element.className][i]){  // Si no es del mismo valor

                                // I el nombre anterior no es incorrecto
                                if(input[contador].className != 'incorrecto') {

                                    // Cambiamos la clase a incorrecto
                                    input[contador].className = "incorrecto";


                                }
                            }
                        }
                        contador++;  // Subimos el contador(para saber en que input del json nos encontramos)
                    }
                }
            }
        }
    });
} 

// Funcion para comprovar si la partida esta acabada
function partidaAcabada(estado) {

    // Recogemos en variables los inputs correctos y las pistas
    let correctos = document.querySelectorAll('.correcto');
    let pistas = document.querySelectorAll('.pista')

    // I los inputs
    let numeros  = document.querySelectorAll('input');

    // Si el nuemro de inputs es el mismo que el numero de pistas y correctas
    if(correctos.length + pistas.length ==  numeros.length || estado) {  // O el estado estra acabado('done)

        divContainer.innerHTML += "<h2> Juego finalizado, clique en 'Next Game'";  // Mostramos el mensaje de juego finalizado
        parar(); // Paramos el temporizador
        
        btnNext.style.display = 'inline-block';// Mostramos el boton de proxima partida

        tablero.style.display = "none";  // Escondemos el tablero
        btnCheck.style.display = "none"; // Escondemos el boton de comprovar

        //Actualizar a partida acabada
        if(userId) {  

            // Guardamos la partida en estadpo de acabado
            guardarPartidaEnArray('done');

        }
    }
}

// Funcion para comprovar si el usuario esta iniciado
function checkUser() {

    // Recorremos el LS
    for(let i = 0; i < localStorage.length; i++) {

        // Guardamos el json en la variable
        let user = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]));

        // Si el json tiene estado y esta en true
        if(user.estate) {

            // Guardamos el id del usuario
            userId = Object.keys(localStorage)[i];

        }
    }
}

// Funcion para elegir el juego
function eleccionTablero() {

    // Eleccion tablero
    let rand = Math.floor(Math.random() * ejercicio.length);

    // Guardamos en las variables los json de ejercicio y de correcion
    jsonTablero = ejercicio[rand];
    jsonCorreccion = correccion[rand];

    // Escondemos el boton de next
    btnNext.style.display = "none";
}

// Funcion para guardar la partida
function guardarPartida(arrayIntentos, estado, arrayPistas) {

    // Recoger valores en variables
    let user = JSON.parse(localStorage.getItem(userId));
    let lev2 = user.gameEstate[0].map3[0].level2;

    // Actualizar en variable
    lev2.estate = estado;
    lev2.arrayActual = arrayIntentos;
    lev2.puntuacion = puntuacion.innerHTML;
    lev2.time = tiempo.innerHTML;
    lev2.faltas = faltas.innerHTML;
    lev2.arrayPistas = arrayPistas,


    // Actualizar a user
    user.gameEstate[0].map3[0].level2 = lev2;

    // Actualizar a LS
    localStorage.setItem(userId, JSON.stringify(user));

}

// Funcion para guardar la partida en array()
function guardarPartidaEnArray(estado) {

    // Creacion de arrays
    let arrayIntentos = new Array() ;
    let arrayPistas = new Array();

    // Recogemos los inputs
    let inputs = document.querySelectorAll('input');

    // Recorremos los inputs
    inputs.forEach((element, index) => {

        if(element.value) {  // Si el input tiene algun valor(no esta vacio)

            // Guaardamos el valor en la posicion correspondiente en el array de Intentos
            arrayIntentos[index] = element.value;

            // Si la clase del elemento es pista
            if(element.className == 'pista') {

                arrayPistas[index] = element.value; // Guardamos el valor del elemento en el lugar correspondiente de el array de pistas

            }

        } else { // Si el valor esta vacio

            arrayIntentos[index] = null;  // Guardaremos ese lugar como null (si no se hiciera este paso tmb se guardaria en null)

        }

    });

    // Mandamos a que nos guarde la partida con  los arrays y el estado correspondiente
    guardarPartida(arrayIntentos, estado, arrayPistas);
}

// Funcion para colocar la oartida anterior(pista, correctos e incorrectos)
function colocarPartida(arrayActual, arrayPista) {
    
    // Recogemos todos los inputs en un array
    let inputs = document.querySelectorAll('input');

    // Recorremos el array
    inputs.forEach((element, index) => {
        
        if(arrayActual[index]) {  // Si en el arrayActual[i] no esta vacio
        
        
            if(arrayPista[index]) {  // Si el array de pistas [i] no esta en null
        
                element.className = 'pista';  // Damos la clase de pista
                element.readOnly = true; // I que sea readonly
            }

            // Damos el valor guaradado en el array de la partida guardada
            element.value = arrayActual[index];
        }
    });

    // Comprovar si eran correctos o incorrectos
    recorrerSinPuntuacionNiFaltas();
}

// EVENTOS
// -------

// Evento al editar un input
addEventListener('input', (e) => {
    e.target.className = 'intento';  // Cambiamos la clase a intento
});

// Evento al clicar en el boton de pista
btnPista.addEventListener('click', () => {
    
    // Recogemos los inputs
    let inputs = document.querySelectorAll('input');
    let rand = Math.floor(Math.random() * inputs.length);
    let contador = 0;
    
    // Mienttras la clase sea correcta o de pista
    while(inputs[rand].className == 'correcto' || inputs[rand].className == 'pista') {
        rand = Math.floor(Math.random() * inputs.length);  // Seguiremos con el aleatorio
    }

    // Guardamos en variable(array), las keys del jsonCorreccion
    let correccionLength = Object.keys(jsonCorreccion);

    // Recorremos el json de correccion(sus keys)
    for(let i = 0; i < correccionLength.length; i++ ) {

        // Recorremos los arrays de las keys "key": [array] --> esta es la estructura base
        jsonCorreccion[correccionLength[i]].forEach(element => {
            
            if(element != 'b-black') {  // Si el elemento no tiene de valor b-black(es decir que no es div, y si es input)
            
                if(contador == rand) {  // Si el valor del contador y del random es el mismo
            
                    inputs[rand].value = element;  // Damos el valor
                    inputs[rand].className = 'pista';  // La clase pista
                    inputs[rand].readOnly = true;  // Pasamos a readonly
                    puntuacion.innerHTML -= 20;  // I bajamos -20 la puntuacion

                }
                contador++;  // Subimos el contador
            }
        }); 
    }

});

// Evento al clicar en el boton de guardar
btnSave.addEventListener('click', () => {

    // Damos valor al estado a intento(si no es en flecha se ejecuta al momento y da error)
    guardarPartidaEnArray('intento'); 

});

// Eveneto al clicar en el boton de comprovar
btnCheck.addEventListener('click', () => {

    // Recorremos y comprovamos los inputs
    recorrerTabla();

    // Comprovar si la partida esta acabada
    partidaAcabada(false);
})

window.addEventListener('load', () => {

    // Comprovamos si el usuario esta iniciado
    checkUser();

    // Escondemos el boton de next game
    btnNext.style.display = "none";

    // Si el usuario esta iniciado
    if(userId) {

        // Recoger estado del juego
        let user = JSON.parse(localStorage.getItem(userId));
        let lev2 = user.gameEstate[0].map3[0].level2;

        if(lev2.estate == null) {               // Si el estado esta vacio
            
            // Eleccion de tablero/juego
            eleccionTablero();

            // Guardamos en variable este juego/tablero y cambiamos estado a intento
            let lev2 = {
                jsonCorreccion: jsonCorreccion,
                arrayActual: null,
                arrayPistas: null,
                jsonTablero: jsonTablero,
                faltas: faltas.innerHTML, 
                puntuacion: puntuacion.innerHTML,
                time: tiempo.innerHTML,
                estate: 'intento'
            };

            // Guardar en user
            user.gameEstate[0].map3[0].level2 = lev2;

            // Actualizar a LS
            localStorage.setItem(userId, JSON.stringify(user));

            // Colocar por pantalla
            colocarTablero();

        } else if(lev2.estate == 'intento') {   // Si el estado esta en intento
           
            // Recogemos los valores del juego en variables
            jsonCorreccion = lev2.jsonCorreccion;
            jsonTablero = lev2.jsonTablero;

            // Colocamos tiempop puntuacion  y faltas del juego anterior por pantalla
            tiempo.innerHTML = lev2.time;
            puntuacion.innerHTML = lev2.puntuacion;
            faltas.innerHTML = lev2.faltas;

            // Colocamos el tablero original
            colocarTablero();

            // Colocar intentos
            colocarPartida(lev2.arrayActual, lev2.arrayPistas);

        } else if(lev2.estate == 'done') {      //Si el estado esta en done(== acabado)
            
            // Mostramos que la partida esta acabada y mostramos el boton de next y mensaje desde la funcion
            partidaAcabada(true);

        }

s    } else {  // Si el usuario no esta iniciado

        // Elegimos el tablero(jsons) y lo colocamos por pantalla
        eleccionTablero();
        colocarTablero();

        // Escondemos el boton de save
        btnSave.style.display = "none";
    }

    // Hacemos posible el acceso a la informacion al clicar en ver
    verBotones();
    
});