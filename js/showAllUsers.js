// Constante para recoger el div principal donde se mostraran la informacion
const container = document.getElementById('container');


// FUNCION
// ------------

// Funcion al cargarse la pagina(buscar usuarios)
function onLoad(e)  {

    e.preventDefault();
    let usuarios = 0;

    // Recorrecmos el LS para buscar los usuarios
    for(let i = 0; i < localStorage.length; i++) {

        // Recogemos el objeto para facil acceso
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));

        // Si el usuario tiene un estado(true o false)
        
        if((usuario['estate'] == true) || (usuario['estate'] == false)){
            usuarios++;
            maketacion(usuario, i);     // Lo maquetamos al vuelo
        } 
    }

    if(usuarios > 0) {

        // Para cada usuario creamos su clase update y de ver informacion(para que no se cree abajo del todo o arriba del todo, y este ordenado)
        container.innerHTML += '<div class="update">  </div>  <div id="verInformacion">  </div>';

        // Escondemos los divs escondidos
        document.querySelectorAll('#verInformacion').forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll('.update').forEach(element => {
            element.style.display = "none";
        });
    }


}

// Funcion para maketar el usuario por pantalla
function maketacion(usuario, id) {

    // Creamos el div y lo rellenamos con el usuario(username, email, game estate, borrar i actualizar usuario)
    container.innerHTML += `
        <div id="${usuario['username']}" class="usuario"> 
            <p> <strong>Username:</strong> ${usuario['username']}</p>
            <p> <strong>Email:</strong> ${usuario['email']}</p> <br>
            <p> <strong>Game State:</strong><br>  
                Map 1 <button id="map1" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 2 <button id="map2" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 3 <button id="map3" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> 
            <p><br>
            <button onclick="borrarUsuario(this.parentNode.parentNode)"> Borrar Usuario </button>
            <button onclick="actualizarUsuario(this.parentNode.parentNode, id)"> Actualizar Usuario </button>
        </div>`;

}

// Funcion para ver la informacion del game estate segun su tipo de mapa(separado por mapas)
function verInformacion(e, id) {

    // Escondemos el div de actualizacion(por si se ha abierto antes)
    document.querySelector('.update').style.display = "none";

    // Recogemos en variables en mapa actual y el div de la informacion
    let mapX = JSON.parse(localStorage.getItem(id))['gameEstate'][0][e.id];
    let divInformacion = document.getElementById('verInformacion');

    // Mostramos el div de informacion y vaciamos este div de informacion
    divInformacion.style.display = "block";
    divInformacion.innerHTML = "";

    // Rellenar el div de informacion por los niveles
    rellenarDivInformacion(divInformacion, 'level1', mapX);
    rellenarDivInformacion(divInformacion, 'level2', mapX);
    rellenarDivInformacion(divInformacion, 'level3', mapX);

}

// Funcion para rellenar la informacion de los mapas i niveles
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

// Funcion para borrar usuario especificado
function borrarUsuario(e) {
    
    // Variables de id del usuario y si el usuario esta iniciado actualmente
    let id; 
    let usuarioActual = false;

    // Recorremos el LS
    for(let i = 0; i < localStorage.length; i++) {

        // Si el nombre del usuario es el mismo usuario que el del id
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == e.id) {
            
            // Guardamos el id del usuario
            id = localStorage.key(i);

            // Si el estado de este usuario esta en true
            if(JSON.parse(localStorage.getItem(id))['estate'] == true) {
                usuarioActual = true;   // Recogemos que el usuario esta iniciado
            }
        }
    }

    // Borramos el usuario del LS
    localStorage.removeItem(id);

    // Si el usuario es el actual
    if(usuarioActual) {
        location.href = '../index.html';    // Lo mandamos al inicio
    } else {    
        location.reload();                  // Sino recargamos la pagina
    }
}

// Funcion para actualizar el usuario
function actualizarUsuario(e) {

    // Escondemos el div de ver informacion y mostramos el div de actualizar el usuario
    document.getElementById('verInformacion').style.display = "none";
    let update = document.querySelector('.update');
    update.style.display = "block";

    // Variable para guardar el id del usuario
    let id; 

    // Recorremos el LS
    for(let i = 0; i < localStorage.length; i++) {

        // Recorremos el LS i miramos si el nombre del usuario es el mismo que el guardado
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == e.id) {
            
            // Guardamos el id del usuario
            id=localStorage.key(i);
        }
    }

    // Recoemos los datos del usuario a actualizar
    let datosUsuarioUpdate = JSON.parse(localStorage.getItem(id));

    // Rellenar el div de actualizar
    update.innerHTML = 
            '<h5>Actualizar Usuario</h5>' + 
            '<div>'+
                '<label> Name </label>'+
                `<input type="text" id="name" value="${datosUsuarioUpdate['name']}" >`+
                '<small></small>'+
            '</div>'+
            '<div>'+
                '<label> Username </label>'+
                `<input type="text" id="username" value="${datosUsuarioUpdate['username']}" >`+                
                '<small></small>'+
            '</div>'+
            '<div>'+
                '<label> Email </label>'+
                `<input type="text" id="email" value="${datosUsuarioUpdate['email']}" >`+                
                '<small></small>'+
            '</div>';

    // Si el usuario es administrador 
    if(datosUsuarioUpdate['userType'] == 'admin') {

        // Le mostramos que su tipo de usuario es admin
        document.getElementsByClassName('update')[0].innerHTML += '<div><label for="userType"> User Type </label>'+
            '<span>'+
                '<label class="userType"><input type="radio" name="userType" id="user"> User </label>' +
                '<label class="userType"><input type="radio" name="userType" id="admin" checked> Admin </label>' +
            '</span>';


    } else {    // Sino, mostrasmo que el tipo de usuario es usuario

        document.getElementsByClassName('update')[0].innerHTML += '<div><label for="userType"> User Type </label>'+
            '<span>'+
                '<label class="userType"><input type="radio" name="userType" id="user" checked> User </label>' +
                '<label class="userType"><input type="radio" name="userType" id="admin"> Admin </label>' +
            '</span>';
    }

    // Acabamos de rellenar el div de update con actualizar i el boton de refrescar contraseña
    document.getElementsByClassName('update')[0].innerHTML +=       
        '<div>'+
            `<button id="btnUpdate" onclick="updateUser(${e.id})">Update User</button>`+
            '<button id="btnPassword"> Refresh password</button>'+
        '</div>';
        
}

// Funcion para actualizar el usuario desde el boton de actualizar(desde el div de actualizar)
function updateUser(username) {

    // Recogemos los inputs del div(para el contenido)
    let divUpdate = document.querySelectorAll('.update div input');
    
    // Recogemos los valores de ese inputs en variables
    let name = divUpdate[0].value;
    let usernam =  divUpdate[1].value;
    let email = divUpdate[2].value;

    // Recogemos el tipo de usuario
    let usertype = document.querySelector('.update div span .userType input:checked').id;

    // Validamos el email y comprovamos la longuitud del nombre de usuario, email i nombre de los inputs
    if(validacioEmail(email) && comprovarLongitud(name, 3, 15) && comprovarLongitud(usernam, 3, 25) && comprovarLongitud(email, 3, 25)) {

        // Si el error en lso datos estaba creado
        if(document.getElementById('errorDatos')) {

            // Eliminamos ese parrafo
            document.getElementById('errorDatos').remove();

        }

        // Recogemos el usuario del LS
        let datosUsuarioUpdate = JSON.parse(localStorage.getItem(username));  

        // Actualizamos los datos en esta variable
        datosUsuarioUpdate.name = name;
        datosUsuarioUpdate.userName = usernam;
        datosUsuarioUpdate.email = email;
        datosUsuarioUpdate.userType = usertype;

        // Actualizar en el LS
        localStorage.setItem(username, JSON.stringify(datosUsuarioUpdate));

    } else {

        // Si no se ha validado ni comporvado la longuitud de valores, mostramos el error
        divUpdate.innerHTML = '<p id="errorDatos"> Parece que hay algun error con sus datos, vuelva a revisar </p>';
    }
}

// Funcion de validacion de email con regex
function validacioEmail(email) {

    // Recogemos el regex para validar el email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email.value.trim())) {   // Si el regex testea que el email es valido

        return true;        // Devolvemos que el email es valido

    } else {        // Si el regex no lo valida 

        // Mostramos el error en el email
        mostrarError(email, 'El formato de su email no es correcto');
        return false;       // Devolvemos que el email no es valido
    }
}

// Funcion para comprovar la longuitud minima i maxima de X input
function comprovarLongitud(input, min, max) {

    // Si el input tiene una medida mas baja de lo que toca
    if(input.value.length < min) {
        return false;  // I devolvemos que no cumple con los parametros minimos
    } else if(input.value.length > max) {       // Si el input tiene una longuitud superior a la maxima
        return false;  // Devolvemos que la longuitud no es correct
    } else {
        return true;   // Devolvemos que la longuitud del input es correca
    }
    
}

// EVENTO
// ---------

// Evento al cargarse la pagina
window.addEventListener('load', onLoad);