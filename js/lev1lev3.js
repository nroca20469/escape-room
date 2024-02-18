import lev3exercici from './../json/lev1lev3exercici.json' assert { type: 'json' }; 
import lev3correccio from './../json/lev1lev3correccio.json' assert { type: 'json' };

const tabla = document.getElementById('tabla');
const respuestas = document.getElementById('respuestas');

const btnCheck = document.getElementById('check');
const btnSave = document.getElementById('save');

let jsonExercici =  lev3exercici[0];
let jsonSolucio = lev3correccio[0];

function colocarTabla() {
    colocarFila('fila1');
    colocarFila('fila2');
    colocarFila('fila3');
    colocarFila('fila4');

}

function colocarFila(fila) {
    let filaTabla = tabla.children[0].children[fila];
    // console.log(jsonExercici[fila]);
    for(let i = 0; i < jsonExercici[fila].length; i++) {
        // console.log(i);
        // filaTabla.innerHTML += '<td><img src='
        // console.log(jsonExercici[fila][i]); 
        if(jsonExercici[fila][i] == "+" || jsonExercici[fila][i] == "*" || jsonExercici[fila][i] == "=" || typeof jsonExercici[fila][i] == "number" || jsonExercici[fila][i] == "?") {
            filaTabla.innerHTML += '<td><p>' + jsonExercici[fila][i] + '</p></td>';
        } else {
            filaTabla.innerHTML += '<td><img src="' + jsonExercici[fila][i] + '" ></td>';
        }
    }
}

function colocarRespuestas() {
    // console.log(jsonSolucio);
    let keys = Object.keys(jsonSolucio);
    console.log(keys);
    for(let i = 0; i < keys.length; i++) {
        console.log(keys[i]);
        if(keys[i] != 'solucion') {
            respuestas.innerHTML += '<p><img src="' + keys[i] +'" alt="hello"/> <input type="number" style="margin-start: 10px; width: 45px;" id="' + keys[i] + '"></p>';
        } else {
            respuestas.innerHTML += '<p><strong> Solucion: </strong> <input type="number" style="width: 45px;" id="sol"></p>';
        }
    }
    console.log(respuestas);
    console.log(jsonSolucio);

}

window.addEventListener('load', () => {
    // console.log();
    colocarTabla();
    colocarRespuestas();

})