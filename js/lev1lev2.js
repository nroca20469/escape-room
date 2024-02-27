//Importar el metodo/funcion parar del tiempo
import { parar } from './tiempo.js';
 
//Arrays de anagramas ordenados, desordenados y sus pistas
const arrayOrdenado = ['cara', 'lacteo', 'castor', 'seto', 'lobo', 'gato', 'nacion', 'amor', 'lapicero', 'blanco'];
const arrayAnagramas = ['arca', 'coleta', 'castro', 'esto', 'bolo', 'toga', 'canino', 'roma', 'copiarle', 'balcon'];
const arrayPistas = ['Pieza donde se guarda el dinero en las tesorerías.', 'Mechón de cabello entretejido o suelto, sujeto con un lazo o goma, que se hace en la cabeza.', 
'Poblado fortificado en la Iberia romana.', 'Lo que está unido o próximo a mí o a nosotros.',
' Juego que consiste en derribar con bolas diez bolos colocados en el suelo.', ' Manto de mucho vuelo que constituía la prenda principal exterior del traje de los antiguos romanos.',
'Del perro o relativo a él.', 'Que carece de punta o filo.',
'Escribir lo que dice otro en un discurso o dictado:', 'Hueco abierto en la fachada de un edifico desde el suelo de la habitación, que se prolonga al exterior y está protegido con una barandilla.']

const divContainer = document.getElementById('container');  //Div del container
let anagramas; //Donde se guardara el json con los anagramas

//Pistas
let nPistas = 0;

//Faltas + Puntuacion
const faltasInput =  document.querySelector('#faltas a');
const puntuacionInput =  document.querySelector('#puntuacion a');
const tiempoInput =  document.querySelector('#tiempo a');

let botones; //Para seleccionar todos los botones
let idUsuario;  //Para guardar el id del usuario

//Variables/Constantes del footer
const btnSave = document.getElementById('save');
const btnCheck = document.getElementById('check');
const btnNext = document.getElementById('next');
const btnOkey = document.getElementById('okey');   //Este es del modal

//Botones pistas
const btnPista1 = document.getElementById('pista1');
const btnPista2 = document.getElementById('pista2');
const btnPista3 = document.getElementById('pista3');

//Cogemos los primeros botones 0.5 segundos despues de iniciar la pagina
setTimeout(() => {

    botones = document.querySelectorAll('#btnLetra');  //Para que se puedan crear antes de guardarlos
    botonesFunc(); //Llamamos a la funcion con el evento
   
}, 500);

//FUNCIONES
//-------------

//Funcion que eleguira el anagrama(devuelve el json con las palabras)
function eleccionAnagramas() {
    let nPalabras = 0;  //Numero de palabra actual
    let rand = Math.floor(Math.random() * arrayOrdenado.length);  //1r numero para recoger del array
    let palabras = null; // Donde se guardaran las palabras(en json)
    let random1 = null; let random2 = null;  //Para guardar los objetos random 1 y 2

    //Para recoger exactamente 3 palabras del array
    while(nPalabras < 3) {
        rand = Math.floor(Math.random() * arrayOrdenado.length);  //Recogemos un numero con random

        if(nPalabras == 0) {  //Lo hacemos de manera ordenada (primero la palabra1 luego la 2 y por ultimo la 3a)

            palabras = "{" + '"palabra1": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';  //Guardamos ccomo parte de un json
            random1 = arrayOrdenado[rand];  //Guardamos el valor del array Ordenado con la posicion random en la variable
            nPalabras++;  //Añadimos al numero de palabras

        } else if(nPalabras == 1 && random1 != arrayOrdenado[rand]) {   //Si es la palabra 2, y el objeto no es el mismo

            palabras += ',"palabra2": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';  //Guardamos en el json
            random2 = arrayOrdenado[rand];  //Guardamos el valor en la variable de objeto
            nPalabras++;   //Subimos el nPalabras a 2

        } else if(random2 != arrayOrdenado[rand] && random1 != arrayOrdenado[rand]){  //Comprobamos que no se repitan ni con la primera ni con la segundo

            palabras += ',"palabra3": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]}';  //Guardamos en un json
            nPalabras++; //I subimos el nPalabras a 3, por lo cual va a salir del bucle

        }
    }

    return palabras;  //Devolvemos el json
}

//Funcion con los botones para darles eventos
function botonesFunc() {
    botones.forEach(element => {    //Recorremos el array de botones

        if(element.parentElement.id != 'null') {  //Si el id != "null", sera de id palabraX
            element.addEventListener('click', comprovarLetra);  //Mandamos a que compruebe la letra(tmb comprovara la palabra)
        } else if(element.parentElement.id == 'null') {  //Sino la classe sera palabraX
            element.addEventListener('click', devolverLetra);  //Mandamso a que devuelva la letra al div de la izquierda
        }

    });
}

//Funcion para colocar los anagramas por la pantalla
function colocarPorPantalla(jsonAnagrama, div) {
    let palabra = jsonAnagrama[0].split("");  //Recogemos la palabra y la separamos en un array
     
    palabra.forEach((letra, index) => {  //Recorremos le array
        const nombre = document.getElementById(div);  //Recorremos el div con el id de palabraX
        nombre.innerHTML += '<button id="btnLetra">' + letra + '</button>'; //Creamos botones con las letras
    });
}

//Funcion para comprovar la letra(pasa la letra de izquierda a derecha)
function comprovarLetra(e) {

     if(e.target.parentNode.id) {  //Si el padre tiene id
        let divSibling = document.querySelector('.' + e.target.parentNode.id);  //Buscamos la clase con el mismo nombre que el id
        divSibling.innerHTML += '<button id="btnLetra">' + e.target.innerHTML + '</button>';   //Añadimos al div la letra al final
        comprovarPalabra(e.target.parentNode.id, e.target); //COMPROVAR PALABRA mediante el padre(div) y la letra
    } 
    e.target.remove();  //Borramos la letra/div

    //Volvemos a recoger los botones de nuevo
    botones = document.querySelectorAll('#btnLetra');
    botonesFunc();  //I llamamos a la funcion con los eventos sobre estos
   
}

//Funcion para devolver la letra(pasa la letra de derecha a izquierda)
function devolverLetra(e) {

    let divSibling = document.getElementById(e.target.parentNode.className);  //Recogemos el div del id con el mismo nombre
    divSibling.innerHTML += '<button id="btnLetra">' + e.target.innerHTML + '</button>';  //Añadimos al div la letra al final
    e.target.remove();  //Borramos la letra/div
 
    //Volvemos a recoger los botones de nuevo
    botones = document.querySelectorAll('#btnLetra');
    botonesFunc();  //I llamamos a la funcion con los eventos sobre estos

}

//Funcion para comprovar la palabra por id i div
function comprovarPalabra(id, div) {
    let palabra;  //Variabla para guardar la palabraX

    if(idUsuario == null) { // Si el idUsuario no esta definido
        palabra = JSON.parse(anagramas)[id][1];   //Recogemos la solucion del anagrama de la variable global
    } else if(JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map1[0].level2.estate == null){  //Si el estado esta en null
        palabra = JSON.parse(anagramas)[id][1];  //Recogemos la solucion del anagrama de la variable global
    } else {  //Es decir que el usuario esta en intento o done
        palabra = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map1[0].level2.estadoOtras[id].solucion;  //Recogemos la solucion de esta palabra
    }

    let htmlpalabras =  document.getElementsByClassName(id)[0];  //Recoge el div general de la palabraX(id)
    let palabraEscrita = ""; //Palabra actual escrita

    for(let i = 0; i < htmlpalabras.children.length; i++) {  //Recorremos los hijos del div principal de palabraX
        palabraEscrita += htmlpalabras.children.item(i).innerText;  // Guardamos la palabra en la variable
    }

    //Si la palabraEscrita(actual) es igual a la palabra(solucion)
    if(palabraEscrita === palabra) {
        
        //Guardarlo en el div de correctas
        document.getElementById('correctas').innerHTML += `<h3><img src="../../../iconos/hand-thumbs-up-fill.svg" id="thumbUp"></img>  ${palabraEscrita}</h3>`;
        
        //Borramos de la tabla los cuadrados
        document.getElementById(id).parentNode.parentNode.remove();

        //Damos la puntuacion
        puntuacionInput.innerText = +puntuacionInput.innerText + 100;

        if(document.getElementById('correctas').childElementCount == 3) {

            parar();  //Paramos el tiempo

            if(idUsuario) {  //Si el usuario esta iniciado
                estadoActualJSON('end');  //Cambaimos estado del usuario del juego a acabado
            }  
            
            if(document.getElementById('intentos').childElementCount >= 3) {  //Si el de intents es menor/igual a 3

                document.getElementById('intentos').style.display = "none";  //Escondemos los intentos
                btnNext.style.display = "inline-block";  //Mostramos el boton de proxima partida
                btnCheck.style.display = "none";  //Escondemos el boton de check
            }
        }

        return true;   //Devolvemos que es true(si es igual)
        
    } else {

        if(palabraEscrita == "") {  // Si palabraEscrita(actual) no tiene ninngun valor
            return true;  //Tmb devolveremos true(pq no ha cambiado el valor/no ha de volver a motrarse)
        } else {
            return palabraEscrita;  //Sino devolvemos la palabraEscrita para que se pinte en intentos
        }
        
    }

}

//Funcion para guardar en json el estado actual de la jugada
function estadoActualJSON(estado) {

    let palabra1;
    let palabra2;
    let palabra3;
    
    //Estos if's se podrian pasar a funcion
    if(document.getElementById('palabra1')) {  //Si esta el div de palara1(si no esta, no entrara)

        palabra1 = {        //Lo guardamosn en la variable para esa palabra
            "izquierda": document.getElementById('palabra1').innerHTML,     // Guradamos la informacion de la izquierda(id)
            "derecha": document.querySelector('.palabra1').innerHTML,       //I la informacion de la derecha(classe)
            "solucion": JSON.parse(anagramas).palabra1[1]                   //I la solucion de este anagrama
        }

    } 

    if(document.getElementById('palabra2')) {  //Si esta el div de palara2(si no esta, no entrara)

        palabra2 = {        //Lo guardamosn en la variable para esa palabra
            "izquierda": document.getElementById('palabra2').innerHTML,     // Guradamos la informacion de la izquierda(id)
            "derecha": document.querySelector('.palabra2').innerHTML,       //I la informacion de la derecha(classe)
            "solucion": JSON.parse(anagramas).palabra2[1]                   //I la solucion de este anagrama
        }

    } 

    if(document.getElementById('palabra3')) {  //Si esta el div de palara3(si no esta, no entrara)

        palabra3 = {        //Lo guardamosn en la variable para esa palabra
            "izquierda": document.getElementById('palabra3').innerHTML,     // Guradamos la informacion de la izquierda(id)
            "derecha": document.querySelector('.palabra3').innerHTML,       //I la informacion de la derecha(classe)
            "solucion": JSON.parse(anagramas).palabra3[1]                   //I la solucion de este anagrama
        }

    } 

    //Guardar estado actual de la partida en ej json que ira al estado de la partida del usuario
    let estadoActual = {
        correctas: document.getElementById('correctas').innerHTML,  //Guardamos el div entero de las correctas
        estadoOtras: {  //Objeto con objetos de las palabras
            "palabra1": palabra1,
            "palabra2": palabra2,
            "palabra3": palabra3
        },
        estate: estado,                             //Guardamos el estado(done/intento)
        faults: faltasInput.innerHTML,              //Guardamos las faltas
        time: tiempoInput.innerHTML,                //Guardamos el tiempo
        puntuacion: puntuacionInput.innerHTML,      //Guardamos tambien la puntuacion
        intentos: document.getElementById('intentos').innerHTML     //I el div de los intentos
    }

    let user = JSON.parse(localStorage.getItem(idUsuario));  //Recogemos el usuario
    user.gameEstate[0].map1[0].level2 = estadoActual;  //Guardamo el "estado actual" de esta partida en gameEstatus de este nivel

    //Actualizamos el usuario en el localStorage
    localStorage.setItem(idUsuario, JSON.stringify(user));
}

//Funcion para recoger el usuario (el id mas especificamente)
function recogerUsuario() {
    for(let i = 0; i < localStorage.length; i++) {  //Recorremos el localStorage
    
        if(JSON.parse(localStorage.getItem(i))) {  
    
            if(JSON.parse(localStorage.getItem(i)).estate){  //Si el estado esta en true
                idUsuario = i;  //Guardamos el id del usuario
            }
        }
    }
}

//Funcion para colocar por pantalla los anagramas del estado del usuario
function colocarPantallaJson(json, nombre) {

    document.querySelector('.' + nombre).innerHTML = json.derecha;  //De la derecha(classs)
    document.getElementById(nombre).innerHTML = json.izquierda;     //De la izquierda(id)

}

//Funcion para mirara las palabras anteriores de los intentos
function mirarPalabrasAnteriores(palabra, classe) {
    let div = document.querySelector('.' + classe).childNodes;  // Recogemos el div(classe) en una variable
    let igual = false;  //Inicializamos la variable de igual(si hay alguna igual) a false

    if(div) {  //Si el div existe
        div.forEach(element => {   //Recorremos el div

            if(element.innerText.trim() == palabra) {  //Si hay alguna palabra igual en el div
                igual = true;    //Pasamos la variable a true
            }
        });
    }

    return igual; //Devolvemos esta variable si hay alguna repetida
}

//Funcion que mostrara la pista desde la 'palabbraX'
function mostrarPista(pal) {
    let posicion = JSON.parse(anagramas)[pal][2];  //Recogemos el indice de la palabra

    nPistas++; //Subimos el numero de pistas(lo guardamos para la puntuacion)
    puntuacionInput.innerHTML -= 50;  //Bajamos la puntuacion en 50

    document.getElementById('modal').className = "open";  //Abrimos el modal
    document.getElementById('mensaje-modal').innerHTML = arrayPistas[posicion];  //Mostramos la pista(desde el array de pistas)
    document.getElementById('sure').style.display = "block";  //Mostramos el boton de sure(para cerrar el modal)
}

//EVENTOS
//---------------

//Evento del boton okey(dentro del modal)
btnOkey.addEventListener('click', () => {
    document.getElementById('modal').className = "close";  //Cerramos el modal
});

//Evento al clicar en el div/td de pista(bombillita) de la palabra 1
btnPista1.addEventListener('click', ()=> {
    mostrarPista('palabra1');   //Mostramos la pista de la palabra 1
});

//Evento al clicar en el div/td de pista(bombillita) de la palabra 2
btnPista2.addEventListener('click', () => {
    mostrarPista('palabra2');   //Mostramos la pista de la palabra 2
});

//Evento al clicar en el div/td de pista(bombillita) de la palabra 3
btnPista3.addEventListener('click', () => {
    mostrarPista('palabra3');   //Mostramos la pista de la palabra 3
});

//Evento al clicar en el botone "save" para guardar
btnSave.addEventListener('click', ()=> {
    if(idUsuario) {  //Si el usuario esta iniciado 
        estadoActualJSON('intento'); // Se guardara el estado del juego en intento
    }
});

//Evento al clicar en el boton "Check" para comprovar
btnCheck.addEventListener('click', () => {
    let correcta = 0;
    if(document.getElementById('palabra1')) {  //Si el div de palabra 1 existe
        let comprovar = comprovarPalabra('palabra1') ;
        if(comprovar != true) {  //Si no hay palabras/intentos repetidos

            if(!mirarPalabrasAnteriores(comprovar, 'pal1')) {  //Si no esta en pal1

                //Le añadimos la palabra y el icono rojo
                document.querySelector('.pal1').innerHTML += `<h3><img src="../../../iconos/download.svg"> ${comprovar} </h3>`;
                faltasInput.innerText++;  //Subimos +1 las faltas
                puntuacionInput.innerText -= 20;  //I le bajamos la puntuacion -20

            }   
        }

    }  else {  //Sera que esta correcta, ya que el div no existe
        correcta++;  //Subimos el contador de correctas +1
    }

    if(document.getElementById('palabra2')) {  //Si el div de palabra 2 existe
        let comprovar = comprovarPalabra('palabra2'); 
        if(comprovar != true) {  //Si no hay palabras/intentos repetidos

            if(!mirarPalabrasAnteriores(comprovar, 'pal2')) {   //Si no esta en pal2

                //Le añadimos la palabra y el icono rojo
                document.querySelector('.pal2').innerHTML += `<h3><img src="../../../iconos/download.svg"> ${comprovar} </h3>`;
                faltasInput.innerText++;    //Subimos +1 las faltas
                puntuacionInput.innerText -= 20;    //I le bajamos la puntuacion -20

            }
        }
    } else {    //Sera que esta correcta, ya que el div no existe
        correcta++;   //Subimos el contador de correctas +1
    }

    if(document.getElementById('palabra3')) {  //Si el div de palabra 3 existe
        let comprovar = comprovarPalabra('palabra3'); 
        if(comprovar != true) {  //Si no hay palabras/intentos repetidos

            if(!mirarPalabrasAnteriores(comprovar, 'pal3')) {  //Si no esta en pal3

                //Le añadimos la palabra y el icono rojo
                document.querySelector('.pal3').innerHTML += `<h3><img src="../../../iconos/download.svg"> ${comprovar} </h3>`;
                faltasInput.innerText++;    //Subimos +1 las faltas
                puntuacionInput.innerText -= 20;   //I le bajamos la puntuacion -20

            }
        }
    } else {    //Sera que esta correcta, ya que el div no existe
        correcta++;    //Subimos el contador de correctas +1
    }
 
    if(correcta == 3) {
        btnNext.style.display = "inline-block";  //Mostramos el boton de proximo juego 
        btnCheck.style.display = "none";        //I escondemos el boton de comprovar
    }

});

//Evento al cargarse la pagina
window.addEventListener('load', () => {

    recogerUsuario();  //Miramos si el usuario esta inciado
    btnNext.style.display = "none";  //Escondemos el boton de proxima jugada

    if(idUsuario != null) {  //Si el usuario esta iniciado
        
        let user = JSON.parse(localStorage.getItem(idUsuario));  //Recogemos el usuario del LS en una variable 
        let level = user.gameEstate[0].map1[0].level2;  //I el nivel acual en otra

        if(level.estate == null) {  //Si el estado esta en null(1a vez en este nivel)

            //Eleccion del los anagramas    
            anagramas = eleccionAnagramas();
            //Colocar los anagramas por pantalla
            colocarPorPantalla(JSON.parse(anagramas).palabra1, 'palabra1');
            colocarPorPantalla(JSON.parse(anagramas).palabra2, 'palabra2');
            colocarPorPantalla(JSON.parse(anagramas).palabra3, 'palabra3');

        } else if(level.estate == 'intento') {  //Si el estado del nivel esta en intento

            
            if(level.correctas != "") {  //Si correctas no esta vacia
                document.getElementById('correctas').innerHTML = level.correctas;  //Lo mostramos directamente en la pantalla
            } 

            //Colocar las palabras
            if(level.estadoOtras.palabra1 != null) {  //Si la palabra no esta vacia
                colocarPantallaJson(level.estadoOtras.palabra1, 'palabra1');  //Colocamos por pantalla
            } else { 
                document.getElementById('palabra1').parentNode.parentNode.remove();  //Sino borramos la "row" de la tabla con su nombre id
            }

            if(level.estadoOtras.palabra2 != null) {  //Si la palabra no esta vacia
                colocarPantallaJson(level.estadoOtras.palabra2, 'palabra2');   //Colocamos por pantalla
            } else {
               document.getElementById('palabra2').parentNode.parentNode.remove();   //Sino borramos la "row" de la tabla con su nombre id
            }

            if(level.estadoOtras.palabra3 != null) {   //Si la palabra no esta vacia
                colocarPantallaJson(level.estadoOtras.palabra3, 'palabra3');   //Colocamos por pantalla
            } else { 
                document.getElementById('palabra3').parentNode.parentNode.remove();   //Sino borramos la "row" de la tabla con su nombre id
            }

            //Recogemos los botones actuales
            botones = document.querySelectorAll('#btnLetra');
            botonesFunc();    //I llamamos a la funcion de sus eventos

            //Actualizamos tiempo, faltas y puntuacion
            tiempoInput.innerHTML = level.time != null ? level.time : '00:00:00' ;  //Actualizamos el tiempo
            puntuacionInput.innerHTML = level.puntuacion != null ? level.puntuacion : '0' ;  //Actualizamos el tiempo
            faltasInput.innerHTML = level.faults != null ? level.faults : '0' ;  //Actualizamos el tiempo

        } else if(level.estate == 'end') {   //Si el estado esta en acabado

            //Mostramos el boton de next game y escondemos el de check y el de save
            btnNext.style.display = "inline-block";
            btnCheck.style.display = "none";
            btnSave.style.display = "none";

            //Esperamos un mosmento para mostrar el final para que no de error
            setTimeout(() => {
                divContainer.innerHTML = "<h2> Juego finalizado, clica en Next Game </h2>";  //Mostramos en un titulo que se ha acabado el juego
                divContainer.style.padding = "5%";  //Damos un poco de padding
                parar();  //Paramos el tiempo
            }, 200); //Esperamso 0.2 segundos(casi no es tiempo, pero mas tarda demasiado y menos no es suficiente para que se carge el tiempo)   
        }  

    } else { //Si el usuario no esta iniciado

        anagramas = eleccionAnagramas();  //Escogemos los anagramas
        
        //I los mostramos por pantalla
        colocarPorPantalla(JSON.parse(anagramas).palabra1, 'palabra1');
        colocarPorPantalla(JSON.parse(anagramas).palabra2, 'palabra2');
        colocarPorPantalla(JSON.parse(anagramas).palabra3, 'palabra3');

    }
});