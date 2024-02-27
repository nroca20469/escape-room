const container = document.getElementById('container');

function onLoad(e)  {
    e.preventDefault();
    container.innerHTML = '<div id="usuarios">';

    
    for(let i = 0; i < localStorage.length; i++) {
        let usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if((usuario['estate'] == true) || (usuario['estate'] == false)){
            maketacion(usuario, i);
        } 
    }
}

function maketacion(usuario, id) {
    // let gameStateMap1Level1 = usuario['gameEstate'][0]['map1'][0]['level1'];
    // let gameState = usuario['gameEstate'][0];

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
        </div>
        <div class="update"></div>`;

    container.innerHTML = container.innerHTML + '<div id="verInformacion">  </div>';
    document.getElementById('verInformacion').style.display = "none";
    document.querySelector('.update').style.display = "none";
}

function verInformacion(e, id) {
    document.querySelector('.update').style.display = "none";

    let mapX = JSON.parse(localStorage.getItem(id))['gameEstate'][0][e.id];
   
    let divInformacion = document.getElementById('verInformacion');

    divInformacion.style.display = "block";
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
    //    console.log('HIIII');
    } else {
        divInformacion.innerHTML += "<p><strong> Status: </strong>" + JSON.stringify(mapX[0][level]['estate']) + "</p>";
    }

    if(JSON.stringify(mapX[0][level]['time']) == 'null') {  
        divInformacion.innerHTML += "<p><strong> Time: </strong> -- </p>";
        // console.log('HIIII');
    } else {
        divInformacion.innerHTML += "<p><strong> Time: </strong>" + JSON.stringify(mapX[0][level]['time']) + "</p>";
    }

    if(JSON.stringify(mapX[0][level]['faults']) == 'null') {  
        divInformacion.innerHTML += "<p><strong> Faults: </strong> -- </p>";
        // console.log('HIIII');
    } else {
        divInformacion.innerHTML += "<p><strong> Faults: </strong>" + JSON.stringify(mapX[0][level]['faults']) + "</p>";
    }
}

function borrarUsuario(e) {
    // document.getElementById('verInformacion').style.display = "none";
    // document.querySelector('update').style.display = "none";

    // console.log(e.id);
    let id; 
    let usuarioActual = false;
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == e.id) {
            id = localStorage.key(i);
            // console.log(id);
            console.log(JSON.parse(localStorage.getItem(id))['estate'] );
            if(JSON.parse(localStorage.getItem(id))['estate'] == true) {
                usuarioActual = true;
            }
        }
    }
    // console.log(e.id, id);
    localStorage.removeItem(id);

    if(usuarioActual) {
        location.href = '../index.html';
    } else {
        location.reload();
    }
    console.log(id);
    // location.reload();
}

function actualizarUsuario(e) {
    // console.log(e.id);
    document.getElementById('verInformacion').style.display = "none";
    let update = document.querySelector('.update');
    update.style.display = "block";
    let id; 
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == e.id) {
            id=localStorage.key(i);
        }
    }
    let datosUsuarioUpdate = JSON.parse(localStorage.getItem(id));
    // console.log(datosUsuarioUpdate);

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
    if(datosUsuarioUpdate['userType'] == 'admin') {

        document.getElementsByClassName('update')[0].innerHTML += '<div><label for="userType"> User Type </label>'+
            '<span>'+
                '<label class="userType"><input type="radio" name="userType" id="user"> User </label>' +
                '<label class="userType"><input type="radio" name="userType" id="admin" checked> Admin </label>' +
            '</span>';

    } else {
        document.getElementsByClassName('update')[0].innerHTML += '<div><label for="userType"> User Type </label>'+
            '<span>'+
                '<label class="userType"><input type="radio" name="userType" id="user" checked> User </label>' +
                '<label class="userType"><input type="radio" name="userType" id="admin"> Admin </label>' +
            '</span>';

    }
    document.getElementsByClassName('update')[0].innerHTML +=   
            '<div>'+
                `<button id="btnUpdate" onclick="updateUser(${e.id})">Update User</button>`+
                '<button id="btnPassword"> Refresh password</button>'+
            '</div>';
}

function updateUser(username) {
    // console.log(username.id);
    let divUpdate = document.querySelectorAll('.update div input');
    // console.log(divUpdate);
    let name = divUpdate[0].value;
    let usernam =  divUpdate[1].value;
    let email = divUpdate[2].value;

    let usertype = document.querySelector('.update div span .userType input:checked').id;
    // console.log(usertype);

    if(validacioEmail(email) && comprovarLongitud(name, 3, 15) && comprovarLongitud(usernam, 3, 25) && comprovarLongitud(email, 3, 25)) {
        console.log('Todos los datos son correctos');
        let datosUsuarioUpdate = JSON.parse(localStorage.getItem(usernam));
        // console.log(datosUsuarioUpdate);
    } else {
        console.log('Parece que hay un error con sus datos');
    }
}

function validacioEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email.trim())) {
        return true;
    } else {
        return false;
    }
}

function comprovarLongitud(input, min, max) {
    // let nombre = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    if(input.length < min) {
        return false;
    } else if(input.length > max) {
        return false;
    } else {
        return true;
    }
}

window.addEventListener('load', onLoad);