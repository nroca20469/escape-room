const username = document.getElementById('usernameInput'); //El nombre de usuario del input
const password = document.getElementById('passwordInput'); //La contrasenya del usuario del input
const btnLogin = document.getElementById('login');  //El boton de login

//Funcion para comprovar que el username i conresenya son correctas
function comprovarUsuario() {
    if(username.value != null && password.value != null) { //Si los dos valores estan completados/rellendaos
        let id; 
        for(let i = 0; i < localStorage.length; i++) {
            if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == username.value) {
                id=localStorage.key(i); //Recogemos el id del usuario para luego ppoder hacer todas las comprpovaciones
            }
        }

        if(id != null) { //Si el id no estavacio procedemos con las comprovaciones
            let datosUsuario = localStorage.getItem(id);  //Guardamos los datos en una variable
            let datosUsuarioJSON = JSON.parse(datosUsuario);  //Lo convertimos a JSON para una mas facil manipulacion de los elementos
            
            if(datosUsuarioJSON['estate'] == false) {  //Si el estado esta en false(no iniciado)
                 
                if(datosUsuarioJSON['password'] === password.value) {  //Comprovamos que la contrasenya sea correcta
                   
                    datosUsuarioJSON['estate'] = true; //Pasamos el estado a true
                    localStorage.setItem(id, JSON.stringify(datosUsuarioJSON));  //Guardamos el usuario, con el estado ya cambiado
                    
                    comprovarIMandar(datosUsuarioJSON['userType']);  //Lo mandamos a un tipo de pagina segun su tipo de usuario
                   
                } else {
                    document.getElementById('mensaje').innerHTML = '<p> Password incorrecta </p>';  //Mostrammos por pantalla que la contrasenya no es correcta
                }

            } else { //Si el estate esta en "true"
                document.getElementById('mensaje').innerHTML = '<p> Usuario ya iniciado </p>';  //Mostramos por pantalla que el usuario ya esta iniciado
            }

        } else {  //Si no hay un usuario que tenga el nombre de usuario
            document.getElementById('mensaje').innerHTML = "<p> Username doesn't exist or it's incorrect </p>";  //Mostramos por pantalla que el nombre de usuario no existe/incorrecto
        }
    }

}

//Funcion para mandar al usuario segun que tipo de usuario sea(admin/user)
function comprovarIMandar(usertype) {

    if(usertype == 'user') { //Si es user

        location.href = '../index.html';  //Lo mandamos a la pagina principal

    } else if (usertype == 'admin') { //Si es admin

        location.href = '../form/showAllUsers.html';  //Lo mandamos a la adminsitracion de usuarios

    }
}

//Cuando cliquen en el boton de "log in" se comprovara que el usuario exista i que los datos sean correctos
btnLogin.addEventListener('click', comprovarUsuario);  
