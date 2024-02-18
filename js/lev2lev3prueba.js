//Import json
import lev3Exercice from './../json/lev2lev3.json' assert { type: 'json' }; 


const laberinto = document.getElementById('laberinto');

/**
 * FALTA
 *  - COMPROVAR PAREDES
 *  - SI CHOCA CON UNA PARET QUE NO BAJE NADA N I SUBA NADA(los contadores), i que pueda seguir
 *  - FALTAS/(chocarse con las pareder)
 *  - PISTAS(darle un paso mas)
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

    let rand = 1; // Cambiar despues cuando todo este correcto
    if(rand == 1) {
        // document.querySelector('.fila3cuadrado1#fromLaberinto').style.backgroundColor = "green";
        // document.querySelector('.fila3cuadrado1#fromLaberinto').style.border="1px solid red";
        document.querySelector('.fila3cuadrado1').className += " try actual";
        // document.querySelector('.fila3cuadrado1').id += " actual";
        // console.log(document.querySelector('.fila3cuadrado1#fromLaberinto').classList[1]);
    }
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

    laberinto.innerHTML += "<div class='" + fila + quadrado + "' id='fromLaberinto'></div>";
    let quadradoActual = document.querySelector('div.'+ fila + quadrado);
    let width=40;
    let height=40;

    quadrados.forEach(element => {
        quadradoActual.style[element] = "4px solid black";
        
        if(element == 'border-left' || element == 'border-right' || element == 'border-inline') {
            if(element == 'border-inline') {
                width -= 4;
            } else {
                width -= 4;
            }
        } else if(element == 'border-top' || element == 'border-bottom' || element == 'border-block'){
            if(element == 'border-block') {
                height -= 8;
            } else {
                height -= 4;
            }
            
        }
    });
    
    console.log(quadradoActual.className);
    console.log("Height: " + height);
    console.log("Width: " + width);
    // console.log(quadradoActual.style[0]);

    quadradoActual.style.width = width + "px !important";
    quadradoActual.style.height = height + "px !important";

    // if(fila == "fila3" && quadrado == "cuadrado1"){
        // quadradoActual.style.backgroundColor="red";
        // quadradoActual.innerHTML += "<p id='bola'></p>";
        // quadradoActual.style.position = "relative";
        // let bola = document.getElementById('bola');
      

    // }
}

function movePointerAndDraw(direction) {
    let pointer = document.querySelector('.actual').className;
   

    // console.log(posicionAnterior.getBoundingClientRect());

    console.log(pointer, direction);
    let arrayInfo = pointer.split(' ')
    let anterior =  arrayInfo[0];
    arrayInfo = arrayInfo[0].split('');
    
    document.querySelector('.' + anterior).className = anterior + " try";

    console.log(arrayInfo);
    let filaActual = arrayInfo[4];
    let quadradoActual = arrayInfo[13];
    console.log("fila: " + filaActual);
    console.log("quadrado: " + quadradoActual);
    // posicionAnterior.innerHTML = "<p></p>";

    if(direction == 'right') {
        if(quadradoActual < cuadrado) {
            quadradoActual++;
            // posicionAnterior.innerHTML = "<p class='passedByRight'>";
        }
    } else if(direction == 'up') {
        if(filaActual < fila) {
            filaActual--;
            // posicionAnterior.parentNode.style.padding = '2px';
            // posicionAnterior.innerHTML = "<p></p>";

        }
    } else if(direction == 'down') {
        if(filaActual < fila) {
            filaActual++;
        }

    } else if(direction == "left") {
        if(quadradoActual < cuadrado) {
            quadradoActual--;
        }
    }


    arrayInfo[13] = quadradoActual;
    arrayInfo[4] = filaActual;

    let posicionActual = arrayInfo.join("");
    console.log(posicionActual);
    let divActual = document.querySelector('.' + posicionActual);
    console.log(divActual);
    divActual.className += " try actual";
    console.log(divActual.id);

    // divActual.innerHTML = "<p id='bola'></p>";
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
    jsonLaberinto = lev3Exercice[1];
    // console.log(jsonLaberinto);
    let width = Object.keys(lev3Exercice[1]['fila1']).length;
    let height = Object.keys(lev3Exercice[1]).length;
    
    fila = width;
    cuadrado = height;
    laberinto.style.width = (width * 31) + "px";
    laberinto.style.height = (height * 31) + "px";
    laberinto.style.gridTemplateColumns = "repeat( " + width + ", 31px)";
    laberinto.style.gridTemplateRows = "repeat(" + height + ', 31px)';
 
    

    colocarLaberinto();
});

// window.addEventListener('mousemove', (e) => {
//      let X = e.offsetX;
//      let Y = e.offsetY;

//      console.log("X => " + X,
//                    "Y => " + Y ); 
// })