// IMPORT
// Easy
import lev2EASYExercice from './../json/lev2lev3EASYmapa.json' assert { type: 'json' }; 
import lev2EASYParedes from './../json/lev2lev3EASYparedes.json' assert { type: 'json' };

// Medium
import lev2MEDIUMExercice from './../json/lev2lev3MEDIUMmapa.json' assert { type: 'json' }; 
import lev2MEDIUMParedes from './../json/lev2lev3MEDIUMparedes.json' assert { type: 'json' };

// Dificult
import lev3lev2Exercice from './../json/lev3lev2Mapa.json' assert { type: 'json' };
import lev3lev2Paredes from './../json/lev3lev2Paredes.json' assert { type: 'json' };

// Importar tiempo
import {parar} from './tiempo.js';

// Constantes globales necesarias
const laberinto = document.getElementById('laberinto');     // Div que contiene el laberinto
const level = document.getElementById('level');             // Div con el nivel actual de laberinto

// BOTONES
const btnSave = document.getElementById('save');            // Boton de guardar
document.getElementById('next').style.display = "none";     // Escander boton de proximo juego

// Variables globales
let jsonLaberinto;  // JSON de pintar por pantalla
let jsonParedes;    // Paredes del laberinto
let rand;           // Numero de juego actual del nivel del json

let fila = 0;       // Numero de fila maxima
let cuadrado = 0;   // Numero de cuadrado actual
let falta = 0;      // Numero de faltas

let idUsuario;      // Id del usuario(si esta iniciado)


// FUNCIONES
// -------------

// Funcion para colocar el laberinto por pantalla
function colocarLaberinto() {

    let keys = Object.keys(jsonLaberinto);  // Recogemos las keys del laberinto('fila1' / 'fila01')
    
    for(let i = 0; i < keys.length; i++) {  // Recorremos las filas 
        colocarFila(keys[i]); // Colocar filas(esto llamara a colocar quadrados, que ara que se dibujen por pantalla)
    }

}

// Funcion para colocar las filas
function colocarFila(fila) {

    let keys = Object.keys(jsonLaberinto[fila]);  // Recogemos los keys de las filas('cuadrado1' / 'cuadrado01')

    for(let i = 0; i < keys.length; i++) {  // Recorremos los cuadrados de esa fila
        colocarCuadrados(jsonLaberinto[fila][keys[i]], fila, keys[i]);  // Colocamos los cuadrados por fila ym cuadrado
    }

}

// Funcion para colocar los cuadrados
function colocarCuadrados(quadrados, fila, quadrado) {

    laberinto.innerHTML += "<div class='" + fila + quadrado + "' id='fromLaberinto'></div>";  // Div del cuadrado actual
    let quadradoActual = document.querySelector('div.'+ fila + quadrado);  // Recogemos el cuadrado actual

    // La altuara y width de este cuadrado predefinido a 40px x 40px
    let width=40;
    let height=40;

    quadrados.forEach(element => {  // Recorremos el array del cuadrado(con los border)
        quadradoActual.style[element] = "4px solid black";  //  Damos el border del array al div
        
        // Cambiamos los valores predefinidos para que no se deformen los cuadrados
        if(element == 'border-left' || element == 'border-right' ) {  // Si el border es de la izquierda o de la derecha
            width -= 4;     // La anchura bajara 4 px
        } else if(element == 'border-top' || element == 'border-bottom'){ // Si el border es de arriba o de abajo
            height -= 4;    // La altura bajara 4 px
        }

    });

    //Damos a los cuadrados el width y height cambiados para que no se deforme en pantalla
    quadradoActual.style.width = width + "px !important";
    quadradoActual.style.height = height + "px !important";
}

//Funcion para dibujar el muñequito
function colocarInicioFinal(claseIncio, claseMuñeco, claseFinal, border) {

    if(!document.querySelector('.actual')) {  // Si no hay actual(es decir que no viene de un json guardado)

        // Damos a la clase de filaXcuadradoY clase actual
        document.querySelector('.' + claseIncio).className += " actual";  
        // Y a esta misma le dibujamos un muñeco y un background(desde css)
        document.querySelector('.' + claseIncio).innerHTML = `<img src="./../../img/clipart2215137.png" class="${claseMuñeco}" width="18"/>`;
    
    }
    
    //Pintamos el final(background)
    document.querySelector('.' + claseFinal).className += " final";
    document.querySelector('.final').style[border] = "5px solid black";  //Pintamos pared en caso de ser necesario
}

// Funcion para colocar donde esta el principio y donde esta el final del laberinto
function colocarPrincipioFinal() {

    if(level.innerHTML == 'easy') {             // Si el nivel es facil(lev2lev2easy)
        
        // Total de 4 laberintos(0-3)
        if(rand == 0) {         // Si random es 0(laberinto 0)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila3cuadrado1', 'reves', 'fila6cuadrado5', 'borderLeft');  

        } else if(rand == 1){   // Si random es 1(laberinto 1)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila1cuadrado4', 'recto', 'fila8cuadrado5', '');  

        } else if(rand == 2) {  // Si random es 2(laberinto 2)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila1cuadrado4', 'reves', 'fila7cuadrado4', 'borderLeft');  

        }else if(rand == 3) {   // Si random es 3(laberitno 3)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila1cuadrado3', 'reves', 'fila5cuadrado3', 'borderTop');  
        }   

    } else if(level.innerHTML == 'medium') {    // Si el nivel es mediano(lev2lev2medium)

        // Total de 4 laberintos(0-3)
        if(rand == 0) {         // Si random es 0(laberinto 0)  

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila01cuadrado07', 'reves', 'fila18cuadrado08', 'borderLeft');  

        } else if(rand == 1) {  // Si random es 1(laberinto 1)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila02cuadrado01', 'recto', 'fila10cuadrado11', 'borderTop');  

        } else if(rand == 2) {  // Si random es 2(laberinto 2)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila01cuadrado07', 'reves', 'fila10cuadrado11', 'borderLeft');  

        } else if(rand == 3) {  // Si random es 3(laberinto 3)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila01cuadrado01', 'reves', 'fila09cuadrado14', '');  

            // Ya que hay dos finales, hay que dibujarlo sin la funcion
            document.querySelector('.fila09cuadrado13').className += " final";
            document.querySelector('.fila09cuadrado13').style.borderLeft = "5px solid black";

        }

    } else if(level.innerHTML == 'difficult') { // Si el nivel es dificil(lev2lev2)
        
        // En este nivel solo hay 2 laberintos
        if(rand == 0) {         // Si el rand es 0(laberinto 0)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila01cuadrado10', 'reves', 'fila20cuadrado11', 'borderLeft');  

        } else if(rand == 1) {  // Si el rand es 1(laberinto 1)

            // Colocar muñeco y final + clase inicio/actual
            colocarInicioFinal('fila01cuadrado01', 'recto', 'fila17cuadrado17', '');  

        }
    }
}

// Funcion para comprovar si el usuario se esta chocando con una pared
function comprobarPared(direction, actual) {

    // Variables que guardaran en a que fila nos queremos mover o a que cuadrado nos queremos mover
    let filaActual;
    let quadradoActual;

    // Segun el nivel, la manera de escribir es diferente(easy = 1, medium & difficult = 01)
    if(level.innerText == 'easy') {

        // Encontramos y separamos la fila del cuadrado en las variables
        filaActual =  actual.split("", 5).join("");
        quadradoActual = actual.split("", 14).slice(5).join("");

    } else {

        // Encontramos y separamos la fila del cuadrado en las variables
        filaActual =  actual.split("", 6).join("");
        quadradoActual = actual.split("", 16).slice(6).join("");

    }

    // Recogemos las paredes del json de la posicion actual en la que nos encontramos
    let paredes = jsonParedes[filaActual][quadradoActual];
    let posible = true; // Incializamos posible a true(si no entra es que es posible pasar)

    //Recorremos el array de paredes
    paredes.forEach(element => {
  
        // Este if-else if-else se podria hacer en una sola linea, pero creo que es mas entedible as
        if((direction == 'up' && element == 'top') ||
            (direction == 'down' && element == 'bottom') ||
            direction == element) {
                posible = false;
        }

        // Segun la direccion del teclado y el elemento
        if(direction == 'up' && element == 'top') {
            posible = false;  // Pasaremos a false si pasa o choca(igual con los demas)
        } else if(direction == 'down' && element == 'bottom') {
            posible = false;
        } else if(direction == element) {  // Estos son pq tienen el mismo nombre tanto en el json como en la direccion(left/right)
            posible = false;
        } else if(direction == element) {
            posible = false;
        }

    });

    return posible;   // Devolvemos si es posible o no ir hacia esa direccion
}

// Funcion para cambiar de cuadrado y moverse por el tablero
function movePointerAndDraw(direction) {

    // Recogemos en variables la posicion del final y la posicion actual del jugador
    let pointer = document.querySelector('.actual').className;
    let final = document.querySelector('.final').className;

    //Guardamos en claseFinal en que fila+quadrado se encuentra la posicion final
    let arrayFinal = final.split(' ')
    let classeFinal =  arrayFinal[0];

    // Guardamos en anterior en que fila+cuadrado esta actualmente(antes de cambiar de alli que se llame anterior)
    let arrayInfo = pointer.split(' ')
    let anterior =  arrayInfo[0];
    arrayInfo = arrayInfo[0].split('');  //Separado para futuros usos(l.261) -> cabiar fila/cuadrado

    // Comprovar si es posible ir hacia la direccion que queremos
    let posible = comprobarPared(direction, pointer);    

    //Si es posible moverse hacia donde el usuario quiere
    if(posible) {  

        //Variables locales del if
        let filaActual;         // Fila actual a la que pasaremos
        let quadradoActual;     // Quadrado actual al que pasaremos
        
        let filaAnterior;       // Fila anterior(la que antes tenia actual)
        let quadradoAnterior;   // Quadrado anterior (el actual de antes)
        
        let posicionActual;     // Guardara tanto la fila como el cuadrado actual
        let divActual;          // Div que pasara a tener la clase actual
        let img;                // Imagen que ira dentro del div

        // Dependiendo del tipo de nivel, se cortara antes o despues
        if(level.innerText == 'easy') {  // 'fila1quadrado1'(ni la fila no el cuadrado llegan a 10)
            filaAnterior = filaActual = arrayInfo[4];
            quadradoAnterior = quadradoActual = arrayInfo[13];
        } else {                         // 'fila01quadrado01' (puede que la fila o el cuadrado o ambos superen el 10)
            filaAnterior = filaActual = arrayInfo[4] + arrayInfo[5];
            quadradoAnterior = quadradoActual = arrayInfo[14] + arrayInfo[15];
        }
        
        // Dependiendo de la direccion se ira hacia un cuadrado diferente o una fila diferente
        if(direction == 'right' || direction == 'left') {  // Si la direccion es hacia los lados

            if(quadradoActual <= cuadrado) {  // Comprovaremos que no sobresalgan del width de cuadrados
               
                if(direction == 'right') {  // Si la direccion es derecha

                    img = '<img src="./../../img/clipart2215137.png" class="recto" width="18"/>';  // Se mostrara el muñequito mirando hacia la derecha
                    +quadradoActual++;  // I el cuadrado actual se sumara 1(uno hacia la derecha)
                
                } else {    // En cambio, si la direccion es izquierda
                
                    img = '<img src="./../../img/clipart2215137.png" class="reves" width="18"/>';  // El muñequito se vera mirando a la izquierda
                    +quadradoActual--;  // I el cuadrado actual se restara(ira ahacia la izquierda 1 paso)
                
                }
            }

        } else if(direction == 'up' || direction == 'down') {  // Si la direccion es hacia arriba o abajo

            if(filaActual < fila) {  // Se comprovara que es posible si la fila no es maxima

                if(direction == 'up') {   // Si va hacia arriba
                
                    +filaActual--;  // La fila se restara(ira 1 hacia arriba)
                    img = '<img src="./../../img/clipart2215137.png" class="reves" width="18"/>';  // I el muñequito mirara a la izquierda
                
                } else {  // En cambio si se va hacia abajo
                
                    +filaActual++;   // La fila actual se sumara(se mover 1 hacia abajo) 
                    img = '<img src="./../../img/clipart2215137.png" class="recto" width="18"/>';  // I el muñequito mirara a la derecha
                
                }
            }
        }

        // Si el nivel es easy y el muñequito se ha movido del lugar(no esta en la misma fila y quadrado)
        if(level.innerHTML == 'easy' && ((arrayInfo[13] != quadradoActual && arrayInfo[4] == filaActual) || (arrayInfo[13] == quadradoActual && arrayInfo[4] != filaActual)) && filaActual != 0 && quadradoActual != 0) {
            
            // Guardamos en que fila y cuadrado esta actualmente
            arrayInfo[13] = quadradoActual;
            arrayInfo[4] = filaActual;

            // Juntamos el array con la posicion (pasa a  'filaXcuadradoY' -> antes era chars separadas)
            posicionActual = arrayInfo.join("");
        
        } // Si el nivel es medio o dificil y el muñeco que ha movido
        else if((level.innerHTML == 'difficult' || level.innerHTML == 'medium' )  && ((+quadradoAnterior != quadradoActual && +filaAnterior == filaActual) || (+quadradoAnterior == quadradoActual && +filaAnterior != filaActual)) && filaActual != 0 && quadradoActual != 0){
            // Damos a la var de fila el valor con 0 delante sin es <9 sino el valor sera el mismo + fila delante 
            let fila = (filaActual < 10 && typeof filaActual == 'number') ? "fila0"+filaActual : "fila"+filaActual;
            
            // Hacemos lo mismo que con la fila pero con cuadrado actual <9 cuadrado0+N sino cuadrado+N
            let quadrado = (quadradoActual < 10 && typeof quadradoActual == 'number') ? "cuadrado0"+quadradoActual : "cuadrado"+quadradoActual;

            posicionActual = fila + quadrado;    // Recogemos la posicion actual con filaXXquadradoYY
        }

        // Volvemos a dar la clase al anterior sin la palabra " actual"
        document.querySelector('.' + anterior).className = anterior; 
        // Localizamos el div actual
        divActual = document.querySelector('.' + posicionActual);         
        
        divActual.innerHTML = img; // Añadimos la imagen al div
        divActual.className += " actual";  // I le añadimos la cvlase actual

        // Si la clase final y la posicion actual son la misma
        if(classeFinal == posicionActual) {
            finalizarPartida(); // Finalizamos la partida (mostramos boton de next + guardamos la partida si esta inciado)
        }

    } else {  //Sino es posible moverse hacia donde quiere

        falta++;  //Sumaran las faltas(cada 2 faltas se mostrara ) por pantalla

        //Actualizar faltas
        document.querySelector('#faltas a').innerHTML = Math.floor(falta/2);  // Cada dos choques la falta aumentara
    }
}

// Funcion para guardar la partida y mostrar el boton de siguiente
function finalizarPartida() {

    if(idUsuario) {  // Si el usuario esta iniciado, cambiaremos su estado 

        // Recogemos el usuario del LS
        let user = JSON.parse(localStorage.getItem(idUsuario));

        // Cambaimos el estado dependiendo del nivel
        if(level.innerText == 'easy') {
            user.gameEstate[0].map2[0].level3.easy.estate = "done";
        } else if(level.innerHTML == 'medium') {
            user.gameEstate[0].map2[0].level3.medium.estate = "done";   // Cambiamos el estado tanto del individual
            user.gameEstate[0].map2[0].level3.estate = "done";          // Como del estado general del nivel
        } else if(level.innerHTML == 'difficult') {
            user.gameEstate[0].map3[0].level2.estate = "done";            
        }

        // Actualizamos el usuario
        localStorage.setItem(idUsuario, JSON.stringify(user));
        guardarPartida();  // Guardaremos el estado de la partida(los otros parametros y estado de juego general)
    }

    // Paramos el cronometro
    parar();

    // Mostramos el mensaje de final y el boton de "Next game"
    document.getElementById('next').style.display = "inline-block";
    document.querySelector('main').innerHTML += "<h2 id='final'> Ha llegado al final, clica en 'Next Game' </h2><br>";
}

// Funcion para comprovar si el usuario esta iniciado
function getUserIDUsuario() {

    for(let i = 0; i < localStorage.length; i++) {  // Recorremos el LS
        
        let user = JSON.parse(localStorage.getItem(localStorage.key(i)));  // Lo recogemos en una variable para mas facil lectura

        if(user['estate'] == true) {  // Si el estado del usuario esta en true
            idUsuario = localStorage.key(i);  // Recogemos el id
        }
    }

}

// Funcion para guardar el estado actual de la partida(sin cambiar el estado como tal del nivel)
function guardarPartida() {
    // Recoger estado de partida en variable
    let gameEstatus = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map2[0].level3;
    let jsonJuego;  // Varaible para recoger el estado guardado(cambiaremos directamente en este)

    // Recogemos json dependiendo del nivel
    if(level.innerText == 'easy') {
        jsonJuego = gameEstatus.easy;
    } else if(level.innerHTML == 'medium') {
        jsonJuego = gameEstatus.medium;
    } else if(level.innerHTML == 'difficult') {
        // Al ser del m3l2(diferente ruta)
        jsonJuego = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map3[0].level2;
    }

    //Recogemos todas las imagenes (rectas y giradas)
    let rectos = document.querySelectorAll('.recto');
    let girados = document.querySelectorAll('.reves');

    // Guardaremos en array las imagenes rectas y giradas(solo las clases , no todo)
    let arrayRectos = new Array(rectos.length);
    let arrayGirados =  new Array(girados.length);

    // Recorremos los arrays generales de recto y giraso
    rectos.forEach((element, index) => {
        // Guardamos la clase en arrayX een el indice(para que no se repita(forma facil -> tmb hay push()))
        arrayRectos[index] = element.parentNode.classList[0];
    });
    girados.forEach((element, index) => {
        arrayGirados[index] =
         element.parentNode.classList[0];
    });

    // Guardar directamente en el json la partida (array de la jugada con la puntuacion, tiempo, faltas, array de girados y rectos)
    jsonJuego.rectos = arrayRectos;
    jsonJuego.girados = arrayGirados;
    jsonJuego.time = document.querySelector('#tiempo a').innerHTML;
    jsonJuego.puntuacion = document.querySelector('#puntuacion a').innerHTML;
    jsonJuego.faltas = falta;

    // Guardamos tmb el lugar actual de la partida(lugar actual del muñequito con clase "actual")
    let actual = document.querySelector('.actual');
    actual = actual.className.split(' ')[0];
    jsonJuego.actual = actual;  // Guardamos tmb en el json

    // Get user
    let user = JSON.parse(localStorage.getItem(idUsuario));

    // Guardamos el estado en su nivel propio
    if(level.innerText == 'easy') {
        user.gameEstate[0].map2[0].level3.easy = jsonJuego;
    } else if(level.innerHTML == 'medium') {
        user.gameEstate[0].map2[0].level3.medium = jsonJuego;
    } else if(level.innerHTML == 'difficult') {
        user.gameEstate[0].map3[0].level2 = jsonJuego;
    }

    // Guardar en el LS
    localStorage.setItem(idUsuario, JSON.stringify(user));
}

// Funcion para colocaer las imagenes en el tablero del laberinto
function colocarMuñecos(sentido, array) {

    // Recorremos el array con los muñecos con x sentido
    array.forEach(elemento => {

        // Creamos la imagen con el sentido en la clase(ya que siempre es la misma imagen)
        let img = `<img src="./../../img/clipart2215137.png" class="${sentido}" width="18"/>`;
        let divActual = document.querySelector('.' + elemento);  // Recogemos el divActual del elemento(donde esta el elemento en el laberinto(fXqY))

        divActual.innerHTML = img;  // Colocamos la imagen en el laberinto en el divActual

        // Si la partida esta en el lugar de clase final
        if(divActual == document.querySelector('.final')) {

            // Mostramos el mensaje de final y el boton de "Next game"
            document.querySelector('main').innerHTML += "<h2 id='final'> Ha llegado al final, clica en 'Next Game' </h2><br>";
            document.getElementById('final').style.textAlign = "center";
            document.getElementById('next').style.display = "inline-block"; 
           
            // Actualizamos la puntuacion restandole las faltas a 1000(falta = 2 choques en pared)
            document.querySelector('#puntuacion a').innerHTML = 1000 - (falta * 10);

            setTimeout(parar, 500);  // Paramos el cronometro 0.5 segundos luego de comprovar que la partida esta acabada
        
        }
    });
}

// Funcion para recoger el Json de la partida anterior(array de rectos, girados y lugar actual) solo para el map2
function recogerJSONdePartidaAnterior(level) {

    // Variables locales que contendran la informacion
    let reves;
    let rectos;
    let actual;

    // Recogemos el nivel actual que vamos a mostrar
    let nivel = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map2[0].level3[level];

    // Recogemos el json del tablero del laberinto y las paredes del laberinto
    jsonLaberinto = nivel.jsonPartida;
    jsonParedes = nivel.jsonParedes;
    rand = nivel.numero;  // I el numero de laberinto del nivel

    // Si los arrays no estan vacios
    if(nivel.rectos != null) {
        rectos = nivel.rectos;  // Rellenamos las variables
    }
    if(nivel.girados != null){
        reves = nivel.girados;
    }
    if(nivel.actual != null){
        actual = nivel.actual;
    }

    return [rectos, reves, actual];  // Devolvemos la informacion
}

// Funcion que elegira el laberinto la primera vez que entra el juego
function eleccionLaberinto() {

    // Segun el nivel elegira con ranom un numero aleatorio entre 0-X.length
    if(level.innerHTML == 'easy') {

        rand = Math.floor(Math.random() * lev2EASYExercice.length);
        jsonLaberinto = lev2EASYExercice[rand];
        jsonParedes = lev2EASYParedes[rand];

    } else if(level.innerHTML == 'medium') {

        rand = Math.floor(Math.random() * lev2MEDIUMExercice.length);
        jsonLaberinto = lev2MEDIUMExercice[rand];
        jsonParedes = lev2MEDIUMParedes[0];
    
    } else if(level.innerHTML == 'difficult') {
    
        rand = Math.floor(Math.random() * lev3lev2Exercice.length);
        jsonLaberinto = lev3lev2Exercice[rand];
        jsonParedes = lev3lev2Paredes[rand];

    }

}

// Funcion para la medida del laberinto en el css y del grid layout en el css
function medidaLaberinto() {

    let width;
    let height;

    // Segun el nivel
    if(level.innerHTML == 'easy') {  

        // Recogemos el width y height del laberinto a dibujar
        width = Object.keys(jsonLaberinto['fila1']).length;
        height = Object.keys(jsonLaberinto).length;

    } else {

        // Lo mismo que el de arriba solo que para los niveles medium i difficult
        width = Object.keys(jsonLaberinto['fila01']).length;
        height = Object.keys(jsonLaberinto).length;

    }

    // Guardamos el maximo de altura y anchura del laberinto y el numero de filas y cuadrados
    fila = height;
    cuadrado = width;

    // Lo pasamos al style
    laberinto.style.width = (width * 31) + "px";
    laberinto.style.height = (height * 31) + "px";
    laberinto.style.gridTemplateColumns = "repeat( " + width + ", 31px)";
    laberinto.style.gridTemplateRows = "repeat(" + height + ', 31px)';
}

// Funcion de inicializacion de estado
function nuevoEstado() {

    eleccionLaberinto();  // Elejimos un laberinto con rando

    let estado = {
        estate: 'intento',              // Cambiamos el estado a intento
        jsonPartida: jsonLaberinto,     // Añadimos el json laberinto
        jsonParedes: jsonParedes,       // Añladimos las paredes
        rectos: null,
        girados: null, 
        time: null, 
        numero: rand,                   // I el numero random
        faltas: null,
        puntuacion: null,
        actual: null
    };

    return estado;  // Devolvemos el estado
}


// EVENTOS
// ---------

// Evento para el boton de guardar
btnSave.addEventListener('click', () => {

    if(idUsuario) {  // Si el usuario esta inicado
        guardarPartida();  // Guardamos la partida
    }

});

// Evento para cuando un usuario clique una tecla en el teclado
window.addEventListener('keydown', (e)=> {

    // Segun la tecla clicada, ira a la derecha, izquierda, arriba o abajo
    if(e.key == "ArrowRight" || e.key == "d") { 

        movePointerAndDraw('right');    // Mandamos a que mueva el puntero de .actual a la derecha

    } else if(e.key == "ArrowLeft" || e.key == "a") {

        movePointerAndDraw('left');     // Mandamos a que mueva el puntero de .actual a la izquierda

    } else if(e.key == "ArrowUp" || e.key == "w") {

        movePointerAndDraw('up');       // Mandamos a que mueva el puntero de .actual arriba

    } else if (e.key == "ArrowDown" || e.key == "s") {

        movePointerAndDraw('down');     // Mandamos a que mueva el puntero de .actual abajo

    }

});

// Evento al cargar la pagina
window.addEventListener('load', () => {

    getUserIDUsuario();  // Miramos si el usuario esta iniciado

    // Variables para rellenar la pantalla desde el estado json
    let actual = null;
    let reves = null;
    let rectos = null;

    // Saber si el juego esta acabado en el json del jugador
    let estateDone = false;

    if(level.innerHTML == 'easy') {             // Si el nivel es facil (m2l2easy)
        
        if(idUsuario) {     // Si el usuairo esta iniciado en LS

            // Guardamos el estado del juego en una variable(mas facil acceso y lectura)
            let gameEstatus = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map2[0].level3;

            if(gameEstatus.estate == null) {    // Si el estado del jugo esta vacio

                eleccionLaberinto();     // Elegimos un laberinto con este nivel(easy)        

                // Creamos el estado
                let estado = { 
                    estate: "intento",  // Cambaimos el estado general a intento(ya esta inciado al iniciar el nivel facil)
                    easy : {
                        estate: "intento",              // Guardamos el estado a intento
                        jsonPartida: jsonLaberinto,     // Guardamos el json del laberinto
                        jsonParedes: jsonParedes,       // I el json de paredes
                        rectos: null,
                        girados: null,
                        time: null,
                        numero: rand,                   // I el numero rand
                        puntuacion: null,
                        faltas: null, 
                        actual: null
                    },
                    medium : {
                        estate: null,
                        jsonPartida: null,
                        jsonParedes: null,
                        rectos: null,
                        girados: null, 
                        time: null, 
                        numero: null, 
                        faltas: null,
                        puntuacion: null,
                        actual: null
                    }
                }
                gameEstatus = estado;  // Cambiamos el estado del juego tanto actual como el que se va a guradar

                let juego = JSON.parse(localStorage.getItem(idUsuario)); 
                juego.gameEstate[0].map2[0].level3 = gameEstatus;  // Cambaimos el valor del estado del nivel3

                // Subir a localStorage
                localStorage.setItem(id, JSON.stringify(juego));
            }

            //Recoger los json guardados de la partida anterior o actual(ya que se guarda justo antes de iniciar)
            if(gameEstatus.easy.estate == 'intento') {
                [rectos, reves, actual] = recogerJSONdePartidaAnterior('easy');  // Recogemos los valores de la partida anterior
            } else if(gameEstatus.easy.estate == 'done' ) {  // Si el estrado de la partida es done(acabad0)
                estateDone = true;  // Cambiamos el valor de partida acabada a true
            }

        }  
        
    } else if(level.innerHTML == 'medium') {    // Si el nivel es medio (m2l2medium)

        if(idUsuario) {  // Si el usuario esta iniciado
            
            let gameEstatus = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map2[0].level3;  // Recogemos el estado del game medio en variable
            
            if(gameEstatus.medium.estate == null) { // Si el estao del laberinto est vacio
    
                // Recogemos el usuario en una variable
                let usuario = JSON.parse(localStorage.getItem(idUsuario));

                // Cmabiamos el estaod del juego en el LS actualizando los datos
                usuario.gameEstate[0].map2[0].level3.medium = nuevoEstado();

                //Subir a localStorage
                localStorage.setItem(id, JSON.stringify(usuario));
            } 

            //Recoger los json guardados de la partida anteriors            
            if(gameEstatus.medium.estate == 'intento' ) {
                [rectos, reves, actual] = recogerJSONdePartidaAnterior('medium');  // Recogemos los valores del json
            } else if(gameEstatus.medium.estate == 'done') {        // Si el juego esta en acabado
                estateDone = true;      // Cambiamos el boleano a true(acabar la paritda)
            }

        }
        
    } else if(level.innerHTML == 'difficult') { // Si el nivel es dificil (mp3l2)
        
        if(idUsuario != null) {     // Si el usuario esta inciado
            
            let gameEstatus = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map3[0].level2;  // Recogemos el estado del juego actual

            // Si el estado esta vacio
            if(gameEstatus.estate == null) {
    
                let usuario = JSON.parse(localStorage.getItem(idUsuario));  // Llamamos al usuario
                usuario.gameEstate[0].map3[0].level2 = nuevoEstado();  // Guardar estado en el usuario

                //Subir a localStorage
                localStorage.setItem(id, JSON.stringify(usuario));
            }

            // Guardar nivel en una variable
            let lev2 = JSON.parse(localStorage.getItem(idUsuario)).gameEstate[0].map3[0].level2;

            //Recoger los json guardados de la partida anteriors            
            if(lev2.estate == 'intento') {  

                // Guardar los json en las variables globales
                jsonLaberinto = lev2.jsonPartida;
                jsonParedes = lev2.jsonParedes;
                rand = lev2.numero;

                // Recogemos los arrays (rectos y girados)
                if(lev2.rectos != null) {
                    rectos = lev2.rectos;
                }
                if(lev2.girados != null){
                    reves = lev2.girados;
                }

                // Recogemos el lugar actual
                if(lev2.actual != null){
                    actual = lev2.actual;
                }

                // Actualizamos el tiempo
                document.querySelector('#tiempo a').innerText = lev2.time == null ? "00:00:00" : lev2.time;

            } else if (lev2.estate == 'done' ) {  // Si la partida esta acabada
                estateDone = true;  // Acabamos la partida con el estado a true
            }
            
        } 
    }

    if(!idUsuario) {
        // Eleccion del laberinto con rand
        eleccionLaberinto();
    }


    // Si el juego ya esta finalizado
    if(estateDone) {

        // Mostramos el boton de "Next game"
        document.getElementById('next').style.display = "inline-block";

        // Escondemos el contenido del main(div del laberinto y el de faltas y puntuacion)
        document.getElementById('laberinto').style.display = 'none';
        document.getElementById('faltasIPuntuacion').style.display = 'none';

        // Mostramo que el juego ya esta acabado
        document.querySelector('main').innerHTML += "<h2 id='final'> Ha llegado al final, clica en 'Next Game' </h2><br>";
        document.querySelector('main').style.padding = "5%";

        // Borramos/escondemos los botones del footer(menos el de next)
        document.getElementById('save').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('howToPlay').style.display = 'none';


    } else {  // Si el juego no esta finalizado

        // Escondemos el boton de "Next Game"
        document.getElementById('next').style.display = "none";

        // Colocamos el laberinto por pantalla y le damos el tamaño ideal
        colocarLaberinto();
        medidaLaberinto();


        // Colocar muñequitos
        if(id) {
            if(Object.keys(actual).length != 0) {  // Si el array de actual tiene algun valor
                document.querySelector('.' + actual).className += ' actual';  // Añadimos al classname el nombre actual
            }

            // Colocacion de muñecos/imagenes segun sentido
            if(reves) { 
                colocarMuñecos('reves', reves);
            } 
            if(rectos) {
                colocarMuñecos('recto', rectos);
            }

        }
       
        colocarPrincipioFinal();
    }

});