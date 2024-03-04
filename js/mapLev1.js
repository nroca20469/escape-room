
// Div general
const container = document.getElementById('container');

// Constantes de los divs de niveles
const level1 = document.getElementById('lev1');
const level2 = document.getElementById('lev2');
const level3 = document.getElementById('lev3');


// FUNCTIONS
// -----------

// Funcion para redirigir la pagina
function redirectPage(id) {

    // Dependiendo del nivel, lo redirigimos a distintas paginas
    if(id == 'lev1') {
        location.href = "../form/games/lev1lev1.html";
    } else if(id == 'lev2') {
        location.href = "../form/games/lev1lev2.html";
    } else if(id == 'lev3') {
        location.href = "../form/games/lev1lev3.html";
    }
}

// Funcion para buscar si el usuario esta iniciado
function mirarUsuario() {

    // Variable para guardar el id del usuario
    let id;

    for(let i = 0; i < localStorage.length; i++) {

        let user = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if(user['estate'] == true) {  // Si el usuario esta inciado
            id = localStorage.key(i);  // Guardamos el id del LS
        }

    }

    return id;
}

// Funcion para buscar en que nivel esta el usuario actual(o mostrar el primer nivel si no esta iniciado)
function actualizarClases() {

    // Escondemos el boton de next map(Map2)
    document.getElementById('nextMap').style.display = "none";


    let id = mirarUsuario() ?? null;

    if(id) {        // Si el usuario esta iniciado  

        // Variable de estado del juego
        let gameEstate = (JSON.parse(localStorage.getItem(id))['gameEstate']);
    
        // Variables de mapa i nivel
        let map1 = gameEstate[0]['map1'];
        let lev1 = map1[0].level1;
        let lev2 = map1[0].level2;
        let lev3 = map1[0].level3;

        // Nivel 1
        if(lev1.estate == null || lev1.estate) {
            level1.className = 'unblocked';

            if(lev1.estate == 'done') {
                level1.classname += ' done';
            }
        }

        // Nivel 2
        if((lev2.estate == null && lev1.estate == 'done') || lev2.estate ) {
            level2.className = 'unblocked';

            if(lev2.estate == 'done') {
                level2.classname += ' done';
            }
        }

        // Nivel 3
        if((lev3.estate == null && lev2.estate == 'done') || lev3.estate ) {
            level3.className = 'unblocked';

            if(lev3.estate == 'done') {
                
                level3.classname += ' done';
                document.getElementById('nextMap').style.display = "inline-block";
            
            }
        }

    } else {        // Si el usuario no esta iniciado 
        level1.className = "unblocked";  // Desbloqueamos solo el primer nivel
    }
}


// EVENTS
// ----------

// Evento al clicar en cualquier parte del div principal(buscamos si tienen clase unbloqued or done)
container.addEventListener('click', (e) => {

    // Guardamos la clase en una variable
    let classe = e.target.parentNode.className;
    
    if(classe == "unblocked" || classe == 'done') {      // Si el parent del clicado esta en unblocked

        // No aparecera o simplemente se borrara el aviso
        document.getElementById('aviso').style.display = 'none';  

        // I se redirigira la pagina
        redirectPage(e.target.parentNode.id);

    } else  {  //Si el div/boton esta en estado "blocked" aparecera un mensaje de error
        
        document.getElementById('aviso').innerText = 'Tienes que superar los niveles anteriores para poder acceder a este';
        document.getElementById('aviso').style.display = 'block';
    }

});

// Evento al cargarse la pagina(cambiara las clases)
window.addEventListener('load', actualizarClases);