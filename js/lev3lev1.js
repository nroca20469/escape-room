import  {obtenerSudoku} from '../js/sudoku.js';  //Importamos las funciones 

const imgSudoku = document.getElementById('imgSudoku');  //Guardamos la imagen en una constante

function saveSudoku(gameStateLevel3Level1, id) {
    //Guardamos en las variables los game este segun su nivel/mapa
    let gameStateMap1 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map1'];
    let gameStateMap2 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map2'];
    let gameStateMap3Lev2 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level2'];
    let gameStateMap3Lev3 = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level3'];

    //Guardamos en una varable en json(con sus propios datos, solo cambiamos el propio game estate)
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
                    "savedGame": gameStateLevel3Level1
                },
                "level2": gameStateMap3Lev2,
                "level3": gameStateMap3Lev3
            }]
        }]
    };

    localStorage.setItem(id, JSON.stringify(user));
}

window.addEventListener('load', () => {  //Cuando la ventana se inicie
    let jsonSudoku;//Para guardar el json de sudoku

    //Check if a game is already savevd
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate'] == true) {  // Buscamos el usuario que este logeado
            id=localStorage.key(i);  //Guardamo el id, para luego poder editar/comprovar
        }
    }

    //Saved game
    let savedGame = JSON.parse(localStorage.getItem(id))['gameEstate'][0]['map3'][0]['level1']['savedGame'];  //Recogemos el savedGame
   
    if(savedGame.length == 0) {

        let random = Math.floor(Math.random() * 3);

        imgSudoku.setAttribute('src', `./../../img/lev3lev1/${random+1}.png`);

        //Guadamos en variables la informacion que saquemos el obtener Sudoku
        jsonSudoku = obtenerSudoku(3, random)(null)['jsonSudoku'];
        let jsonCorreccion = obtenerSudoku(3, random)(null)['correccion'];
        let jsonOriginal = obtenerSudoku(3, random)(null)['jsonSudoku'];

        //Save the game/sudoku
        let gameState = '{ "saved":  ' + JSON.stringify(jsonSudoku) + ', "correccion":  ' + JSON.stringify(jsonCorreccion) + ', "original": ' + JSON.stringify(jsonOriginal) + ', "index": ' + (random+1) + '}';

        saveSudoku(JSON.parse(gameState), id);  //Guardamos automaticamoente el sudoku, para luego, cuando cambiemos de pagina, no perdamos la informacion

    } else {
        imgSudoku.setAttribute('src', `./../../img/lev3lev1/${savedGame['index']}.png`);

    }

});