import { obtenerSudoku } from '../js/sudoku.js';  //Importamos las funcion de buscar sudoku

const imgSudoku = document.getElementById('imgSudoku');  //Guardamos la imagen en una constante

let idUsuario;  // variable para guardar el id del usuario


// FUNCTIONS:
// ----------

// Funcion para guardar el sudoku
function saveSudoku(gameStateLevel3Level1) {
    
    //Guardamos en las variables los game este segun su nivel/mapa
    let gameStateMap3Lev1 = JSON.parse(localStorage.getItem(idUsuario))['gameEstate'][0]['map3'][0]['level1'];

    // Recogemos el usuario del LS
    let usuario = JSON.parse(localStorage.getItem(idUsuario));

    // console.log(savedGame);

    let estadoLevel1 = {  // Actualizar estado
        faults: gameStateMap3Lev1.faults,
        savedGame: gameStateLevel3Level1,
        puntuacion: gameStateMap3Lev1.puntuacion
    };

    console.log(estadoLevel1);

    //Acctualizar estado 
    usuario.gameEstate[0].map3[0].level1 = estadoLevel1;

    console.log(usuario);

    // Subir estado a LS
    localStorage.setItem(idUsuario, JSON.stringify(usuario));
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

// Funcion para crear el estado del juego recien empezado
function crearGameEstate() {

    let random = Math.floor(Math.random() * 3);  // Random con el numero de sudokus dificiles hay
    imgSudoku.setAttribute('src', `./../../img/lev3lev1/${random+1}.png`);  // Actualizamos la imagen por pantalla con el src "bueno"

    //Guadamos en variables la informacion que saquemos el obtener Sudoku
    jsonSudoku = obtenerSudoku(3, random)(null)['jsonSudoku'];
    let jsonCorreccion = obtenerSudoku(3, random)(null)['correccion'];
    let jsonOriginal = obtenerSudoku(3, random)(null)['jsonSudoku'];

    //Save the game/sudoku
    let gameState = {
        saved: jsonSudoku,
        correccion: jsonCorreccion,
        original: jsonOriginal,
        index: random+1,
        estados: {
            quad1: null,
            quad2: null,
            quad3: null,
            quad4: null, 
            quad5: null
        }, 
        estate: 'intento'
    }

    return gameState;
}

// EVENT:
// ----------

// Evento al cargarse la pagina
window.addEventListener('load', () => {  //Cuando la ventana se inicie
    let jsonSudoku;     //Para guardar el json de sudoku   

    getUserIDUsuario(); // Obtener el id del usuario

    if(idUsuario) {     // Si el usuario esta iniciado    
        
        //Saved game
        let savedGame = JSON.parse(localStorage.getItem(idUsuario))['gameEstate'][0]['map3'][0]['level1']['savedGame'];  //Recogemos el savedGame

        console.log(savedGame);

        if(savedGame.length == 0) {  // Si el estado del juego esta vacio

            // Creacion de un nuevo estado de juego
            let gameState = crearGameEstate();

            saveSudoku(gameState);  //Guardamos automaticamoente el sudoku, para luego, cuando cambiemos de pagina, no perdamos la informacion

        } else {  // Si el json ya esta guardado

            // Mostramos por pantalla la imagen guaradada
            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${savedGame['index']}.png`);
        }

    } else {            // Si el usuario no esta iniciado

        // Si en el LS no esta guardado un sudokuSamurai
        if(!localStorage.getItem('sudokuSamurai')) {

            // Creacion del estado
            let gameEstat = crearGameEstate();

            // Subimos al LS la informacion
            localStorage.setItem('sudokuSamurai', JSON.stringify(gameEstat));

        } else{ // Si en el LS hay un Sudoku Samurai

            // Recogemos el estado
            let gameState = JSON.parse(localStorage.getItem('sudokuSamurai'));

            // Mostramos por pantalla la imagen del sudoku guardada
            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${gameState['index']}.png`);
        }
    }

    let comingFrom = document.referrer.split('/');
    let acabado = false;

    document.getElementById('next').style.display = 'none';  // Escondemos el boton de porximo juego
    
        
    if(idUsuario) {  // Si el usuario esta iniciado
        
        let user = JSON.parse(localStorage.getItem(id));   
        let estados = user.gameEstate[0].map3[0].level1.savedGame.estados;
        let estadosAcabados = 0; // Contador de estados en 'done'

        Object.keys(estados).forEach(element => {  // Comprovar que todo este acabado en el estado del juego
            if(estados[element] == 'done') {
                estadosAcabados++;  // Subimos le contador
            }
        });

        if(estadosAcabados == 5) {  // Si el contador muestra que todos los estados estan finalizados
            user.gameEstate[0].map3[0].level1.savedGame.estate = 'done';  // Cambiamos estado general a acabado
            localStorage.setItem(id, JSON.stringify(user));  // I actualizamos en el LS

            document.getElementById('next').style.display = 'inline-block';  // Mostramos el boton de porximo juego
        }
        
    } else {
        // Comprovar si el estado del juego del LS esta finalizado
        let savedGame = JSON.parse(localStorage.getItem('sudokuSamurai'));
        let estados = savedGame.estados;
        let estadosAcabados = 0;  // Contador de estados en 'done'

        Object.keys(estados).forEach(element => {  // Comprovar que todo este acabado en el estado del juego
            if(estados[element] == 'done') {
                estadosAcabados++;  // Subimos le contador
            }
        });

        if(estadosAcabados == 5) {  // Si el contador muestra que todos los estados estan finalizados
            savedGame.estate = 'done'; // Cambiamos estado general a acabado
            localStorage.setItem('sudokuSamurai', JSON.stringify(savedGame)); // Actualizamoes el estado general

            document.getElementById('next').style.display = 'inline-block';  // Mostramos el boton de porximo juego
        }        
    }
        
});