//Import json
import lev3Exercice from './../json/lev2lev3.json' assert { type: 'json' }; 


const laberinto = document.getElementById('laberinto');

/**
 * FALTA
 *  - COMPROVAR PAREDES
 *  - LEFT - DOWN
 *  - FALTAS/(chocarse con las pareder)
 *  - PISTAS(darle un paso mas)
 *  - MARCAR SU CAMINO YA HECHO CON ANTERIORIDAD
 */

let jsonLaberinto;
let fila = 0;
let cuadrado = 0;

function colocarLaberinto() {
   let keys = Object.keys(jsonLaberinto);
   for(let i = 0; i < keys.length; i++) {
        colocarFila(keys[i]);
   }
    // colocarFila('fila1');
    // console.log(laberinto.style.gridTemplateColumns);
}

function colocarFila(fila) {
    // console.log(fila);

    // console.log(jsonLaberinto[fila]);

    let keys = Object.keys(jsonLaberinto[fila]);

    for(let i = 0; i < keys.length; i++) {
        colocarCuadrados(jsonLaberinto[fila][keys[i]], fila, keys[i]);
    }
    
}

function colocarCuadrados(quadrados, fila, quadrado) {

    laberinto.innerHTML += "<div class='" + fila + quadrado + "' id='fromLaberinto'> <p></p> </div>";
    let quadradoActual = document.querySelector('div.'+ fila + quadrado);

    quadrados.forEach(element => {
        quadradoActual.style[element] = "4px solid black";
        
    });

    if(fila == "fila3" && quadrado == "cuadrado1"){
        // quadradoActual.style.backgroundColor="red";
        quadradoActual.innerHTML += "<p id='bola'></p>";
        // quadradoActual.style.position = "relative";
        let bola = document.getElementById('bola');
      

    }
}

function movePointerAndDraw(direction) {
    let pointer = document.getElementById('bola').parentNode.className;
    let posicionAnterior = document.querySelector('.' + pointer);

    console.log(posicionAnterior.getBoundingClientRect());

    console.log(pointer, direction);
    let arrayInfo = pointer.split('');
    console.log(arrayInfo);
    let filaActual = arrayInfo[4];
    let quadradoActual = arrayInfo[arrayInfo.length-1];
    console.log("fila: " + filaActual);
    console.log("quadrado: " + quadradoActual);
    posicionAnterior.innerHTML = "<p></p>";

    if(direction == 'right') {
        if(quadradoActual < cuadrado) {
            quadradoActual++;
            // posicionAnterior.innerHTML = "<p class='passedByRight'>";
        }
    } else if(direction == 'up') {
        if(filaActual < fila) {
            filaActual--;
            posicionAnterior.parentNode.style.padding = '2px';
            // posicionAnterior.innerHTML = "<p></p>";

        }
    }

    arrayInfo[arrayInfo.length-1] = quadradoActual;
    arrayInfo[4] = filaActual;

    let posicionActual = arrayInfo.join("");
    console.log(posicionActual);
    let divActual = document.querySelector('.' + posicionActual);
    divActual.innerHTML = "<p id='bola'></p>";
    console.log(divActual);
}

window.addEventListener('keydown', (e)=> {
    // console.log(e.key);

    if(e.key == "ArrowRight" || e.key == "d") {
        //Go right
        console.log('RIGHT');

        movePointerAndDraw('right');
    } else if(e.key == "ArrowLeft" || e.key == "a") {
        //Go left
        console.log('LEFT');
        movePointerAndDraw('left');
    } else if(e.key == "ArrowUp" || e.key == "w") {
        // Go up
        console.log('UP');
        movePointerAndDraw('up');
    } else if (e.key == "ArrowDown" || e.key == "s") {
        //Go down
        console.log('DOWN');
        movePointerAndDraw('down');
    }

    
})


window.addEventListener('load', () => {
    jsonLaberinto = lev3Exercice[0];
    // console.log(jsonLaberinto);
    let width = Object.keys(lev3Exercice[0]['fila1']).length;
    let height = Object.keys(lev3Exercice[0]).length;
    
    fila = width;
    cuadrado = height;

    laberinto.style.gridTemplateColumns = "repeat( " + width + ", 1fr)";
    laberinto.style.gridTemplateRows = "repeat(" + height + ', 1fr)';

    colocarLaberinto();
});

// window.addEventListener('mousemove', (e) => {
//      let X = e.offsetX;
//      let Y = e.offsetY;

//      console.log("X => " + X,
//                    "Y => " + Y ); 
// })