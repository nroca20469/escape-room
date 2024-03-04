const input = document.querySelectorAll('input');           //Array con inputs
const quadricula = document.getElementById('quadricula');   //Nombre de la quadricula

//Faltas + Puntuacion
const faltasInput =  document.querySelector('#faltas a');
const puntuacionInput =  document.querySelector('#puntuacion a');
const tiempoInput =  document.querySelector('#tiempo a');

// Variables globales
let jsonCorreccion;     // JSON con la correccion del sudoku actual
let jsonOriginal;       // JSON con el original del sudoku actual
let jsonSudoku;         // JSON con el sudoku guardado(el actual ya guardado)

let id;                 // El id del usuario
let index;              // Indice del sudoku

let faltas = 0;         // Numero de flatas a 0(puede ser actualizado al cargarse la pagina con el estado)
let time = '00:00:00';  // Inicializamos tiempo a 00:00:00
let puntuacion = 0;     // Puntuacion a 0     

let correctos;          // Numero de correctos   
let estaticos;          // Numero de estaticos

//Esconder boton de next
// document.getElementById('next').style.display = "none";

// FUNCIONES
// ------------

// Funcion para colocar los numeros
function colocarNumeros(json) {
    console.log(json);
    for(let i = 1; i <= 9; i++) {
        const tabla = document.getElementById('table' + i);
        colocarNumerosTabla(json, tabla, i);
    }
   
}

// Funcion para colocar los numeros por tabla(de tabla en tabla)
function colocarNumerosTabla(json, tabla, numero) {
    colocarNumerosFila(json, ('tabla' + numero), 'fila1', tabla, 0);
    colocarNumerosFila(json, ('tabla' + numero), 'fila2', tabla, 1);
    colocarNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2);
}

// Funcion para recorrrer i colocar los numeros por tabla(ya dada) y fila(tmb dada)
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

// Funcion para comprobar si los numeros son correctos o incorrectos
function checkNumeros() {
    correctos = 0;
    estaticos = 0;
    for(let i = 1; i <= 9; i++) {
        const tabla = document.getElementById('table' + i);
        checkNumerosTabla(jsonCorreccion[quadricula.innerText], tabla, i);
    }

    //Actualizar faltas + puntuacion
    faltasInput.innerHTML = faltas;
    puntuacion = (100 * correctos) - (30 * faltas); 
    puntuacionInput.innerHTML = puntuacion;


    if(document.querySelectorAll('input').length == (correctos + estaticos)) {
        document.getElementById('next').style.display = "inline-block";

        //Save user
        saveUser('done');
    }
}

// Funcion para recorrer la tabla 
function checkNumerosTabla(json, tabla, numero) {
    checkNumerosFila(json, ('tabla'+numero), 'fila1', tabla, 0);
    checkNumerosFila(json, ('tabla'+numero), 'fila2', tabla, 1);
    checkNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2);
}

//Funcion para comprovar los numeros por fila
function checkNumerosFila(json, numeroTabla, fila, tabla, filaNumero) {
    let filaJsonCorreccion = json[numeroTabla][fila];
    let filaTabla = tabla.childNodes[1].childNodes[filaNumero*2];
   
    for(let i = 0; i < filaJsonCorreccion.length; i++){
        let input = filaTabla.childNodes[i*2+1].childNodes[0];
        
        if(filaJsonCorreccion[i] == input.value && !input.hasAttribute('readOnly')) {
            input.className = 'correcto';
            input.readOnly = true;
            input.type = "none";
            correctos++; 
        } else if(input.value == null || input.value == "") {
            input.className = 'intento';
        } else if(input.value != null && input.value != filaJsonCorreccion[i] && !input.hasAttribute('readOnly')){
            input.className = 'incorrecto';
            faltas++;
        } else {
            estaticos++;
        }
    }
}

//Funcion para comprovar si el juego esta acabado
function comprovarSiJuegoAcabado() {
    let lengthInputs = input.length;
    let correctos = 0;

    input.forEach((componente, index) => {
        if(componente.className == 'estatico' || componente.className == 'correcto' || componente.className == "pista") {
            correctos++;
        } 

    })

    if(correctos == lengthInputs) {
        
        document.getElementById('modal').className = "open";
        document.getElementById('sure').style.display = "none";
        parar();
        saveGame('done');
    }
}

//Funcion para guardar el juego
function saveGame(estado) {
    
    let jsonSudokuToSave;
    let jsonSudokuToSaveCorrection = jsonCorreccion;
    let contadorTabla = 0;
    let contadorFila1 = 0;
    let contadorFila2 = 0;
    let contadorFila3 = 0;

    // Recorremos todos los inputs y lo guardamos en el jsonSudokuToSave(estado actual de la partida con los cambios)
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

                contadorTabla = 0;
            }
        
        } 
    }); 

    let gameEstate;
    let jsonToSave = saveJson(jsonSudokuToSave);  // Recogemos el json con el resto de cuadriculas que vamos a guardar

    if(id) {    // Si el usuario esta inciado

        // Recogemos tanto el usuario como sus estados
        let user = JSON.parse(localStorage.getItem(id));
        let estados = user.gameEstate[0].map3[0].level1.savedGame.estados;

        // Se podria hacer en funcion, pero habria que cambiar cosas tanto de este fichero como el del anterior
        gameEstate = {
            saved: jsonToSave,
            correccion: jsonSudokuToSaveCorrection,
            original: jsonOriginal,
            index: index,
            estados: {
                quad1: estados.quad1,  // Guardamos los estados actuales
                quad2: estados.quad2,
                quad3: estados.quad3,
                quad4: estados.quad4,
                quad5: estados.quad5
            }
        }
    } else {    // Si el usuario no esta iniciado, estara guardado como sudokuSamurai

        // Recogemos la partida del LS
        let savedGame = JSON.parse(localStorage.getItem('sudokuSamurai'));
    
        //Guardamos todo en la raiz
        gameEstate = {
            saved: jsonToSave,
            correccion: jsonSudokuToSaveCorrection,
            original: jsonOriginal,
            index: index,
            estados: {
                quad1: savedGame.estados.quad1,
                quad2: savedGame.estados.quad1,
                quad3: savedGame.estados.quad1,
                quad4: savedGame.estados.quad1,
                quad5: savedGame.estados.quad1
            },
            puntuacion: puntuacionInput.innerHTML,
            time: tiempoInput.innerHTML,
            faltas: faltasInput.innerHTML
        }
    }

    //Guardamos el usuario(tanto el que esta iniciado como el que no)
    saveUser(gameEstate, estado);
}

function cambiarEstadosQuadricula(level1) {

    // Cambiamos estado por quadricula
    if(quadricula.innerHTML == 'quadricula1') {
        level1.estados.quad1 = estado;
    } else if(quadricula.innerHTML == 'quadricula2') {
        level1.estados.quad2 = estado;
    } else if(quadricula.innerHTML == 'quadricula3') {
        level1.estados.quad3 = estado;
    } else if(quadricula.innerHTML == 'quadricula4') {
        level1.estados.quad4 = estado;
    } else if(quadricula.innerHTML == 'quadricula5') {
        level1.estados.quad5 = estado;
    }

    return level1.estados;
}

// Funcion que devuelve el json a guardar
function saveJson(jsonSudokuToSave) {

    let quad = quadricula.innerText;
    let jsonToSave;
    let savedGame;

    if(id != null) {
        savedGame = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level1']['savedGame'];
    } else {
        savedGame = JSON.parse(localStorage.getItem('sudokuSamurai'));
    }
    
    //  Guardamos la partida dependiendo de la parida
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

function saveUser(gameState, estado) {
    
    if(id) {    // Si el usuario esta inicado
    
        let usuario = JSON.parse(localStorage.getItem(id)); // Recogemos el usuario
        let level1 = usuario.gameEstate[0].map3[0].level1;

        // Cambiamos los valores base del estado
        level1.time = tiempoInput.innerHTML;
        level1.faults = usuario.gameEstate[0].map3[0].level1.faults == null ? faltasInput.innerText : +usuario.gameEstate[0].map3[0].level1.faltas + +faltasInput.innerHTML;     
        
        // Actualizamos eel savedGame con el gameEstate pasado por parametro
        level1.savedGame = gameState;
        
        // Cambiamos el estado por cuadricula
        level1.savedGame.estados = cambiarEstadosQuadricula(level1.savedGame);

        usuario.gameEstate[0].map3[0].level1 = level1;  // Cambiamos los valores de este mismo

        localStorage.setItem(id, JSON.stringify(usuario));  // I actualizamos el usuario

    } else {    // Si no esta iniciado estara guardado directamente en el LS
        
        // Recogemos la partida del LS
        let savedGame = JSON.parse(localStorage.getItem('sudokuSamurai'));

        // Cambiamos el valor por el que hemos pasado por parametro
        savedGame = gameState;

        // Actualizamos estado dependiendo de la quadricula
        savedGame.estados = cambiarEstadosQuadricula(savedGame);

        // Actualizamos en el LS
        localStorage.setItem('sudokuSamurai', JSON.stringify(savedGame));
    }
}

// EVENTOS
// --------

// Evento al cambiar un input
addEventListener('input', (e)=> {
    e.target.className = 'intento';  // Cambiamos la clase a intento
});

// Evento al clicar el boton de check(comprovar)
document.getElementById('check').addEventListener('click', () => {
    
    checkNumeros(); // Comprovamos los numeros en classe intento
    comprovarSiJuegoAcabado();  // Comprovamos si el juego esta acabado

});

// Evento al clicar el boton de save(guardar)
document.getElementById('save').addEventListener('click', () => {

    saveGame('intento');  // Guardamos el juego en intento
    comprovarSiJuegoAcabado();  // Comprovamos si el juego ha acabado(si ha acabado, se guardara como done)

});

// Evento al clicar el boton de pista
document.getElementById('pista').addEventListener('click', ()=> {
    let rand = Math.floor(Math.random() * input.length);

    // Miramos que la posicion random no este en correcto o estatico(sino en intento o incorrecto)
    while(input[rand].className == "correcto" || input[rand].className == "estatico") {
        rand = Math.floor(Math.random() * input.length);
    }

    let inputAColocar = input[rand];

    //Buscar de que tabla, fila i input es
    let fila=1;
    let tabla=1;
    while(rand >= 3) {  //Si el indice es mayor a 3
        if(fila >= 3) {    //Si la fila es mayor a 3
            tabla++;   //Sumaremos a la tabla
            fila -= 3;  //I la fila la volveremos a ponser a 0
        } else if(rand >= 3) {  //I si el indice es mayor a 3
            rand -= 3;  //El indice lo pondremos a 0
            fila++;   //I le sumaremos a la fila
        }
    }  //Esto nos sacara en que tabla, fila y indice estara el input, para luego poderlo guardar

    //Recoger del json correccion i colocarlo en el input
    inputAColocar.value = jsonCorreccion[quadricula.innerHTML]['tabla'+tabla]['fila'+fila][rand];  //Darle un valor
    inputAColocar.className = "pista";  //Cambiar el nombre a pista
    inputAColocar.type = "none"; //Cambiar tipo a none(se centrara el contenido)
    inputAColocar.readOnly = true;  //Cambiar a readonly(para que no hagan trampas i lo quieran cambiar a intento)
    

    //Penalitzacio de us de pistas
    puntuacion -= 50;
    puntuacionInput.innerHTML = puntuacion;  // Cambiamos la puntuacion por pantalla
})

// Envento al cargarse la pagina
window.addEventListener('load', ()=> {

    // Mirar si el usuario esta iniciado
    for(let i = 0; i < localStorage.length; i++) {

        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate'] == true) {  // Si el estado esta en true
            id=localStorage.key(i);  // Guardamos el id
        }

    }
    
    // Array of the saved game
    let savedGame;
    
    if(id){     // Si el usuari esta iniciado

        // Recogemos el usuario y el nivel correcpondiente
        let user = JSON.parse(localStorage.getItem(id));
        let lev1 = user.gameEstate[0].map3[0].level1;

        // Damos el valor a las variables globales
        savedGame = lev1.savedGame;
        index = savedGame.index;
        faltas =  lev1.faults == null ? 0 : lev1.faults;  // Si los valores estan a null, el valor sera 0
        time =  lev1.time == null ? '00:00:00' : lev1.time; 
        puntuacion = lev1.puntuacion == null ? 0 : lev1.puntutacion;

    } else {    // Si el usuario no esta iniciado

        // Recogeremos el sudoku del LS(esta suelto alli)
        savedGame = JSON.parse(localStorage.getItem('sudokuSamurai'));

        // Recogemos los valores y los guardamos en las variabls globaless
        index = savedGame.index;
        faltas = savedGame.faltas == null ? 0 : savedGame.faltas;
        time = savedGame.time == null ? '00:00:00' : savedGame.time; 
        puntuacion = savedGame.puntuacion == null ? 0 : savedGame.puntuacion;

    } 
     
    // Save the sudokus in variables to make it easy to use
    jsonSudoku = savedGame.saved;
    jsonCorreccion = savedGame.correccion;
    jsonOriginal = savedGame.original;   
    
    // Recogemos el numero de cuadricula
    let numQuadricula = quadricula.innerText;

    // Colocamos los numeros por la pantalla
    colocarNumeros(jsonSudoku[numQuadricula]);
});
