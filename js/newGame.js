const btnNewGame = document.getElementById('btnNewGame');       //boton de reiniciar el juego
const divDisplaySure = document.getElementById('modal');        //div con la infomracion de reincio
const btnSureYes = document.getElementById('btnRestartSure');   //boton de que quiere reiciniar el juego
const btnSureNo = document.getElementById('btnRestartNo');      //oton para no reiniciar el juego y simpelmente cerrar el div
let userId;

btnNewGame.addEventListener('click', ()=> { 

    //Buscar en el local Storage si esta iniciado
    for(let i= 0; i< localStorage.length; i++) {
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if(usuario.estate == true) {

            divDisplaySure.className = "open";  //Mostramos el div de assegurar
            userId = localStorage.key(i); //Recogemos el userId

        }
    }

});

//Si clican que si
btnSureYes.addEventListener('click', () => {
    let usuario = JSON.parse(localStorage.getItem(userId));

    let gameNew = [{
        "map1": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null
            }
        }],
        "map2": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null
            }
        }],
        "map3": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null
            }
        }]
    }];


    usuario.gameEstate = gameNew;  //Pondremos los parametros del juego a null
    localStorage.setItem(userId, JSON.stringify(usuario));  //Lo actualizaremos al localStorage 

    divDisplaySure.className = "close";

});

btnSureNo.addEventListener('click', () => {
    divDisplaySure.className = "close";   //Si es que no, simplemente cerramos/escondemos el div
});