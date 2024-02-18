import  {obtenerSudoku} from './sudoku.js';  //Importamos la funcion que nos va a obtener el sudoku que vamos a utilizar(desde un json)
const inputs = document.querySelectorAll('input');  // Recogemos todos los inputs de la tabla para luego poder manipularlos y gardar 

let jsonCorreccion;  //JSON con la correccion del sudoku actual
let jsonOriginal;    //JSON con el sudoku original(como viene por defecto cuando empiezas una partida)
let id;              //ID del usuario
let inputColocado = 0;
let faltas = 0;
let puntuacion = 0;

//Variables de tiempo
let Horas;
let Minutos;
let Segundos;
let control;
let horas=0;
let minutos=0;
let segundos=0;

// Botones de reiniciar juego/continuar al siguente juego
const btnNextGame = document.getElementById('next-game');
const btnRetryGame = document.getElementById('retryGame');

//Faltas + Puntuacion
const faltasInput =  document.querySelector('#faltas a');
const puntuacionInput =  document.querySelector('#puntuacion a');
const tiempoInput =  document.querySelector('#tiempo a');

//Div con el nivel
const nivel = document.getElementById('nivel');

//Funcion para colocar los numeros en el sudoku
function colocarNumeros(json) {  //Json que recorreremos para rellenar el sudoku por pantalla

    for(let i = 1; i <= 9; i++) {  //   Recorremos las tablas
        const tabla = document.getElementById('table' + i);   //Recogemos en que tabla se van a guardar
        colocarNumerosTabla(json, tabla, i);  //Colocamos los numeros por tabla
    }
   
}

// Funcion para colocar los numeros por tabla(de tabla en tabla)
function colocarNumerosTabla(json, tabla, numero) {
    colocarNumerosFila(json, ('tabla'+numero), 'fila1', tabla, 0);  //tabla x,  fila 1
    colocarNumerosFila(json, ('tabla'+numero), 'fila2', tabla, 1);  //tabla x, fila 2
    colocarNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2);  //tabla x, fila 3
}

// Funcion para recorrrer i colocar los numeros por tabla(ya dada) y fila(tmb dada)
function colocarNumerosFila(json, numeroTabla, fila, tabla, filaNumero) {
    let filaJson = json[numeroTabla][fila];                         //Fila del json ya dado desde el inicio
    let filaTabla = tabla.childNodes[1].childNodes[filaNumero*2];   //Fila de la tabla de la pantalla
    let filaCorreccion = jsonCorreccion[numeroTabla][fila];         //Fila de la tabla de correccion(para comparar si es correcto o incorrecto)
    let filaOriginal = jsonOriginal[numeroTabla][fila];             //Fila del json original
   
    let inputsJSON = JSON.parse(localStorage.getItem(id)).gameEstate[0].map1[0].level1.pistas;
    let pistas; //Donde guardareos el array de pistas

    if (inputsJSON != null) { //Si el de inputJson(pistas en crudo) no esta vacio

        pistas = inputsJSON[0]; //Passamos la informacion de las pistas a la variable de pistas

       for( let i = 0; i < pistas.length; i++) {  //Recorrremos pistas para saber si estamos/si hay algo
            if(pistas.pistas[i].inputIndex == inputColocado) {  //Si el indice guaradao es el mismo que en el que estamos

                inputs[pistas.pistas[i].inputIndex].value = pistas.pistas[i].value;      //Le damos el valor que tenga en el json guardado
                inputs[pistas.pistas[i].inputIndex].readOnly = true;          //I decimos que no pueda editarlo
                inputs[pistas.pistas[i].inputIndex].className = 'pista';   //El numero sera correcto i aparecera en verde
                inputs[pistas.pistas[i].inputIndex].type = "none";            //No le damos tipo

            }
       }
    }

    for(let i = 0; i < filaJson.length; i++){  //Recorremos la fila
        let input = filaTabla.childNodes[i*2+1].childNodes[0];  //Cada input se guardara en la variable input para luego darle el valor

        if(filaJson[i] != null && (input.value == null || input.value == undefined || input.value == "")) {  //Si el e la filaJson no esta vacio
            if(filaOriginal[i] != filaCorreccion[i] && filaJson[i] == filaCorreccion[i] && filaOriginal[i] == null) {  //Si esta en correccion igual que en json y desigual que el de fila original
                
                input.value = filaJson[i];      //Le damos el valor que tenga en el json guardado
                input.readOnly = true;          //I decimos que no pueda editarlo
                input.className = 'correcto';   //El numero sera correcto i aparecera en verde
                input.type = "none";            //No le damos tipo
            
            } else if (filaOriginal[i] == filaCorreccion[i] && filaJson[i] == filaCorreccion[i]) {  //Si  esta en el original i en correccion i son iguales al gardado
                
                input.value = filaJson[i];      //Le damos el valor del json guardado
                input.readOnly = true;          //Lo ponemos a que no pueda editarlo
                input.className = "estatico";   //Lo pasamos a estatico, lo que quiere decir que sera en marron flojo
                input.type = "none";            //No le damos tipo para que igual no puedan editar

            } else {  //Si no es nada de lo anterior, entonces sera incorrecto

                input.value = filaJson[i];      //Le damos el valor guardado
                input.readOnly = false;         //Le damos permiso para poder editar
                input.type = "number";          //El tipo es numero
                input.className = 'incorrecto'; //I la clase sera incorrecta, por lo qual aparecera en rojo
                input.min = 0;                  //Un minimo del numero 0
                input.max = 9;                  //I un maximo del numero 9

            }

        } else if(filaJson[i] == null){  //Si esta vacio
            input.type = "number";      //Le damos tipo numero
            input.min = 0;              //Un minimo del numero 0
            input.max = 9;              //I un maximo del numero 9
            input.style.color = "aqua"; //I le color sera azul
        }

        input.style.textAlign = "center";  // I mostramos el numero centrado en el medio del input
        inputColocado++;
    }
}

// Funcion para comprobar si los numeros son correctos o incorrectos
function checkNumeros() {

    for(let i = 1; i <= 9; i++) {
        const tabla = document.getElementById('table' + i);  //Recogemos que tabla vamos a estar leyendo
        checkNumerosTabla(jsonCorreccion, tabla, i);  //I lo pasamos para comparar y comprovar
    }

}

// Funcion para recorrer la tabla 
function checkNumerosTabla(json, tabla, numero) {
    checkNumerosFila(json, ('tabla'+numero), 'fila1', tabla, 0);   //tabla x,  fila 1
    checkNumerosFila(json, ('tabla'+numero), 'fila2', tabla, 1);   //tabla x,  fila 2
    checkNumerosFila(json, ('tabla' + numero), 'fila3', tabla, 2); //tabla x,  fila 3
}

//Funcion para comprovar los numeros por fila
function checkNumerosFila(json, numeroTabla, fila, tabla, filaNumero) {
    let filaJsonCorreccion = json[numeroTabla][fila];  // Recogemos el json de la fila en filaJsonCorreccion
    let filaTabla = tabla.childNodes[1].childNodes[filaNumero*2];  //Recogemos la fila de la tabla y sus valores
   
    for(let i = 0; i < filaJsonCorreccion.length; i++){
        let input = filaTabla.childNodes[i*2+1].childNodes[0]; //Recogemos el input que vamos a comprovar en una variable
        
        if(filaJsonCorreccion[i] == input.value && !input.hasAttribute('readOnly')) {
            if(input.className != 'correcto') {
                input.className = 'correcto';   //La clase sera correcto(eso hara que se muestre en verde)
                input.readOnly = true;          //No lo vamos a dejar editar
                input.type = "none";            //I le quitamos el tipo de input
                puntuacion = puntuacion + 100;
                puntuacionInput.innerHTML = puntuacion;
            }
                      

        } else if(input.value == null || input.value == "") {  //Si el input esta vacio

            input.className = 'intento';  //La clase sera intento(eso hara que se muestre en azul)

        } else if(input.value != null && input.value != filaJsonCorreccion[i] && !input.hasAttribute('readOnly')){

            if(input.className != 'incorrecto') {
                input.className = 'incorrecto';  //Cambiamos la clase a incorrecto(eso hara que se muestre en rojo)
                faltas++;
                faltasInput.innerHTML = faltas;
                puntuacion = puntuacion - 50;
                puntuacionInput.innerHTML = puntuacion;

            }
           
        }
    }
}

//Funcion para guardar el juego
function saveGame() {
    let jsonSudokuToSave;
    let jsonSudokuToSaveCorrection = jsonCorreccion;
    let contadorTabla = 0;
    let contadorFila1 = 0;
    let contadorFila2 = 0;
    let contadorFila3 = 0;

    

    inputs.forEach((input, index) => {  //Reorremos todos los inputs
        let tabla = 1;
        let fila = 1;

        while(index >= 3) {  //Si el indice es mayor a 3
            if(fila >= 3) {    //Si la fila es mayor a 3
                tabla++;   //Sumaremos a la tabla
                fila -= 3;  //I la fila la volveremos a ponser a 0
            } else if(index >= 3) {  //I si el indice es mayor a 3
                index -= 3;  //El indice lo pondremos a 0
                fila++;   //I le sumaremos a la fila
            }
        }  //Esto nos sacara en que tabla, fila y indice estara el input, para luego poderlo guardar

        if(tabla == 1) {  //Si la tabla es 1
            
            if(contadorTabla == 0) {  //I no ha pasado de 0(para que solo inicie una vez)
                jsonSudokuToSave = '{"tabla1": {';  //Iniciamos el objeto con el numero de la tabla
                contadorTabla++;                    //I subimos el contador a 1, para que no vuelva a pasar por aqui
                contadorFila1 = 0;                  //I ponemso todos los contadores de las filasa 0
                contadorFila2 = 0;
                contadorFila3 = 0;
            }

        } else if(tabla > 1 && tabla <= 9) {  //Si la tabla enta entre 2-9
           
            if(contadorTabla == 0) {           //I el contador de la tabla es 0
                jsonSudokuToSave = jsonSudokuToSave + '"tabla' + tabla + '": {';  //Iniciamos el json a el numero de tabla que este sea
                contadorTabla++;              //Subimos el contador de la tabla para que no vuelva a pasar
                contadorFila1 = 0;            //E inicilizamos todos los contadores de las filas a 0
                contadorFila2 = 0;
                contadorFila3 = 0;
            }

        } 

        if(contadorFila1 == 0 && fila == 1) {  // Si la fila es 1 i el contador de la fila es 0
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';  //Iniciaremos el objeto a filaX i lo abriremos para poder guardar la informacion
            contadorFila1++;  //I el contador de la fila aumentara

        } else if(contadorFila2 == 0 && fila == 2) {  //Si la fila es 2
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';  //Igual lo inciamos
            contadorFila2++;

        } else if (fila == 3 && contadorFila3 == 0) {
            jsonSudokuToSave = jsonSudokuToSave + '"fila' + fila + '": [';  //I aqui tmb lo inic
            contadorFila3 ++;
        }

        if(fila == 1 || fila == 2) {  //Si la fila es 1/2
            if(index == 0 || index == 1) {  //I el indice es 0/1

                if(input.value != "") {  //I el valor no es null
                    jsonSudokuToSave = jsonSudokuToSave + input.value + ",";  // Se guardara el valor
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + ",";   //Sino se guardara como null
                }

            } else if(index == 2) {  //En cambio si el indice es 2(ultima posicion)

                if(input.value != "") {  //I el valor no esta vacio
                    jsonSudokuToSave = jsonSudokuToSave + input.value + "],";  //Lo guardaremos, y luego cerraremos el array de la fila
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + "],";  //Sino lo guardaremos igual en null y lo cerraremos
                }
            }
        } else if(fila == 3) {  //Si la fila es 3
            if(index == 0 || index == 1) {  //I el indice es 0/1

                if(input.value != "") {  //I el input no esta vacio
                    jsonSudokuToSave = jsonSudokuToSave + input.value + ","; //Guardamos el valor
                } else {
                    jsonSudokuToSave = jsonSudokuToSave + null + ",";  //Sino, lo guardamos como null
                }

            } else if(index == 2) {  //Si el indice es 2

                if(tabla > 0 && tabla < 9) {  //I la tabla esta entre 1-8

                    if(input.value != "") {  //I el valor del input no esta vacio
                        jsonSudokuToSave = jsonSudokuToSave + input.value + "]},"; //Cerramos el array y el objeto
                    } else {
                        jsonSudokuToSave = jsonSudokuToSave + null + "]},";  //Igual, pero guardando en null, en lugar del valor
                    }

                } else { //Si la tabla es 9

                    if(input.value != "") {  //Si el valor del input no esta vacio
                        jsonSudokuToSave = jsonSudokuToSave + input.value + "]}}";  //Guardamos el valor, cerramos el array, el objeto y finalmente el json
                    } else {
                        jsonSudokuToSave = jsonSudokuToSave + null + "]}}";  //Sino, el cambio es que en lugar de guardar el valor, se guarda como null
                    }   
                }   
                contadorTabla = 0;  //I reiniciamos el contador de la tabla
            }
        }         
    }); 

    let pista = '[';
    let numPista = 0;
    inputs.forEach((input, index) => {

        if(input.className == "pista") {
            console.log("pista");
            
            if(numPista == 0) {
                pista += "{" +
                    '"inputIndex":' +  index + ", " + 
                    '"value":' +  input.value +
                "}";
            } else if(numPista > 0) {
                pista += ", {" +
                '"inputIndex":' +  index + ", " + 
                '"value":' +  input.value +
            "}";;
            }
            
            numPista++;
        }
    })

    pista += "]";

    // pista = JSON.stringify(pista);

    // Guardamos todos los arrays en una variable par poderla luego guardar en el estado del juego
    let gameState = '{ "saved":  ' + jsonSudokuToSave + ', "correccion":  ' + JSON.stringify(jsonCorreccion) + ', "original": ' + JSON.stringify(jsonOriginal) + '}';
    // let savedGame = JSON.stringify(gameState);  //Lo pasamos a string para luego mostrar en el json del usuario

    //Gaurdamos toda la informacion del usuario en un objeto para guardar la informacion
    let usuario = JSON.parse(localStorage.getItem(id));
    usuario.gameEstate[0].map1[0].level1 = {
        "estate": 'intento',
        "time": tiempoInput.innerHTML,
        "faults": faltasInput.innerHTML,
        "pistas": JSON.parse(pista), 
        "savedGame": JSON.parse(gameState),
        "puntuacion": puntuacionInput.innerHTML
    }


    // console.log(usuarioNivel1);
    // let user =  {
    //     name: JSON.parse(localStorage.getItem(id))['name'],
    //     username: JSON.parse(localStorage.getItem(id))['username'],
    //     email: JSON.parse(localStorage.getItem(id))['email'],
    //     estate: JSON.parse(localStorage.getItem(id))['estate'],
    //     password: JSON.parse(localStorage.getItem(id))['password'],
    //     userType: JSON.parse(localStorage.getItem(id))['userType'],
    //     gameEstate: [{
    //         "map1": [{
    //             "level1": {
    //                 "estate": 'intento',
    //                 "time": tiempoInput.innerHTML,
    //                 "faults": faltasInput.innerHTML,
    //                 "pistas": JSON.parse(pista), 
    //                 "savedGame": JSON.parse(gameState),
    //                 "puntuacion": puntuacionInput.innerHTML
    //             },
    //             "level2": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             },
    //             "level3": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             }
    //         }],
    //         "map2": [{
    //             "level1": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null,
    //                 "savedGame": []
    //             },
    //             "level2": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             },
    //             "level3": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             }
    //         }],
    //         "map3": [{
    //             "level1": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null,
    //                 "savedGame": []
    //             },
    //             "level2": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             },
    //             "level3": {
    //                 "estate": null,
    //                 "time": null,
    //                 "faults": null
    //             }
    //         }]
    //     }]
    // };
    console.log(id);
    localStorage.setItem(id, JSON.stringify(usuario));  //Guardamos el usuario en el localStorage
    console.log(JSON.parse(localStorage.getItem(id)).gameEstate[0].map1[0].level1);
}

//Funcion para comprovar si el juego esta acabado
function comprovarSiJuegoAcabado() {
    let lengthInputs = inputs.length;
    let correctos = 0;
    console.log(lengthInputs);

    inputs.forEach((componente, index) => {
        if(componente.className == 'estatico' || componente.className == 'correcto' || componente.className == "pista") {
            correctos++;
        } 

    })
   console.log(correctos);

    if(correctos == lengthInputs) {
        document.getElementById('modal').className = "open";
        document.getElementById('sure').style.display = "none";
        console.log('CORRECTOS');
        parar();
    }
}

function inicio() {
    control = setInterval(cronometro, 1000);   
}

function parar() {
    clearInterval(control);
}


function cronometro() {
    segundos++;
		
    if (segundos == 59) {
        segundos = -1;
    }
    if(segundos == 0) {
        minutos++;
		// Minutos = minutos;
    }
    if (minutos == 59) {
		minutos = -1;
	}
	if ( (segundos == 0)&&(minutos == 0) ) {
		horas ++;
		// Horas = horas;
	} 

    Horas = (horas > 10) ? horas : (horas < 10 && horas > 0) ? "0" + horas : "00";
    Minutos = (minutos > 10) ? minutos : (minutos < 10 && minutos > 0) ? "0" + minutos : "00";
    Segundos = (segundos > 10) ? segundos : (segundos < 10 && segundos > 0) ? "0" + segundos : "00";

    document.querySelector('#tiempo a').innerHTML = Horas + ":" + Minutos + ":" + Segundos;
}


document.getElementById('check').addEventListener('click', () => {  //Del boton de comprovar
    checkNumeros();  //Lo mandamos al checkNumeros, para que esta funcion lo compruebe

    comprovarSiJuegoAcabado();
});

addEventListener('input', (e)=> {
    e.target.className = 'intento';  //Si editan cualquier input, este pasara a ser intento(saldra en azul)
});

document.getElementById('save').addEventListener('click', ()=> {  //Del boton de guarda
    saveGame();  //Lo mandamos a guardar el juego para guardarlo
});

document.getElementById('pista').addEventListener('click', ()=> {
    let rand = Math.floor(Math.random() * inputs.length);
    while(inputs[rand].className == "correcto" || inputs[rand].className == "estatico") {
        rand = Math.floor(Math.random() * inputs.length);
    }

    let inputAColocar = inputs[rand];
    console.log(inputAColocar);

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

    console.log('Tabla: ' + tabla);
    console.log("Fila: " + fila);
    console.log('Input: ' + rand);

    //Recoger del json correccion i colocarlo en el input
    inputAColocar.value = jsonCorreccion['tabla'+tabla]['fila'+fila][rand];  //Darle un valor
    inputAColocar.className = "pista";  //Cambiar el nombre a pista
    inputAColocar.type = "none"; //Cambiar tipo a none(se centrara el contenido)
    inputAColocar.readOnly = true;  //Cambiar a readonly(para que no hagan trampas i lo quieran cambiar a intento)
    

    //Penalitzacio de us de pistas
    puntuacion -= 50;
    puntuacionInput.innerHTML = puntuacion;


    console.log(inputAColocar);
})

btnNextGame.addEventListener('click', ()=> {
    saveGame(); //Save the game
    let usuario = JSON.parse(localStorage.getItem(id));
    usuario.gameEstate[0].map1[0].level1.estate = 'done';
    localStorage.setItem(id, JSON.stringify(usuario));  //Save estate of the game
    location.href = './lev1lev2.html'; //Change to the next level
})

btnRetryGame.addEventListener(' ', (e) => {
    document.getElementById('sure').style.display = "block";
});

document.getElementById('noSure').addEventListener('click', () => {
    document.getElementById('sure').style.display = "none";
});

document.getElementById('yesSure').addEventListener('click', () => {
    let usuario = JSON.parse(localStorage.getItem(id));
    let level1 = usuario.gameEstate[0].map1[0].level1;

    level1.faults = null;
    level1.pistas = null;
    level1.savedGame = null;
    level1.time = null;

    localStorage.setItem(id, JSON.stringify(usuario));
    location.reload;
});

window.addEventListener('load', () => {
    let jsonSudoku;//Para guardar el json de sudoku

    //Check if a game is already savevd
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate'] == true) {
            id = localStorage.key(i);
        }
    }

    console.log(id);

    //Array of the saved game
    let savedGame = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1']['savedGame'];
    console.log(savedGame);

    //If the saved is null
    if(savedGame == null || savedGame.length == 0 || savedGame == undefined) {  //Si este array esta vacio

        let random = Math.floor(Math.random() * 4);  //Random entre 0-3
        
        if(random >= 3 || random <= 0) {  //Comprovamos que el random realmente ha sacado entre 0-3
            while(random > 4 || random < 0) {  //Si no es asi(superior a 3)
                random = Math.floor(Math.random() * 4);  //Volveremos a hacer random hasta que salga entre 0-3
            }
        } 

        jsonSudoku = obtenerSudoku(nivel.innerHTML,random)['jsonSudoku'];         //Json de la jugada
        jsonCorreccion = obtenerSudoku(nivel.innerHTML,random)['correccion'];     //Josn de la correccion
        jsonOriginal = jsonSudoku;                                  //El json original sera el json Sudoku(ya que sera el json que luego vamos a usar para comparar)
        faltas = 0;
        tiempoInput.innerHTML = "00:00:00"; //Cronometro a 0
        faltasInput.innerHTML = 0;
        puntuacionInput.innerHTML = 0;

    } else {  //Si el array del savbedGame no esta vacia

        if(JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].faults == null)  {
            faltas = 0;
            faltasInput.innerHTML = faltas;
        } else {
            faltas = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].faults;
            faltasInput.innerHTML = faltas; 
        }

        if(JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].time == null)  {
            tiempoInput.innerHTML = "00:00:00";
        } else {
            tiempoInput.innerHTML = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].time;
            let tiempo = tiempoInput.innerHTML.split(":");
            horas = +tiempo[0];
            minutos = +tiempo[1];
            segundos = +tiempo[2];
        }

        if(JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].puntuacion == null)  {
            puntuacionInput.innerHTML = 0;
            puntuacion = 0;
        } else {
            puntuacion = +JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'][0]['level1'].puntuacion;
            puntuacionInput.innerHTML = +puntuacion;
            console.log(typeof puntuacion);
        }

        jsonSudoku = savedGame['saved'];            //Json de la jugada actual(la guardada)
        jsonCorreccion = savedGame['correccion'];   //Json de la correccion(tiene la solucion)
        jsonOriginal = savedGame['original'];       //Json original(para saber si el numero es del original o no(correcto/incorrecto))

    }
    
    colocarNumeros(jsonSudoku);

    inicio();
});
