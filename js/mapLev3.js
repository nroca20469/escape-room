const container = document.getElementById('container');

const lev1 = document.getElementById('lev1');
const lev2 = document.getElementById('lev2');
const lev3 = document.getElementById('lev3');

// const unlocked = '<svg id="unlocked" xml ns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16"> <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/> </svg>';
// const locked = '<svg id="locked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>  </svg>';


function redirectPage(id) {

    if(id == 'lev1') {
        location.href = "../form/games/lev3lev1.html";
    } else if(id == 'lev2') {
        location.href = "../form/games/lev3lev2.html";
    }
}

function actualizacionClases() {
    mirarUsuario();
}

function mirarUsuario() {
    let id;
    for(let i = 0; i < localStorage.length; i++) {
        let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(user['estate'] == true) {
            id = localStorage.key(i);
        }
    }

    if(id) {
            let gameEstate = (JSON.parse(localStorage.getItem(id))['gameEstate']);
            // let map2 = gameEstate[0]['map2'];
            let map3 = gameEstate[0]['map3'];
            if(map3[0]['level1']['estate'] == null || map3[0]['level1']['estate'] == "done" || map3[0]['level1']['estate'] == "intento" ) {
               lev1.className = "unblocked";
            } else {
               lev1.className = "blocked";
            }
            if((map3[0]['level1']['estate'] == "done" && map3[0]['level2']['estate'] == null) || map3[0]['level2']['estate'] == "done" ) {
                if(map3[0]['level2']['estate'] == "done") {
                    lev2.className = "done";
                } else {
                    lev2.className = "unblocked";
                }
            } else {
                lev2.className = "blocked";
            }   

        } else {
            lev1.className = "unblocked";
            lev2.className = "blocked"
        }
}

container.addEventListener('click', (e) => {
    if(e.target.parentNode.className == "unblocked") {
        document.getElementById('aviso').style.display = 'none';

        redirectPage(e.target.parentNode.id);

    } else if(e.target.parentNode.className == "blocked"){ //Si el div/boton esta en estado "blocked" aparecera un mensaje de error
        document.getElementById('aviso').innerText = 'Tienes que superar los niveles anteriores para poder acceder a este';
        document.getElementById('aviso').style.display = 'block';
    }

});

window.addEventListener('load', actualizacionClases);