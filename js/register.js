
// Constantes del formulariosç
const userName = document.getElementById('name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatedPassword');
const btnRegister = document.getElementById('btnRegister');

// Tipo de usuario
let userType = null;

// Funcion para comprovar el formulario
function comprovarFormulario(e) {
    e.preventDefault();  

    // Si al comprovar los inputs es 5(contador de inputs rellenados)
    if(comprovarInputs([userName, username, email, password, repeatPassword]) == 5) {

        // Recogemos el tipo de usuario
        if(document.getElementById('admin').checked) {
            userType = 'admin';
        } else if(document.getElementById('user').checked) {
            userType = 'user';
        } else {
            userType = null;
        }

        // Comprovamos que la longuitud de todos los inputs tenga un minimo
        let checkUserName = comprovarLongitud(userName, 3, 15);
        let checkUsername = comprovarLongitud(username, 3, 25);
        let checkEmail = comprovarLongitud(email, 3, 25);
        let checkPassword = comprovarLongitud(password, 6, 18);

        // Si todo tiene una longuitud minima
        if(checkUserName && checkEmail && checkPassword && checkUsername) {

            // Validacion de email, contraseñas y que las contraseñas sean iguales
            let valEmail = validacioEmail(email);
            let validacioContrasenya = validacioContrasena(password);
            let contrasenyes = comprovarContrasenyes(password, repeatPassword);
            
            // Si todo es valido y las contrasñas son iguales
            if(contrasenyes && valEmail && validacioContrasenya) {
                
                // I el tipo de usuario no esta vacio
                if(userType != null) {

                    // Si el usuario no existe
                    if(comprovarExistencia() == false){
                        registrarUsuari();  // Registramos el usuario en el LS
                    } 
                }
            }
        }
    }
}

// Funcion para comprovar si el usuario existe en el LS
function comprovarExistencia() {

    // Variable para id
    let id; 

    // Buscamos en el LS con bucle
    for(let i = 0; i < localStorage.length; i++) {

        // Si hay un usuario con el mismo valor del nombre de usuario que queremos crear
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == username.value) {

            // Guardamos el id de ese usuario
            id=localStorage.key(i);
        
        }
    }

    // Si el id esta vacio, devolvemos true, sino false
    return localStorage.getItem(id) != null ? true : false; 
}

// Funcion para comprovar si las contraseñas son iguales 
function comprovarContrasenyes(password1, password2) {

    // Si las contraseñas son iguales
    if(password1.value === password2.value) {

        return true;    // Devolvemos que las contraseñas son iguales
    
    } else {    // Si las contraseñas no son iguales

        // Mostramos el error de que las contraseñas no son iguales
        mostrarError(password1, 'Les dues contraseñes no son iguales');
        return false;       // Devolvemos que las contraseñas no son iguales

    }
}

// Funcion de validacion de contraseña con regex
function validacioContrasena(password) {

    // Recogemos el regex para validar la contraseña
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if(re.test(password.value.trim())) {       // Si el regex testea la contraseña corretamente
        return true;                        // Devolvemos que la contraseña es valida
    } else {        // Si el regex no lo valida
        return false;   // Devolvemos que la contraseña no es valida
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

    // Recogemos el nombre del input i lo ponemos en mayuscula la letra del principio
    let nombre = input.id.charAt(0).toUpperCase() + input.id.slice(1);

    // Si el input tiene una medida mas baja de lo que toca
    if(input.value.length < min) {

        // Mostramos error de que no cumple con la longuitud minima
        mostrarError(input, nombre + " no cumple con la medida minima");
        return false;       // I devolvemos que no cumple con los parametros minimos
    
    } else if(input.value.length > max) {       // Si el input tiene una longuitud superior a la maxima
    
        // Mostramos un error de que no cumple con la longuitud maxima
        mostrarError(input, nombre + " no cumple con la medida maxima");
        return false;       // Devolvemos que la longuitud no es correcta
    
    } else {
    
        return true;        // Devolvemos que la longuitud del input es correca
    
    }
}

// Funcion para comprovar que todos los inputs tienen algun valor
function comprovarInputs(array) {

    // Creamos un contador de inputs
    let contadorCorrecte = 0;

    // Recorremos el array de inputs
    array.forEach((input) => {

        // Comprovamos que el string no este vacio(tmb se podria comprovar con X.length == 0)
        if(input.value.trim() === ''){
            
            // Mostramos que el input es obligatorio
            mostrarError(input, 'El camp es obligatori');

        } else {        // Si el input no esta vacio

            // Quitamos el error del input(por si antes estaba)
            llevarError(input);
            contadorCorrecte++; // Subimos el contador de inputs

        }
    });

    // Devolvemos el contador de inputs rellenados
    return contadorCorrecte;

}

// Funcion para quitar el error de la pantalla
function llevarError(input) {

    // Recogemos el parent(div parent), i recogemos de ese parent, el small(donde mostramos el error)
    const parentDiv = input.parentElement;
    const small = parentDiv.querySelector('small'); 

    // I escondemos ese small
    small.style.display = "none";

}

// Funcion para mostrar el error
function mostrarError(input, missatge) {

    // Recogemos el parent(div parent), i recogemos de ese parent, el small(donde mostramos el error)
    const parentDiv = input.parentElement;
    const small = parentDiv.querySelector('small');

    small.innerText = missatge;     // Mostramos el mensaje por pantalla en el small
    small.style.display = "block";  // Hacemos visible el small

}

// Funcion para registrar el usuario(definitivo al LS)
function registrarUsuari() {

    // Creamos el json del usuario con toda la informacion
    let jsonUsuario = {
        name: userName.value,
        username: username.value,
        email: email.value,
        estate: true,
        password: password.value,
        userType: userType,
        gameEstate: [{
           map1: [{
                level1: {
                    estate: null,
                    time: null,
                    faults: null,
                    savedGame: [],
                    puntuacion: null
                },
                level2: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                },
                level3: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                }
            }],
            map2: [{
                level1: {
                    estate: null,
                    time: null,
                    faults: null,
                    savedGame: [],
                    puntuacion: null
                },
                level2: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                },
                level3: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                }
            }],
            map3: [{
                level1: {
                    estate: null,
                    time: null,
                    faults: null,
                    savedGame: [],
                    puntuacion: null
                },
                level2: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                },
                level3: {
                    estate: null,
                    time: null,
                    faults: null,
                    puntuacion: null
                }
            }]
        }]
    };

    //Si una de las dos es diferete, actualizamos
    localStorage.setItem(localStorage.length, JSON.stringify(jsonUsuario));  
   
    // Segun el tipo de usuario, lo mandamos al indice, o a mostrar todos los usuarios
    if(userType == 'user') {
        location.href = '../index.html';
    } else if (userType == 'admin') {
        location.href = '../form/showAllUsers.html';
    }

}

// Evento al clicar el boton de registrarse
btnRegister.addEventListener('click', comprovarFormulario);