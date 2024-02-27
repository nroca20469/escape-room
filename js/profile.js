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


//Funcion para rellenar la informacion del usuario(div inicial)
function rellenarContainer() {
    
    for(let i = 0; i < localStorage.length; i++) {  //Recorremos el localStorage
       
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));  //Recogemos el usuario parseado
        
        if((usuario['estate'] == true)){  //Comprovamos el que este en estado true(iniciado)
           
            maketacion(usuario, i);  //Maketacion de la informacion del usuario 
        
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

function refreshPassword(id) {
    divUpdate.innerHTML += '<small id="youSure">Are you sure you want to refresh your password?</small>' + 
                    `<button id="yes" onclick="refresh(${id}, this)"> Yes </button> <button id="no" onclick="refresh(${id}, this)"> No </button>`;
}

function refresh(id, e) {
    if(e.id == 'yes') {
        document.getElementById('youSure').style.display = "none";
        document.getElementById('yes').style.display = "none";
        document.getElementById('no').style.display = "none";

        let usuario = JSON.parse(localStorage.getItem(id));
        let user = {
            email: usuario.email,
            estate: usuario.estate,
            gameEstate: usuario.gameEstate,
            name: usuario.name,
            password: '12345678',
            userType: usuario.userType,
            username: usuario.username
        }

        localStorage.setItem(id, JSON.stringify(user));

        divUpdate.innerHTML += "Tu nueva contraseña es: 12345678";
    } else if(e.id == 'no'){
        document.getElementById('youSure').style.display = "none";
        document.getElementById('yes').style.display = "none";
        document.getElementById('no').style.display = "none";
    }
}

function saveUser(id) {
    //Capturar entrantes de el form
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    let usuario = JSON.parse(localStorage.getItem(id));

    let user = {
        email: email,
        estate: usuario.estate,
        gameEstate: usuario.gameEstate,
        name: name,
        password: usuario.password,
        userType: usuario.userType,
        username: username
    }

    localStorage.setItem(id, JSON.stringify(user));
    
    location.reload();
}

function viewGameStatus(id) {

    let gameStateMap1Level1 = JSON.parse(localStorage.getItem(id))['gameEstate'];

    divGameStatus.innerHTML = `<h3> GAME STATUS </h3>
            <p> <strong>Game State:</strong> <br>  
                Map 1 <button id="map1" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 2 <button id="map2" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> <br>
                Map 3 <button id="map3" onclick= "verInformacion(this, ${id});"> Ver Informacion </button> 
            <p><br>`;
        
    divGameStatus.style.display = "block";

    //Esconder los demas divs
    divUpdate.style.display = "none";
    divInformacion.style.display = "none";
    divPassword.style.display = "none";
}

function verInformacion(e, id) {
    divInformacion.style.display = "block";

    let mapX = JSON.parse(localStorage.getItem(id))['gameEstate'][0][e.id];
    
    divInformacion.innerHTML = "";

    rellenarDivInformacion(divInformacion, 'level1', mapX);
    rellenarDivInformacion(divInformacion, 'level2', mapX);
    rellenarDivInformacion(divInformacion, 'level3', mapX);
}

function rellenarDivInformacion(divInformacion, level, mapX) {
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
    if(JSON.stringify(mapX[0][level]['estate']) == 'null') {  
       divInformacion.innerHTML += "<p><strong> Status: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Status: </strong>" + JSON.stringify(mapX[0][level]['estate']) + "</p>";
    }

    if(JSON.stringify(mapX[0][level]['time']) == 'null') {  
        divInformacion.innerHTML += "<p><strong> Time: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Time: </strong>" + JSON.stringify(mapX[0][level]['time']) + "</p>";
    }

    if(JSON.stringify(mapX[0][level]['faults']) == 'null') {  
        divInformacion.innerHTML += "<p><strong> Faults: </strong> -- </p>";
    } else {
        divInformacion.innerHTML += "<p><strong> Faults: </strong>" + JSON.stringify(mapX[0][level]['faults']) + "</p>";
    }
}

function changePassword(id) {

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

    divPassword.style.display = "block";  //Mostramos el div de ChangePassword
    
    //Esconder los demas divs
    divInformacion.style.display = "none";
    divGameStatus.style.display = "none";
    divUpdate.style.display = "none"; 
}

function checkPassword(id) {
    let actualPassword = document.getElementById('actualPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    let repeatedPassword = document.getElementById('repeatedPassword').value;
    let usuario = JSON.parse(localStorage.getItem(id));

    if(checkActualPassword(id, actualPassword)) {

        if(comprovarContrasenyas(newPassword, repeatedPassword)) {

            let user = {
                email: usuario.email,
                estate: usuario.estate,
                gameEstate: usuario.gameEstate,
                name: usuario.name,
                password: newPassword,
                userType: usuario.userType,
                username: usuario.username
            };

            localStorage.setItem(id, JSON.stringify(user));

        } else {
            document.getElementById('newPassword').nextSibling.innerHTML += "<br>Las contraseñas no son iguales";
        }

    } else {
        document.getElementById('actualPassword').nextSibling.innerHTML = "<br>Contrasenya incorrecta";
    }
    
}

function checkActualPassword(id, actualPassword) {

    let passwordOriginal = JSON.parse(localStorage.getItem(id)).password;

    if(passwordOriginal === actualPassword) {
        return true;
    } else {
        return false;
    }
    // return true;
}

function comprovarContrasenyas(newPassword, repeatedPassword) {
    if(validarContrasenya(newPassword) == true) {
        return (newPassword === repeatedPassword);
    } else {
        return false;
    }
}
 
function validarContrasenya(newPassword) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(re.test(newPassword.trim())) {
        return true;
    } else {
        document.getElementById('newPassword').nextSibling.innerHTML = '<br>La contrasenya no cumple con los parametros';
        return;
    } 
}


window.addEventListener('load', ()=> {
    rellenarContainer();
});