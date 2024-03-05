// Recoger div General
const divEstadisticas = document.getElementById('estadisticas');


function buscarUsuarios() {
    let usuarios = new Array(); 
    let users = -1;
    for(let i = 0; i < localStorage.length; i++) {
        let user = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]));
        
        if(user.estate == true || user.estate == false) {
            users++;
            usuarios[users] = user;
        }
    }

    return usuarios;
}

function recogerPuntuaciones(usuario, mapa) {
    let gameEstate = usuario.gameEstate[0][mapa][0];
    let puntuacion = 0;

    if(gameEstate.level1.estate) { // Recoger Puntuacion
        puntuacion += (gameEstate.level1.puntuacion) ? +gameEstate.level1.puntuacion : 0;
    } 
    if(gameEstate.level2.estate) { // Recoger Puntuacion
        puntuacion += (gameEstate.level2.puntuacion) ? +gameEstate.level2.puntuacion : 0;
    } 
    if(gameEstate.level3.estate) { // Recoger Puntuacion
        puntuacion += (gameEstate.level3.puntuacion) ? +gameEstate.level3.puntuacion : 0;
    } 

    return puntuacion;
}

window.addEventListener('load', () => {
    // Recorrer LS y usuarios
    let usuarios = buscarUsuarios();

    if(usuarios.length != 0) {
        // Creacion de tabla
        divEstadisticas.innerHTML += '<table> <thead> <tr> <th> Username </th> <th> Puntuacion </th> </tr> </thead> </table>';

        // Recoger tabla
        let tablas = document.querySelector('table');
        // Buscar puntuaciones 
        for(let i = 0; i < usuarios.length; i++) {
            let puntuaciones = 0;
            puntuaciones += +recogerPuntuaciones(usuarios[i], 'map1');
            puntuaciones += +recogerPuntuaciones(usuarios[i], 'map2');
            puntuaciones += +recogerPuntuaciones(usuarios[i], 'map3');

            // Mostrar por pantalla
            tablas.innerHTML += '<tr><td>' + usuarios[i].username + '</td><td>' + puntuaciones + '</td></tr>';
        }

    }
    
})