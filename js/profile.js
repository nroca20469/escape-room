//Recogemos todos los divs
const divUpdate = document.getElementById('updateUser');
const divUsuario = document.getElementById('usuario');
const divPassword = document.getElementById('changePassword');
const divGameStatus = document.getElementById('viewGameStatus');
const divInformacion = document.getElementById('gameStatus');

//Esconder todos los divs de edicion
divUpdate.style.display = "none";
divInformacion.style.display = "none";
divGameStatus.style.display = "none";
divPassword.style.display = "none";

// FUNCTIONS
// ----------

//Funcion para rellenar la informacion del usuario(div inicial)
function rellenarContainer() {
    
    for(let i = 0; i < localStorage.length; i++) {  //Recorremos el localStorage
       
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));  //Recogemos el usuario parseado
        
        if((usuario['estate'] == true)){  //Comprovamos el que este en estado true(iniciado)
           
            maketacion(usuario, i);  //Maketacion de la informacion del usuario 
            // Si no entra, la pantall aparecera vacia
        } 
    }
}

//Funcion para mostrar la informacion del usuario
function maketacion(usuario, id) {

    //Añadimos al div de usuario la informacion que el usuario puede consultar, o querer ver 
    divUsuario.innerHTML = `<h3> User Profile </h3>
                            <p><strong>Username: </strong> ${usuario['username']}</p>
                            <p><strong>Email: </strong> ${usuario['email']}</p>
                            <p><strong>Name: </strong> ${usuario['name']}</p>
                            <p><strong>User Type: </strong> ${usuario['userType']}</p>
                            <button onClick="updateUser(${id});"> Update user </button>
                            <button onClick="changePassword(${id});"> Change password </button>
                            <p><button onClick="viewGameStatus(${id});">View game status</button></p>`;

}

//Funcion para actualizar el usuario(click en el boton "Update User" del div Usuario)
function updateUser(id) {

    let datosUsuarioUpdate = JSON.parse(localStorage.getItem(id));  //Regogemos los datos del usuario
    
    // Los añadimos al div de Update en forma de formulario(sin ser formulario)
    divUpdate.innerHTML =
        '<h3> UPDATE USER </h3>'+ 
            '<div>'+  //Div para el nombre
                '<label> Name </label>'+
                `<input type="text" id="name" value="${datosUsuarioUpdate['name']}" >`+
                '<small></small>'+
            '</div>'+
            '<div>'+   //Div para el nombre de usuario
                '<label> Username </label>'+
                `<input type="text" id="username" value="${datosUsuarioUpdate['username']}" >`+                
                '<small></small>'+
            '</div>'+
            '<div>'+  //Div para el gmail
                '<label> Email </label>'+
                `<input type="text" id="email" value="${datosUsuarioUpdate['email']}" >`+     //Tambien enseñamos la informacion que tenemos guardada         
                '<small></small>'+
            '</div>'+
            '<div>'+
                `<button id="btnUpdate" onclick="saveUser(${id})">Update User</button>`+
                `<button id="btnPassword" onclick="refreshPassword(${id})"> Refresh password</button>`+
            '</div>';

    divUpdate.style.display = "block";  //Mostramos el div de Update
    
    //Esconder los demas divs
    divInformacion.style.display = "none";
    divGameStatus.style.display = "none";
    divPassword.style.display = "none";
}

// Funcion para refescar la contraseña
function refreshPassword(id) {

    // Añadiremos al divUpdate mensaje con do botones(Si i no)
    divUpdate.innerHTML += '<small id="youSure">Are you sure you want to refresh your password?</small>' + 
                    `<button id="yes" onclick="refresh(${id}, this)"> Yes </button> <button id="no" onclick="refresh(${id}, this)"> No </button>`;
}

// Funcion que se lanza al confirmar(o no) el refresco de la contraseña
function refresh(id, e) {

    // Si se confirma que si se quiere refrescar 
    if(e.id == 'yes') {
        
        // Recogemos el usuario del LS
        let usuario = JSON.parse(localStorage.getItem(id));

        // Cambiamos la password a una predefinida
        usuario.password = '12345678';

        // Actualizamos en el LS
        localStorage.setItem(id, JSON.stringify(usuario));

        // Mostramos porn pantalla la nueva contraseña
        divUpdate.innerHTML += "Tu nueva contraseña es: 12345678";
    } 

    // Eliminamos el small que antes habiamos escrito y los botones
    document.getElementById('youSure').remove();
    document.getElementById('yes').remove();
    document.getElementById('no').remove();

}

// Funcion para guardar los cambios en el usuario del LS
function saveUser(id) {

    // Capturar entrantes de el form
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Recogemos el usuario del LS
    let usuario = JSON.parse(localStorage.getItem(id));

    // Cambiamos los datos del usuario
    usuario.email = email;
    usuario.name = name;
    usuario.username = username;

    // Actualizamos el usuario en el LS
    localStorage.setItem(id, JSON.stringify(user));
    
    // Recargamos la pagina para que se ven los cambios
    location.reload();
}

// Funcion para ver el estado del juego
function viewGameStatus(id) {

    // Mostramos por pantalla las posibilidades para ver el estado por mapas
    divGameStatus.innerHTML = `<h3> GAME STATUS </h3>
            <p> <strong>Game State:</strong> <br>  
                Map 1 <button id="map1" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 2 <button id="map2" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 3 <button id="map3" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> 
            <p><br>`;
    
    // Mostrar el div de estado por pantalla
    divGameStatus.style.display = "block";

    //Esconder los demas divs
    divUpdate.style.display = "none";
    divInformacion.style.display = "none";
    divPassword.style.display = "none";
}

// Funcionpara ver la informacio del estado de juego
function verInformacion(e, id) {

    // Mostrammos por pantalla el div
    divInformacion.style.display = "block";

    // Recogemos el mapa elegido
    let mapX = JSON.parse(localStorage.getItem(id))['gameEstate'][0][e.id];

    // Vaciamos el div(podria contener de otro mapa)
    divInformacion.innerHTML = "";

    // Rellenamos los niveles del mapa
    rellenarDivInformacion(divInformacion, 'level1', mapX);
    rellenarDivInformacion(divInformacion, 'level2', mapX);
    rellenarDivInformacion(divInformacion, 'level3', mapX);
}

// Funcion para rellenar el div de informacion de ver niveles por mapa
function rellenarDivInformacion(divInformacion, level, mapX) {

    // Mostramos en que nivel esta
    if(level == 'level1') {
         divInformacion.innerHTML += 
        "<h2> Level 1: </h2>";
    } else if(level == 'level2') {
        divInformacion.innerHTML += 
        "<h2> Level 2: </h2>";
    } else if(level == 'level3') {
        divInformacion.innerHTML += 
        "<h2> Level 3: </h2>";
    }

    // Variables facila acceso
    let estado = mapX[0][level].estate; 
    let time = mapX[0][level].time;
    let faltas = mapX[0][level].faults;
    let puntuacion = mapX[0][level].puntuacion;

    // Mostramos el estado
    if(!estado) {  
       divInformacion.innerHTML += "<p><strong> Status: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Status: </strong>" + estado + "</p>";
    }

    // Mostramos las faltas
    if(!time) {  
        divInformacion.innerHTML += "<p><strong> Time: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Time: </strong>" + time + "</p>";
    }

    // Mostramos las faltas
    if(!faltas) {  
        divInformacion.innerHTML += "<p><strong> Faults: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Faults: </strong>" + faltas + "</p>";
    }

    // Mostramos la puntuacion
    if(!puntuacion) {  
        divInformacion.innerHTML += "<p><strong> Puntuacion: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Puntuacion: </strong>" + puntuacion + "</p>";
    }
}

// Funcion para cambiar la contraseña
function changePassword(id) {

    // Rellenamos el div de cambiar la password
    divPassword.innerHTML = ' <h3> CHANGE PASSWORD </h3>'+
            '<div>'+
                '<label> Actual Password </label>'+
                `<input type="text" id="actualPassword">`+
                '<small></small>'+
            '</div>'+
            '<div>'+
                '<label> New Password </label>'+
                `<input type="text" id="newPassword" >`+                
                '<small></small>'+
            '</div>' + 
            '<div>'+
                '<label> Repeat Password </label>'+
                `<input type="text" id="repeatedPassword" >`+                
                '<small></small>'+
            '</div>' + 
            `<button onclick="checkPassword(${id})"> Save password </button>`;

    //Mostramos el div de ChangePassword        
    divPassword.style.display = "block";

    //Esconder los demas divs
    divInformacion.style.display = "none";
    divGameStatus.style.display = "none";
    divUpdate.style.display = "none"; 
}

// Funcion de comprvar la password
function checkPassword(id) {

    // Guardamos en variables los valores
    let actualPassword = document.getElementById('actualPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    let repeatedPassword = document.getElementById('repeatedPassword').value;

    // Recogemos el usuario
    let usuario = JSON.parse(localStorage.getItem(id));

    if(checkActualPassword(id, actualPassword)) {   // Comprovar si la contraseña actual es igual a la introducida

        if(comprovarContrasenyas(newPassword, repeatedPassword)) {   // Comprovar si las contraseñas son iguales

            // Cambiamos la password del usuario
            usuario.password = newPassword;

            // Actualizamos en el LS
            localStorage.setItem(id, JSON.stringify(usuario));

        } else {    // Si las contraseñas no son iguales

            // Mostrar mensaje de que las contraseñas no son iguales
            document.getElementById('newPassword').nextSibling.innerHTML += "<br>Las contraseñas no son iguales";
        
        }

    } else {    // Si la contraseña actual no es correcta

        // Mostramos un mensaje de que la contraseña actual no es correcta
        document.getElementById('actualPassword').nextSibling.innerHTML = "<br>Contrasenya incorrecta";
    
    }
}

// Funcion de comprovar la contraseña actual es igual
function checkActualPassword(id, actualPassword) {

    // Recogemos la contraseña original del usuario
    let passwordOriginal = JSON.parse(localStorage.getItem(id)).password;

    // Comprovamos que la contraseña actual es igual o no
    if(passwordOriginal === actualPassword) {       
        return true;        // Devolvemos que las contaseñas son iguales
    } else {
        return false;       // Sino, devolvemos que las contraseñas no son iguales
    }

}

// Funcion para comprovar que las contraseñas nuevas son iguales
function comprovarContrasenyas(newPassword, repeatedPassword) {

    // Comprovamos si la contraseña nueva es valida
    if(validarContrasenya(newPassword) == true) {
        return (newPassword === repeatedPassword);  // Si son iguales i validas devolvemos que es true, sino no
    } else {
        return false;       // Si no es valida devolvera falso
    }

}
 
// Funcion para validar la contraseña con regex
function validarContrasenya(newPassword) {

    // Recogemos el regex para validar la contraseña
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if(re.test(newPassword.trim())) {       // Si el regex testea la contraseña corretamente
        return true;                        // Devolvemos que la contraseña es valida
    } else {        // Si el regex no lo valida

        // Mostramos que la contraseña no cumple con los parametros
        document.getElementById('newPassword').nextSibling.innerHTML = '<br>La contrasenya no cumple con los parametros';
        return false;  // Devolvemos que la contraseña no es valida

    } 

}


// EVENTO
// -------------

// Evento al recargar la pantalla, rellenamios el perfil
window.addEventListener('load', rellenarContainer);