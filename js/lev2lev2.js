//Import json´
import lev2 from './../json/lev2lev2.json' assert { type: 'json' };

//Import time
import { parar } from './tiempo.js';

//Recogemos todos los buttons
const botones = document.querySelectorAll('button');

// Recogemos las faltas y puntuacion( de mostrar la informacion )
const faltas = document.querySelector('#faltas a');
const tiempo = document.querySelector('#tiempo a');
const puntuacion = document.querySelector('#puntuacion a');

//Recogemos los botones del footer
const btnPista = document.getElementById('pista');
const btnOkey = document.getElementById('okay');
const btnNext = document.getElementById('next');

// Creacion de variable para guardar los ejercicios
let ejercicio1 = new String(); 
let ejercicio2 = new String(); 
let ejercicio3 = new String(); 

// Variable de almacenaje del id del usuario
let idUsuario;


//FUNCIONES
// ---------

// Funcion para la eleccion del ejericio
function eleccionDeEjercicios() {

    let rand;
    let rand1, rand2; // Variables para rque no se repitan los nuemros

    // Asegurarnos que los enunciados no se repitan
    while (ejercicio3.length == 0) {  // Si el ejercicio 3 esta vacio

        // Recogemos un numero aleatorio con random y de maximo la longuitud del nivel
        rand =  Math.floor(Math.random() * lev2.length);
        
        if(ejercicio1.length == 0) {  // Si el ejercicio 1 esta vacio
        
            ejercicio1 = lev2[rand];  // I el ejercicio
            rand1 = rand;   // Guadrdamos el numero
        
        } else if(ejercicio2.length == 0 && rand != rand1) {  // Si el ejericio 2 esta vacio y el nuemro random no es el mismo
        
            ejercicio2 = lev2[rand];  // Guardamos el ejercicio
            rand2 = rand;  // I el numero rand
        
        } else if(ejercicio3.length == 0 && rand != rand1 && rand != rand2) { // Si el ejercicio 3 esta vacio y los random no se repiten
            
            ejercicio3 = lev2[rand];  // Guardamos el ejercicio(y ya saldra del bucle)
        
        }
    }

}

// Funcion para colocar el ejercicio por pantalla
function colocarEjercicio(ejercicio, juego) {

    // Recogemos del DOM las estructuras necesarias para mostrar por pantalla
    const enunciado = document.querySelector('#' + juego + ' #enunciado');
    const titulo = document.querySelector('#' + juego + ' #titulo');
    const btnA = document.querySelector('#' + juego + ' #a');
    const btnB = document.querySelector('#' + juego + ' #b');
    const btnC = document.querySelector('#' + juego + ' #c');

    // I le damos el valor del json de ese ejercicio
    titulo.innerHTML = ejercicio.titulo;
    enunciado.innerHTML = ejercicio.enunciado;
    btnA.innerText = ejercicio.respuestas.a;
    btnB.innerText = ejercicio.respuestas.b;
    btnC.innerText = ejercicio.respuestas.c;

}

// Funcion para comprovar la respuesta
function checkRespuesta(juego, letra) {
    let ejercicio;  // Variable de almacenaje local para el ejercicio actual

    // Recogeremos los valores del ejercicio actual dependiendo del ejercicio actual (1, 2 o 3)
    if(juego == 'juego1') {
        ejercicio = ejercicio1;
    } else if(juego == "juego2") {
        ejercicio = ejercicio2;
    } else if(juego == 'juego3') {
            ejercicio = ejercicio3;
    }

    // Si la respuesta es la misma que en la solucion
    if(ejercicio.respuestas[letra] == ejercicio.solucion) {
    
        puntuacion.innerText =  +puntuacion.innerText + 100;  // Subimos la puntuacion +100 puntos
    
    } else {  // Si la respuesta es incorrecta

        puntuacion.innerText -= 30;  // La puntuacion bajara 30 punt0s
        faltas.innerText++;   // I las faltas aumentaran +1
    
    }
}

// Funcion para comprovar si el usuario esta inciado
function getUserIDUsuario() {
    for(let i = 0; i < localStorage.length; i++) {

        // Recogemos los valores del LS
        let user = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if(user['estate'] == true) {  // Si estan inciado
            idUsuario = localStorage.key(i);  // Guardamos el id enj la variable gloabal del documento
        }
    }
}

// Funcion para guardar la partida si estan inciados
function guardarPartida() { // Se guardara cuando ya haya pasado los 3 ejercicios

    // Guardamos en local el valor del usuario y su nivel
    let usuario = JSON.parse(localStorage.getItem(idUsuario));
    let nivel = usuario.gameEstate[0].map2[0].level2;

    // Guardamos los valores del nivel
    nivel.tiempo = tiempo.innerHTML;
    nivel.faults = faltas.innerHTML;
    nivel.puntuacion = puntuacion.innerHTML;
    nivel.estate = 'done';

    // Actualizar en localStorage
    localStorage.setItem(idUsuario, JSON.stringify(usuario));

    // Lo mandamos automaticamente al siguiente nivel
    location.href = './lev2lev3easy.html';  
}


// EVENTOS
// ----------

// Evento al clicar en pista
btnPista.addEventListener('click', () => {

    //Segun en que ejercicio esten, se mostrar el modal con la pista
    if(document.getElementById('juego2').style.display == "block") {

        document.getElementById('modal').className="open";  //Abrimos el modal
        document.getElementById('mensaje-modal').innerHTML = ejercicio2.pista;  // Mostramos la pista
    
    } else if(document.getElementById('juego3').style.display == "block") {
    
        document.getElementById('modal').className="open";
        document.getElementById('mensaje-modal').innerHTML = ejercicio3.pista;
    
    } else if(document.getElementById('juego1').style.display == "block")  {
    
        document.getElementById('modal').className="open";
        document.getElementById('mensaje-modal').innerHTML = ejercicio1.pista;
    
    }

    puntuacion.innerHTML -= 10;  //La puntuacio le bajara 10 puntos por pista(las pistas pueden liar mas de lo que ayudan)

});

//Evento para cerrar el modal
btnOkey.addEventListener('click', () => {

    //Cerramos el modal(cambiamos la clase a close, lo que se cerrara con css)
    document.getElementById('modal').className = "close";  

});

// Array de botones
botones.forEach(element => {

    //E vento para cada boton del array de botones
    element.addEventListener('click', (e)=> {

        let idElemento = e.target.id;       // Recogemos que boton es
        let juego = e.target.parentNode.id; // I que ejercicio es

        // Si el ejercicio es uno de los 3(no es un boton del footer o del header)
        if(juego == 'juego1' || juego == 'juego2' || juego == 'juego3') {
            checkRespuesta(juego, idElemento);  // Comprovamos la respuesta

            // Esconder los juegos anteriores y posteriores y mostrar juego actual
            if(juego == 'juego1') {

                // Escondemos el juego 1 y 3 y mostramos el 2
                document.getElementById('juego2').style.display = "block";  
                document.getElementById('juego3').style.display = "none"; 
                document.getElementById('juego1').style.display = "none";  
 
            } else if(juego == "juego2") {

                 // Escondemos el juego 1 y 2 y mostramos el 3
                document.getElementById('juego1').style.display = "none"; 
                document.getElementById('juego2').style.display = "none"; 
                document.getElementById('juego3').style.display = "block"; 

            } else if(juego == 'juego3') {

                 // Escondemos el juego 1, 2 3 y mostramos el boton de proximo juego
                document.getElementById('juego1').style.display = "none"; 
                document.getElementById('juego2').style.display = "none"; 
                document.getElementById('juego3').style.display = "none"; 

                document.getElementById('next').style.display = "inline-block"; 

                parar(); // Paramos el cronometro
                // Mostramos mensaje de partida acabada
                document.querySelector('main').innerHTML = "<h2> Ha acabado este juego, pase al siguiente</h2>"; 
            }

        }
    });
});

// Evento al clicar en el boton de proximo juego
btnNext.addEventListener('click', ()=> {

    // Si el usuario esta inicado
    if(idUsuario != null) {
        guardarPartida();  // Guardamos su partida
    }
    
    // I redirigimos al proximo jeugo
    location.href = './lev2lev3easy.html';

});

// Evento al cargarse la pagina
window.addEventListener('load', ()=> {
    // Eleccion del array
    eleccionDeEjercicios();

    let juegoFinalizado = false;

    // Esconder otros juegos
    document.getElementById('juego2').style.display = "none";   
    document.getElementById('juego3').style.display = "none"; 
    document.getElementById('juego1').style.display = "block"; 
    document.getElementById('next').style.display = "none";   

    // Recoger id del usuario()si esta inicado
    getUserIDUsuario();

    // Si el usuario esta iniciado
    if(idUsuario) {

        let usuario = JSON.parse(localStorage.getItem(idUsuario));      // Recogemos el usuario
        let level2 = usuario.gameEstate[0].map2[0].level2;              // Recogemos el nivel actual
       
        if(level2.estate == null) {                 // Si el estado del nivel esta vacio

            // Guardamos la partida incial del jugador i en clase intento
            usuario.gameEstate[0].map2[0].level2 = {
                estate: "intento",
                jsonPreguntas : {
                    "preg1" : ejercicio1,
                    "preg2" : ejercicio2,
                    "preg3" : ejercicio3
                },
                faults: 0, 
                puntuacion: 0,
                tiempo: 0
            }  

            localStorage.setItem(idUsuario, JSON.stringify(usuario));  // Guardamos en el LS la actualizacion del nivel

        } else if(level2.estate == 'intento'){      // Si el estado esta en intento

            // Guardamos el las variables globales las preguntas
            ejercicio1 = level2.jsonPreguntas.preg1;
            ejercicio2 = level2.jsonPreguntas.preg2;
            ejercicio3 = level2.jsonPreguntas.preg3;

            // Actualizamos el tiempo al guardado
            tiempo.innerHTML = level2.tiempo == null ? '00:00:00' : level2.tiempo;

        } else {                                    // Si no esta ni vacio ni en intento es que esta acabado
            
            juegoFinalizado = true;  // Finalizamos el jeugo
            
            tiempo.innerHTML = '00:00:00';  // Inicializamo el tiempo a 0 
            setTimeout(parar, 200);  // Pararemos el tiempo 0.2 segundos despues de que se inicie el juego(sino da error)
            
            btnNext.style.display = "inline-block";  // Mostramos el boton de proximo juego
            setTimeout(()=> {
                // Mostramos por pantalla que el juego ha finalizado
                document.querySelector('main').innerHTML = "<h2> Ha acabado este juego, pase al siguiente</h2>";
            }, 300);  // Time out sino da error el fichero de time(pq el objeto del DOM no exite)
        }
        
    }

    // Si el jeugo no esta acabado
    if(!juegoFinalizado) {

        //Colocamos el ejercicio/juego
        colocarEjercicio(ejercicio1, 'juego1');
        colocarEjercicio(ejercicio2, 'juego2');
        colocarEjercicio(ejercicio3, 'juego3');

    }
});