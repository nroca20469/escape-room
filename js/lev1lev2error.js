// import {inicio, parar} from './tiempo.js';

/* 
    EL ERROR SE DA AL INTENTAR IMPROTAR/EXPORTAR EN ESTE MISMO FICHERO, PQ?
*/

const arrayOrdenado = ['cara', 'lacteo', 'castor', 'seto', 'lobo', 'gato', 'nacion', 'amor', 'lapicero', 'blanco'];
const arrayAnagramas = ['arca', 'coleta', 'castro', 'esto', 'bolo', 'toga', 'canino', 'roma', 'copiarle', 'balcon'];
const arrayPistas = ['Pieza donde se guarda el dinero en las tesorerías.', 'Mechón de cabello entretejido o suelto, sujeto con un lazo o goma, que se hace en la cabeza.', 
'Poblado fortificado en la Iberia romana.', 'Lo que está unido o próximo a mí o a nosotros.',
' Juego que consiste en derribar con bolas diez bolos colocados en el suelo.', ' Manto de mucho vuelo que constituía la prenda principal exterior del traje de los antiguos romanos.',
'Del perro o relativo a él.', 'Que carece de punta o filo.',
'Escribir lo que dice otro en un discurso o dictado:', 'Hueco abierto en la fachada de un edifico desde el suelo de la habitación, que se prolonga al exterior y está protegido con una barandilla.']

const divContainer = document.getElementById('container');
let anagramas; //Donde se guardara el json con los anagramas

//Pistas
let pistas = 0;

//Faltas + Puntuacion
const faltasInput =  document.querySelector('#faltas a');
const puntuacionInput =  document.querySelector('#puntuacion a');
const tiempoInput =  document.querySelector('#tiempo a');

function eleccionAnagramas() {
    let nPalabras = 0;
    let rand = Math.floor(Math.random() * arrayOrdenado.length);
    let algo = null;
    let random1 = null; 
    let random2 = null;

    while(nPalabras < 3) {
        rand = Math.floor(Math.random() * arrayOrdenado.length);
        if(nPalabras == 0) {
            algo = "{" + '"palabra1": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
            random1 = arrayOrdenado[rand];
            nPalabras++;
        } else if(nPalabras == 1 && random1 != arrayOrdenado[rand]) {
            algo += ',"palabra2": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
            random2 = arrayOrdenado[rand];
            nPalabras++;
        } else if(random2 != arrayOrdenado[rand] && random1 != arrayOrdenado[rand]){
            algo += ',"palabra3": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]}';
            nPalabras++;
        }
    }

    return algo;
}

function colocarPorPantalla(anagrama, namePalabra) {
    console.log(anagrama);
    let palabra = anagrama[0].split("");
    
    palabra.forEach((letra, index) => {
        const nombre = document.getElementById(namePalabra);
        nombre.innerHTML += '<button id="btnLetra" onclick="comprovarLetra(this)">' + letra + '</button>';
    });
       
}   

function comprovarLetra(e) {
    console.log('Hi');
    console.log(e.parentNode.id);
    if(e.parentNode.id) {
        let divSibling = document.querySelector('.' + e.parentNode.id);
        divSibling.innerHTML += '<button id="btnLetra" onClick="devolverLetra(this);">' + e.innerHTML + '</button>';
        comprovarPalabra(e.parentNode.id, e); //COMPROVAR PALABRA
    } 
    e.remove();
}

function devolverLetra(e) {
    console.log('Hi');
    // e.style.display = "none";
    let divSibling = document.getElementById(e.parentNode.className);
    divSibling.innerHTML += '<button id="btnLetra" onclick="comprovarLetra(this);">' + e.innerHTML + '</button>';
    e.remove();
}

function comprovarPalabra(id, div) {
    let palabra = JSON.parse(anagramas)[id][1];
    let htmlAlgo =  document.getElementsByClassName(id)[0];
    console.log(htmlAlgo);
    let palabraEscrita = "";
    for(let i = 0; i < htmlAlgo.children.length; i++) {
        palabraEscrita += htmlAlgo.children.item(i).innerText;
    }

    if(palabraEscrita == palabra) {
        console.log('correcta');
        htmlAlgo.className = "correcta";
        // document.getElementById(id).parentNode.remove();
        //style.display="none";
        document.getElementById('palabras').innerHTML += `<h3><img src="../../../iconos/hand-thumbs-up-fill.svg" id="thumbUp"></img>  ${palabraEscrita}</h3>`;
        //console.log(
        document.getElementById(id).parentNode.parentNode.remove();

    }
}

function mostrarPista(pal) {
    let posicion = JSON.parse(anagramas)[pal][2];
    pistas ++;

    document.getElementById('modal').className = "open";

    document.getElementById('mensaje-modal').innerHTML = arrayPistas[posicion];
    document.getElementById('sure').style.display = "block";
}

function closeModal() {
    document.getElementById('modal').className = "close";
}



window.addEventListener('load', function () {
    anagramas = eleccionAnagramas();

    colocarPorPantalla(JSON.parse(anagramas).palabra1, 'palabra1');
    colocarPorPantalla(JSON.parse(anagramas).palabra2, 'palabra2');
    colocarPorPantalla(JSON.parse(anagramas).palabra3, 'palabra3');

    // inicio();
    
});