import  {obtenerSudoku} from '../js/sudoku.js';  //Importamos las funciones 

const imgSudoku = document.getElementById('imgSudoku');  //Guardamos la imagen en una constante

let idUsuario;

function saveSudoku(gameStateLevel3Level1) {
    //Guardamos en las variables los game este segun su nivel/mapa
    let gameStateMap3Lev1 = JSON.parse(localStorage.getItem(idUsuario))['gameEstate'][0]['map3'][0]['level1'];

    let usuario = JSON.parse(localStorage.getItem(idUsuario));
    let estadoLevel1 = {
        estate1: 'intento',
        estate2: 'intento',
        estado3: 'intento', 
        estado4: 'intento',
        estado5: 'intento',
        faults: gameStateMap3Lev1.faults,
        savedGame: gameStateLevel3Level1,
        puntuacion: gameStateMap3Lev1.puntuacion
    };

    //Acctualizar estado 
    usuario.gameEstate[0].map3[0].level1 = estadoLevel1;

    localStorage.setItem(idUsuario, JSON.stringify(usuario));
}

window.addEventListener('load', () => {  //Cuando la ventana se inicie
    let jsonSudoku;//Para guardar el json de sudoku

    //Check if a game is already savevd
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate'] == true) {  // Buscamos el usuario que este logeado
            idUsuario=localStorage.key(i);  //Guardamo el idUsuario, para luego poder editar/comprovar
        }
    }
    if(idUsuario) {
        //Saved game
        let savedGame = JSON.parse(localStorage.getItem(idUsuario))['gameEstate'][0]['map3'][0]['level1']['savedGame'];  //Recogemos el savedGame
        if(savedGame.length == 0) {
            let random = Math.floor(Math.random() * 3);

            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${random}.png`);

            //Guadamos en variables la informacion que saquemos el obtener Sudoku
            jsonSudoku = obtenerSudoku(3, random)(null)['jsonSudoku'];
            let jsonCorreccion = obtenerSudoku(3, random)(null)['correccion'];
            let jsonOriginal = obtenerSudoku(3, random)(null)['jsonSudoku'];

            //Save the game/sudoku
            let gameState = {
                saved: jsonSudoku,
                correccion: jsonCorreccion,
                original: jsonOriginal,
                index: random+1
            }

            saveSudoku(gameState);  //Guardamos automaticamoente el sudoku, para luego, cuando cambiemos de pagina, no perdamos la informacion

        } else {
            
            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${savedGame['index']}.png`);
            
        }
    } else {
        
        if(!localStorage.getItem('sudokuSamurai')) {
            let random = Math.floor(Math.random() * 3);

            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${random+1}.png`);

            //Guadamos en variables la informacion que saquemos el obtener Sudoku
            jsonSudoku = obtenerSudoku(3, random)(null)['jsonSudoku'];
            let jsonCorreccion = obtenerSudoku(3, random)(null)['correccion'];
            let jsonOriginal = obtenerSudoku(3, random)(null)['jsonSudoku'];
            
            let gameState = '{ "saved":  ' + JSON.stringify(jsonSudoku) + ', "correccion":  ' + JSON.stringify(jsonCorreccion) + ', "original": ' + JSON.stringify(jsonOriginal) + ', "index": ' + (random+1) + '}';
            localStorage.setItem('sudokuSamurai', gameState)
        } else{
            let gameState = JSON.parse(localStorage.getItem('sudokuSamurai'));
            imgSudoku.setAttribute('src', `./../../img/lev3lev1/${gameState['index']}.png`);
        }
        
    }

    let comingFrom = document.referrer.split('/');
    if(comingFrom[comingFrom.length-1] == 'lev3level1sudoku5.html') {
        if(idUsuario) {
            //Comprovar que todo este acabado
        } else {
            document.getElementById('next').style.display = 'inline-block';
        } 
    } else {
        document.getElementById('next').style.display = 'none';
    }
    
});