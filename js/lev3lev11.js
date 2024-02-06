const input = document.querySelectorAll('input');           //Array con inputs
const quadricula = document.getElementById('quadricula');   //Nombre de la quadricula

let jsonCorreccion;     //JSON con la correccion del sudoku actual
let jsonOriginal;       //JSON con el original del sudoku actual
let jsonSudoku;         //JSON con el sudoku guardado(el actual ya guardado)
let id;                 //El id del usuario

// Funcion para colocar los numeros
function colocarNumeros(json) {

    for(let i = 1; i <= 9; i++) {
        const tabla = document.getElementById('table' + i);
        colocarNumerosTabla(json, tabla, i);
    }
   
}

function colocarNumerosTabla(json, tabla, numero) {
    colocarNumerosFila(json, ('tabla'+numero), 'fila1', tabla, 0);
    colocarNumerosFila(json, ('tabla'+numero), 'fila2', tabla, 1);
    colocarNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2);
}

function colocarNumerosFila(json, numeroTabla, fila, tabla, filaNumero) {
    let filaJson = json[numeroTabla][fila];
    let filaTabla = tabla.childNodes[1].childNodes[filaNumero*2];
    let filaCorreccion = jsonCorreccion[quadricula.innerText][numeroTabla][fila];
    
    let filaOriginal = jsonOriginal[quadricula.innerText][numeroTabla][fila];

   
    for(let i = 0; i < filaJson.length; i++){
        let input = filaTabla.childNodes[i*2+1].childNodes[0];

        if(filaJson[i] != null) {

            if(filaOriginal[i] != filaCorreccion[i] && filaJson[i] == filaCorreccion[i] && filaOriginal[i] == null) {
                input.value = filaJson[i];
                input.readOnly = true; 
                input.className = 'correcto';
                input.type = "none";
            } else if (filaOriginal[i] == filaCorreccion[i] && filaJson[i] == filaCorreccion[i]) {
                input.value = filaJson[i];
                input.readOnly = true; 
                input.className = "estatico";
                input.type = "none";
            } else {
                input.value = filaJson[i];
                input.readOnly = false; 
                input.type = "number";
                input.className = 'incorrecto';
            }

                      
          
        } else {
            input.type = "number";
            input.min = 0;
            input.max = 9;
            input.style.color = "aqua";
        }
        input.style.textAlign = "center";
    }
}

function checkNumeros() {
    for(let i = 1; i <= 9; i++) {
        const tabla = document.getElementById('table' + i);
        checkNumerosTabla(jsonCorreccion[quadricula.innerText], tabla, i);
    }
}

function checkNumerosTabla(json, tabla, numero) {
    checkNumerosFila(json, ('tabla'+numero), 'fila1', tabla, 0);
    checkNumerosFila(json, ('tabla'+numero), 'fila2', tabla, 1);
    checkNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2);
}

function checkNumerosFila(json, numeroTabla, fila, tabla, filaNumero) {
    let filaJsonCorreccion = json[numeroTabla][fila];
    let filaTabla = tabla.childNodes[1].childNodes[filaNumero*2];
   
    for(let i = 0; i < filaJsonCorreccion.length; i++){
        let input = filaTabla.childNodes[i*2+1].childNodes[0];
        
        if(filaJsonCorreccion[i] == input.value && !input.hasAttribute('readOnly')) {
            input.className = 'correcto';
            input.readOnly = true;
            input.type = "none"; 
        } else if(input.value == null || input.value == "") {
            input.className = 'intento';
        } else if(input.value != null && input.value != filaJsonCorreccion[i] && !input.hasAttribute('readOnly')){
            input.className = 'incorrecto';
        }
    }
}

function saveGame() {
    let jsonSudokuToSave;
    let jsonSudokuToSaveCorrection = jsonCorreccion;
    let contadorTabla = 0;
    let contadorFila1 = 0;
    let contadorFila2 = 0;
    let contadorFila3 = 0;

    input.forEach((input, index) => {
        let tabla = 1;
        let fila = 1;
        while(index >= 3) {
            if(fila >= 3) {
                tabla++;
                fila -= 3;
            } else if(index >= 3) {
                index -= 3;
                fila++;
            }
        }

        if(tabla == 1) {
            if(contadorTabla == 0) {
                jsonSudokuToSave = '{"tabla1": {';
                contadorTabla++;        
                contadorFila1 = 0;
                contadorFila2 = 0;
                contadorFila3 = 0;
            }
        } else if(tabla > 1 && tabla <= 9) {
            if(contadorTabla == 0) {
                jsonSudokuToSave = jsonSudokuToSave + '"tabla' + tabla + '": {';
                contadorTabla++;        
                contadorFila1 = 0;
                contadorFila2 = 0;
                contadorFila3 = 0;
            }
        } 


        if(contadorFila1 == 0 && fila == 1) {
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';
            contadorFila1++;
        } else if(contadorFila2 == 0 && fila == 2) {
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';
            contadorFila2++;
        } else if (fila == 3 && contadorFila3 == 0) {
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';
            contadorFila3 ++;
        }

        if(fila == 1 || fila == 2) {
            if(index == 0 || index == 1) {
                if(input.value != "") {
                    jsonSudokuToSave = jsonSudokuToSave + input.value + ",";
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + ",";
                }

            } else if(index == 2) {
                if(input.value != "") {
                    jsonSudokuToSave = jsonSudokuToSave + input.value + "],";
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + "],";
                }
            }
        } else if(fila == 3) {
            if(index == 0 || index == 1) {
                if(input.value != "") {
                    jsonSudokuToSave = jsonSudokuToSave + input.value + ",";
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + ",";
                }
            } else if(index == 2) {
                if(tabla > 0 && tabla < 9) {
                    if(input.value != "") {
                        jsonSudokuToSave = jsonSudokuToSave + input.value + "]},";
                    } else {
                        jsonSudokuToSave = jsonSudokuToSave + null + "]},";
                    }   
                } else {

                    if(input.value != "") {
                        jsonSudokuToSave = jsonSudokuToSave + input.value + "]}}";
                    } else {
                        jsonSudokuToSave = jsonSudokuToSave + null + "]}}";
                    }   
                }
                
                // if(tabla == 9) {
                //     jsonSudokuToSave = jsonSudokuToSave + "}";
                // }
                contadorTabla = 0;
            }
        
        } 
    }); 

    
    let jsonToSave = saveJson(jsonSudokuToSave);

    let gameState = '{ "saved":  ' + JSON.stringify(jsonToSave) + ', "correccion":  ' + JSON.stringify(jsonSudokuToSaveCorrection) + ', "original": ' + JSON.stringify(jsonOriginal) + '}';

    saveUser(gameState, id);

}

function saveJson(jsonSudokuToSave) {
    let quad = quadricula.innerText;

    let savedGame = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level1']['savedGame'];
    let jsonToSave;
    if(quad == 'quadricula1') { 
        jsonToSave = {
            'quadricula1': JSON.parse(jsonSudokuToSave),
            'quadricula2': savedGame['saved']['quadricula2'],
            'quadricula3': savedGame['saved']['quadricula3'],
            'quadricula4': savedGame['saved']['quadricula4'],
            'quadricula5': savedGame['saved']['quadricula5']
        };
    } else if(quad == 'quadricula2') {
        jsonToSave = {
            'quadricula1': savedGame['saved']['quadricula1'],
            'quadricula2': JSON.parse(jsonSudokuToSave),
            'quadricula3': savedGame['saved']['quadricula3'],
            'quadricula4': savedGame['saved']['quadricula4'],
            'quadricula5': savedGame['saved']['quadricula5']
        };
    } else if(quad == 'quadricula3') {
        jsonToSave = {
            'quadricula1': savedGame['saved']['quadricula1'],
            'quadricula2': savedGame['saved']['quadricula2'],
            'quadricula3': JSON.parse(jsonSudokuToSave),
            'quadricula4': savedGame['saved']['quadricula4'],
            'quadricula5': savedGame['saved']['quadricula5']
        };
    } else if(quad == 'quadricula4') {
        jsonToSave = {
            'quadricula1': savedGame['saved']['quadricula1'],
            'quadricula2': savedGame['saved']['quadricula2'],
            'quadricula3': savedGame['saved']['quadricula3'],
            'quadricula4': JSON.parse(jsonSudokuToSave),
            'quadricula5': savedGame['saved']['quadricula5']
        };
    } else if(quad == 'quadricula5') {
        jsonToSave = {
            'quadricula1': savedGame['saved']['quadricula1'],
            'quadricula2': savedGame['saved']['quadricula2'],
            'quadricula3': savedGame['saved']['quadricula3'],
            'quadricula4': savedGame['saved']['quadricula4'],
            'quadricula5': JSON.parse(jsonSudokuToSave)
        };
    }

    return jsonToSave;
}

function saveUser(gameState, id) {
   
    let gameStateMap1 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'];
    let gameStateMap2 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map2'];
    let gameStateMap3Lev2 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level2'];
    let gameStateMap3Lev3 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level3'];

    let user =  {
        name: JSON.parse(localStorage.getItem(id))['name'],
        username: JSON.parse(localStorage.getItem(id))['username'],
        email: JSON.parse(localStorage.getItem(id))['email'],
        estate: JSON.parse(localStorage.getItem(id))['estate'],
        password: JSON.parse(localStorage.getItem(id))['password'],
        userType: JSON.parse(localStorage.getItem(id))['userType'],
        gameEstate: [{
            "map1": gameStateMap1,
            "map2": gameStateMap2,
            "map3": [{
                "level1": {
                    "estate": 'intento',
                    "time": null,
                    "faults": null,
                    "savedGame": JSON.parse(gameState)
                },
                "level2": gameStateMap3Lev2,
                "level3": gameStateMap3Lev3
            }]
        }]
    };

    localStorage.setItem(id, JSON.stringify(user));

    let gameStateMap3Lev1 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level1'];
}

addEventListener('input', (e)=> {
    e.target.className = 'intento';
});

document.getElementById('check').addEventListener('click', () => {
    checkNumeros();

});


document.getElementById('save').addEventListener('click', () => {
    saveGame();

});

window.addEventListener('load', ()=> {
    //Check if a game is already savevd
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate'] == true) {
            id=localStorage.key(i);
        }
    }

    //Array of the saved game
    let savedGame = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level1']['savedGame'];
   
    //Save the sudokus in variables to make it easy to use
    savedGame = JSON.stringify(savedGame);
    jsonSudoku = JSON.parse(savedGame)['saved'];
    jsonCorreccion = JSON.parse(savedGame)['correccion'];
    jsonOriginal = JSON.parse(savedGame)['original'];   
    
    let numQuadricula = quadricula.innerText;
    colocarNumeros(jsonSudoku[numQuadricula]);
});
