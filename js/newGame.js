
// Constantes de los botones para reiniciar el juego
const btnNewGame = document.getElementById('btnNewGame');       //boton de reiniciar el juego
const divDisplaySure = document.getElementById('modal');        //div con la infomracion de reincio
const btnSureYes = document.getElementById('btnRestartSure');   //boton de que quiere reiciniar el juego
const btnSureNo = document.getElementById('btnRestartNo');      //oton para no reiniciar el juego y simpelmente cerrar el div

// Variable global de usuario
let userId;

// Evento al clicar que quieren reiniciar el juego
btnNewGame.addEventListener('click', ()=> { 

    //Buscar en el LS si esta iniciado
    for(let i= 0; i< localStorage.length; i++) {
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if(usuario.estate == true) {  // Si el usuario esta iniciado

            divDisplaySure.className = "open";  //Mostramos el div de assegurar
            userId = localStorage.key(i);       //Recogemos el userId

        }
    }

});

// Evento al clicar que si quieren reiniciar juego
btnSureYes.addEventListener('click', () => {
    let usuario = JSON.parse(localStorage.getItem(userId));

    // Vaciamos el estado general
    let gameNew = [{
        "map1": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            }
        }],
        "map2": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            }
        }],
        "map3": [{
            "level1": {
                "savedGame": null,
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level2": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            },
            "level3": {
                "estate": null,
                "time": null,
                "faults": null,
                "puntuacion": null
            }
        }]
    }];

    usuario.gameEstate = gameNew;  //Pondremos los parametros del juego a null
    localStorage.setItem(userId, JSON.stringify(usuario));  //Lo actualizaremos al localStorage 

    divDisplaySure.className = "close";   // Cerrar el modal

});

// Evento al clicar que no quieren reiniciar juego
btnSureNo.addEventListener('click', () => {
    divDisplaySure.className = "close";   //Si es que no, simplemente cerramos/escondemos el div
});
