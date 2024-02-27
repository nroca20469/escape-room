// Importa los ejercicio y correccion
import lev3exercici from './../json/lev1lev3exercici.json' assert { type: 'json' }; 
import lev3correccio from './../json/lev1lev3correccio.json' assert { type: 'json' };

// Importar para parar el time
import { parar } from './tiempo.js';

// Constante de divs generales
const tabla = document.getElementById('tabla');
const respuestas = document.getElementById('respuestas');

// Contantes de los botones
const btnCheck = document.getElementById('check');
const btnSave = document.getElementById('save');
const btnPista = document.getElementById('pista');

// Variables de los json
let jsonExercici;
let jsonSolucio;

// Variables generales
let faltas = 0;
let puntuacion = 0;
let correctas = 0;
let idUsuario;

// Escondemos boton de next
document.getElementById('next').style.display = "none"; 


// FUNCIONES
// ----------

// Funcion para colocar la tabla 
function colocarTabla() {
    // Siempre tienen 4 filas(si tuvieramos filas desiguales, se colocarias con Object.keys i recorreindo el array y recorriendo la tabla)
    colocarFila('fila1');
    colocarFila('fila2');
    colocarFila('fila3');
    colocarFila('fila4');
}

// Funcion para colocar por fila el array del json
function colocarFila(fila) {
    let filaTabla = tabla.children[0].children[fila];

    // Recorremos la fila x del json
    for(let i = 0; i < jsonExercici[fila].length; i++) {

        // Si el valor del espacio es == "+", "-", "*", "=", "?", numero se colocaran literal por pantalla
        if(jsonExercici[fila][i] == "+"  || jsonExercici[fila][i] == "-" || jsonExercici[fila][i] == "*" || jsonExercici[fila][i] == "=" || typeof jsonExercici[fila][i] == "number" || jsonExercici[fila][i] == "?") {
            filaTabla.innerHTML += '<td><p>' + jsonExercici[fila][i] + '</p></td>';
        } else { // Sino es que seran imagenes
            filaTabla.innerHTML += '<td><img src="' + jsonExercici[fila][i] + '" ></td>';
        }
    }
}

// Funcion para colocar en el div de respuestas la solucion/para mostrar lso inputs
function colocarRespuestas() {
    let keys = Object.keys(jsonSolucio);  // Guardamos las keys del json

    for(let i = 0; i < keys.length; i++) { 
        if(keys[i] != 'solucion') {  // Si la key no es "solucion"
            // Añadiremos la imagen con el input al lado
            respuestas.innerHTML += '<p><img src="' + keys[i] +'" alt="hello"/> <input class="intento" type="number" style="margin-start: 10px; width: 45px;" id="' + keys[i] + '"></p>';
        } else {  // Sino ya sera el de solucion, que solo mostrara Solucion + input vacio 
            respuestas.innerHTML += '<p><strong> Solucion: </strong> <input class="intento" type="number" value="" style="width: 45px;" id="sol"></p>';
        }
    }
}

// Funcion para comprovar si el numero del input es correcto
function comprovarNumeroInput(num, src, jsonSpace) {

    if(src != 'sol') {  // Si el input es de sol(solucion)
        if(num == jsonSolucio[jsonSpace]) {  // Si ell numero esta igual en la solucion

            if(document.getElementById(src).className != 'correcta') {  // Si la clase no esta en correcta

                document.getElementById(src).className = "correcta";    // Cambiamos la clase a correcta
                document.getElementById(src).type = "none";             // Le quitamos el tipo
                document.getElementById(src).readOnly = true;           // I lo ponemos a readonly(para que no lo puedan editar)

                puntuacion += 100;  // Subimos +100 la puntuacion por correcto
                correctas++;        // Subimos el contador de correctas +1

            }
        
        } else if(num != jsonSolucio[jsonSpace] && document.getElementById(src).className == 'intento') {  // Si la clase esta en intenot y no e igual

            document.getElementById(src).className = "incorrecta";  // Cambiamos la clase a incorrecta
            puntuacion -= 30;   // Bajanmmos al puntuacion -30 por incorrecta
            faltas++;           // Subimos +1 las faltas
        }

    } else {  // Si no es el input de solucion

        if(num == jsonSolucio[jsonSpace] && document.getElementById(src).className != 'correcta') {  // Si la clase no es correcta y el numero es el mismo de la solucion
            
            document.getElementById(src).className = "correcta";    // Smabiamos la clase a correcta
            document.getElementById(src).type = "none";             // El tipo a none
            document.getElementById(src).readOnly = true;           // Lo ponemos a resadonly para que no puedan modificar

            correctas++;            // El contador de correctas +1                    
            puntuacion += 100;      //  Subimos la puntuacion +100

        } else if(num != jsonSolucio[jsonSpace] && document.getElementById(src).className == 'intento') {  // Si la clase es intento y el numero no coincide con la solucion

            document.getElementById(src).className = "incorrecta";  // Cambiamos la clase a incorrecta
            puntuacion -= 30; // Bajamos la puntuacion -30
            faltas++;   // Subimos las faltas +1

        }
    }
}

// Funcion para comparar y comprovar los numeros de los inputs
function compararNumeros() {

    respuestas.childNodes.forEach(element => {  // Recorremos los childNodes del div de respuestas
        if (element.innerHTML) {  // Si el elemeto tiene HTML interno
            if(element.childNodes.length > 2) {  // I la longuitud de estos childnodes del elemento es 2(img+input/Solucion+input)
                
                let srcImg;
                if(element.childNodes[0].nodeName == 'IMG') {  // Si el nodeName es tipo IMG
                    srcImg = element.childNodes[0].attributes.src.value;  // Recoger la imagen
                    
                    // Get the element by the id and chek the value
                    let input = document.getElementById(srcImg);

                    if(input.value.length > 0) {  // Si el valor es superior a 0
                        comprovarNumeroInput(input.value, srcImg, srcImg);  // Pasamos el valor y la imagen
                    }
                }
            }
        }
    });

    let sol = document.getElementById('sol');  // Recogemos el inputd de la solucion 
    if(sol.value.length > 0) {  // Si la longuitud de la solucion es superior a 0(es decir, que tiene un valor)
        comprovarNumeroInput(sol.value, 'sol', 'solucion');  // Comprovamos el input de solucion
    }

    // Si el numero de inputs con clase de correcta es 4(todos son correctos)
    if(document.querySelectorAll('.correcta').length == 4) {  
        
        document.getElementById('next').style.display = "inline-block";  // Mostramos el boton de proximon juego
        parar();  // Paramos el tiempo
        guardarPartida('done');  // Cambiamo el estado de la partida a done/acabado
    
    }

    // Actualizar contadores
    document.querySelector('#faltas a').innerHTML = faltas;
    document.querySelector('#puntuacion a').innerHTML = puntuacion;

}

// Funcion para las pistas(son generales(1-10/11-20/etc.))
function pistasPorNumero(num){

    if(num >= 0 && num <= 10) {
        return 'El seu nombre es entre 0 i 10(incluits)';
    } else if(num > 10 && num <= 20) {
        return 'El seu nombre es entre 11 i 20(incluits)';
    } else if(num > 20 && num <= 30) {
        return 'El seu nombre es entre 21 i 30(incluits)';
    } else if(num > 30 && num <= 40) {
        return 'El seu nombre es entre 31 i 40(incluits)';
    } else if(num > 40 && num <= 50) {
        return 'El seu nombre es entre 41 i 50(incluits)';
    } else if(num > 50 && num <= 60) {
        return 'El seu nombre es entre 51 i 60(incluits)';
    }

}

//  Funcion para mostrar las pistas
function compararYMostrar(incorrecto) {
    if(document.getElementById('pistas')) {  // Si ya habia pistas mostradas
        document.getElementById('pistas').remove();  // Borramos esas pistas
    }

    let src = incorrecto.attributes.id.value;  // Recogemos el valor de la imagen
    let numero = jsonSolucio[src];  // El numero de la solucion
    let id = document.getElementById(src).parentNode;  // I recogemos el parrafo entero
    let pista = pistasPorNumero(numero);  // I la pista desde el numero
    
    id.innerHTML += `<span id="pistas"><br> ${pista} </span>`;   // Al parrafo le añadimos al final la pista

    if(incorrecto.value.length > 0) {  // Si el valor del input esta vacio
        document.getElementById(src).value = incorrecto.value  // Le volvemos a dar el valor de incorrecto(pq sino se borra)
    }

    puntuacion -= 30;  //  Le quitamos 30 a la puntuacion por el uso de pistas

}

// Funcion para mostrar los incorrectos vacios
function buscarIncorrectosVacios() {
    let input = document.querySelector('.incorrecta');  // Si tienen la classe incorrecta

    if(input == null) {  // Si esta vacio
        let nuevoComparar = document.querySelector('input');  // Recogemos el primer input
        compararYMostrar(nuevoComparar);  // I mostramos la pista de este
    } else {
        compararYMostrar(input);  // Sino mostramos la pista del incorrecto
    }
}

// Funcion para recoger el json del estado del juego actual
function getGame(estate) {

    // Arrrays rellenables
    let arrayIncorrectas = new Array();
    let arrayCorrectas = new Array();
    let arrayIntentos = new Array();

    // Rellenamos los arrays con la informacion de pantalla
    document.querySelectorAll('.incorrecta').forEach((element, index) => {  // Array de incorrectos
        arrayIncorrectas[index] = element.id + ', ' + element.value;
    });
    document.querySelectorAll('.correcta').forEach((element, index) => {    // Array de correctos
        arrayCorrectas[index] = element.id + ', ' + element.value;
    });
    document.querySelectorAll('.intento').forEach((element, index) => {     // Array de intentos
        arrayIntentos[index] = element.id + ', ' + element.value;
    });

    //  Si el array de incorrectas es 4
    if(arrayCorrectas.length == 4) {
        estate = 'done';  // Cambiamos el estado a done(aunque venga intento si esta correcto, pasara a done)
    }

    // Variable con el estado del jugoo general
    let gameStatus = {
        time: document.querySelector('#tiempo a').innerHTML,  // Guardamos el tiempo usado
        faults: document.querySelector('#faltas a').innerHTML,  // Guardamos las faltas
        puntuacion: puntuacion,         // Guradamos la puntuacion
        jsonExercici: jsonExercici,     // El json de mostrar por pantalla
        jsonSolucio: jsonSolucio,       // El json con la solucion
        correctas: arrayCorrectas,      // El array de correctas
        incorrectas: arrayIncorrectas,  // Array de incorrectas
        vacias: arrayIntentos,          // Array de intentos
        estate: estate                  // I el estado del juego
    }

    return gameStatus;  // Devolvemos el estado de juego en json
}

// Funcion para guardar la partida
function guardarPartida(estate) {

    if(!idUsuario) {    // Si el usuario no esta identificado

        // Aviso de que no puede guardar su partida
        document.querySelector('main').innerHTML += "<h2> Usted no esta iniciado, no puede guardar su partida </h2>";
    
    } else {            // Si el usuario esta identificado
        // Variables con el usuario
        let usuario = JSON.parse(localStorage.getItem(idUsuario));
        let jsonGame = getGame(estate);  //  Y el estado del juego

        usuario.gameEstate[0].map1[0].level3 = jsonGame;  // Guardamos el estado de juego actual
        
        localStorage.setItem(idUsuario, JSON.stringify(usuario));  //  I lo actualizamos en el LS
    }
}

// Funcion para buscar al usuario
function buscarUsuario() {
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).estate == true) {// Si el estado esta en truee(iniciado)
            idUsuario = localStorage.key(i); // Guardamos el id
        }
    }
}

// Funcion para colocar los numeros en su input
function colocar(classe, array) {
    
    array.forEach(element => {  // Recorremos el array 
        element = element.split(', '); // Separamos el elelmento(ya que la 1a parte es el id y la 2a parte es el valor)
        
        // Guardamos los valores en variables (mas facil acceso)
        let src = element[0]; 
        let value = element[1];

        document.getElementById(src).className = classe;  // Le damos una clase al id del src(sera classe correcta o incorrecta)
        document.getElementById(src).value = value;  // I le damos el valor
        
        if(classe == 'correcta') {  // Si la clase es correcta
            correctas++;  // Subiremos el contador de correctas +1
            document.getElementById(src).type = "none";  // Le quitaremos el tipo
            document.getElementById(src).readOnly = true;  // I por ultimo lo ponemos a readonly(no editable)
        }
    
    });
}

// Funcion para colocar el array de correctas
function colocarCorrectas(array) {
    if (Object.keys(array).length != 0) {  // Si el array no esta vacio
        colocar('correcta', array); // Colocamos los valores en el input
    } 
}

//  Funcion para colocar el array de incorrectas
function colocarIncorrectas(array) {
    if (Object.keys(array).length != 0) {    // Si el array no esta vacio
        colocar('incorrecta', array);   // Colocamos los valores en el input
    } 
}

// Funcion para mostrar la informacion guardada del ususario
function mostrarInformacion(time, faults, puntuacio) {
    // Damos los valores guardados a las variables globales(del archivo)
    faltas = faults;
    puntuacion = puntuacio; 

    // Damos los valores del json a pantalla
    document.querySelector('#tiempo a').innerText = time;
    document.querySelector('#faltas a').innerText = faults;
    document.querySelector('#puntuacion a').innerText = puntuacion;
}

// Funcion para eleguir i colocar el ejercicio
function eleccionIColocar() {
    // Elegir el numero de manera aleatoria con la longuitud del fichero del nivel
    let rand = Math.floor(Math.random() * lev3exercici.length);

    // Guardamos los valores en una variable mas global para poderlo utilizar
    jsonExercici = lev3exercici[rand];
    jsonSolucio = lev3correccio[rand];
    
    // Colocar la tabla y las respuestas(parte de abajo de la pantalla antes de la informacion)
    colocarTabla();
    colocarRespuestas();
}

// EVENTOS
// ------------

// Evento al cambiar el valor de un input
addEventListener('input', (e)=> {
    e.target.className = "intento";  //Cambiamos la clase del input a intento(asi lo podremos comprovar despues)
});

// Evento de comprovar los numeros
btnCheck.addEventListener('click', ()=> {
    compararNumeros();  //Comparamos y comprobamos los numeros
});

// Evento para las pistas
btnPista.addEventListener('click', ()=> {
    //Funcion de buscar numero incorrecto, si no hay buscara el primer input vacio, y mostrara la pista de este mismo
    buscarIncorrectosVacios(); 
}); 

// Evento parsa el boton de guardar
btnSave.addEventListener('click', ()=> {
    guardarPartida('intento');
});

// Evento al cargar la pagina
window.addEventListener('load', () => {

    buscarUsuario(); // Miramos si el usuario esta iniciado

    if(idUsuario) {  //Si el usuario esta iniciado(variable no vacia)

        // Recogemos la partida de este nivel
        let level3 = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map1[0].level3;

       
        if(level3.estate == 'intento') {        //Si el estado esta en intento

            //Guardamos en las variables semi-globales(de archivo) del ejercicio y las soluciones
            jsonExercici = level3.jsonExercici;
            jsonSolucio = level3.jsonSolucio; 

            //Colocamos la tabla y la respuesta por pantalla
            colocarTabla();
            colocarRespuestas();
            
            //Colocamos las correctas y las incorrectas
            colocarCorrectas(level3.correctas);
            colocarIncorrectas(level3.incorrectas);

            //I finalmente mostramos la informacion(tiempo, faltas y puntuacion)
            mostrarInformacion(level3.time, level3.faults, level3.puntuacion);

       
        } else if(level3.estate == null){       //Si el estado esta vacio

            //Llamamos para que eliga un ejercicio aleatorio y que lo coloque
            eleccionIColocar(); 

            //I guardamos la partida con el estado de intento
            guardarUsuario('intento');

        } else if(level3.estate == 'done') {    //Si el estado esta en done(finalizado)

            //Mostramso el boton de proxima partida
            document.getElementById('next').style.display = "inline-block";
            parar();  //I paramos el temporizador/cronometro

        }

    // Si el usuario no esta inciado
    } else {

        //Elegimos un ejercicio del nivel aleatorio y lo mostramos por pantalla
        eleccionIColocar();

    }

});