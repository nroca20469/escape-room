/* FALTA MIRAR SI LAS CONTRASENYAS SE COMPARAN CORRECTAMENTE Y 
    AÑADIR EL REGEX DE LA CONTRASEÑA
    
    - MIRAR COMO CREAR Y GUARDAR LA INFORMACION, ADEMAS DE SABER SI ESTA O NO CONECTADO
        PARA SABER QUE BOTONES O NO MOSTRAR Y QUE PAGINAS PUEDE VISITAR*/

const userName = document.getElementById('name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatedPassword');
const btnRegister = document.getElementById('btnRegister');

let userType = null;
function comprovarFormulario(e) {
    e.preventDefault();
    if(comprovarInputs([userName, username, email, password, repeatPassword]) == 5) {
        console.log('Comprovar inputs dintre' );
        if(document.getElementById('admin').checked) {
            userType = 'admin';
        } else if(document.getElementById('user').checked) {
            userType = 'user';
        } else {
            userType = null;
        }

        let checkUserName = comprovarLongitud(userName, 3, 15);
        let checkUsername = comprovarLongitud(username, 3, 25);
        let checkEmail = comprovarLongitud(email, 3, 25);
        let checkPassword = comprovarLongitud(password, 6, 18);

        if(checkUserName && checkEmail && checkPassword && checkUsername) {
            console.log('check inputs dintre' );
            let valEmail = validacioEmail(email);
            let validacioContrasenya = validacioContrasena(password);
            console.log(password.value, repeatPassword.value);
            let contrasenyes = comprovarContrasenyes(password, repeatPassword);
            
            console.log(contrasenyes, valEmail, validacioContrasenya);
            if(contrasenyes && valEmail && validacioContrasenya) {
                console.log('Comprovar contrasenyes dintre' );
                if(userType != null) {
                    console.log('Comprovar usertype dintre' );
                    console.log(comprovarExistencia());
                    if(comprovarExistencia() == false){
                        console.log('Comprovar existencia dintre' );
                        registrarUsuari();
                    } else {
                        console.log('Nombre de usuario existente');
                    }
                    
                }
            }
        }
        
    }
}

function comprovarExistencia() {
    // console.log(localStorage.getItem(username.value));
    let id; 
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['username'] == username.value) {
            id=localStorage.key(i);
        }
    }
    return localStorage.getItem(id) != null ? true : false; 
}

function comprovarContrasenyes(password1, password2) {
    if(password1.value === password2.value) {
        return true;
    } else {
        mostrarError(password1, 'Les dues contraseñes no son iguales');
        return false;
    }
}

function validacioContrasena(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(re.test(password.value.trim())) {
        return true;
    } else {
        return false;
    } 
}

function validacioEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email.value.trim())) {
        return true;
    } else {
        mostrarError(email, 'El formato de su email no es correcto');
        return false;
    }
}

function comprovarLongitud(input, min, max) {
    let nombre = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    if(input.value.length < min) {
        mostrarError(input, nombre + " no cumple con la medida minima");
        return false;
    } else if(input.value.length > max) {
        mostrarError(input, nombre + " no cumple con la medida maxima");
        return false;
    } else {
        return true;
    }
}

function comprovarInputs(array) {
    let contadorCorrecte = 0;
    array.forEach((input) => {
        if(input.value.trim() === ''){
            mostrarError(input, 'El camp es obligatori');
        } else {
            llevarError(input);
            contadorCorrecte++;
        }
    });
    return contadorCorrecte;
}

function llevarError(input) {
    const parentDiv = input.parentElement;
    const small = parentDiv.querySelector('small'); 
    small.style.display = "none";
}

function mostrarError(input, missatge) {
    const parentDiv = input.parentElement;
    const small = parentDiv.querySelector('small');
    small.innerText=missatge;
    small.style.display = "block";
}

function registrarUsuari() {
   let jsonUsuario = {
        name: userName.value,
        username: username.value,
        email: email.value,
        estate: true,
        password: password.value,
        userType: userType,
        gameEstate: [{
            "map1": [{
                "level1": {
                    "estate": null,
                    "time": null,
                    "faults": null,
                    "savedGame": []
                },
                "level2": {
                    "estate": null,
                    "time": null,
                    "faults": null
                },
                "level3": {
                    "estate": null,
                    "time": null,
                    "faults": null
                }
            }],
            "map2": [{
                "level1": {
                    "estate": null,
                    "time": null,
                    "faults": null,
                    "savedGame": []
                },
                "level2": {
                    "estate": null,
                    "time": null,
                    "faults": null
                },
                "level3": {
                    "estate": null,
                    "time": null,
                    "faults": null
                }
            }],
            "map3": [{
                "level1": {
                    "estate": null,
                    "time": null,
                    "faults": null,
                    "savedGame": []
                },
                "level2": {
                    "estate": null,
                    "time": null,
                    "faults": null
                },
                "level3": {
                    "estate": null,
                    "time": null,
                    "faults": null
                }
            }]
        }]
    };

   localStorage.setItem(localStorage.length, JSON.stringify(jsonUsuario));  //Si una de las dos es diferete, actualizamos


    console.log('user registered');
   
    if(userType == 'user') {
        location.href = '../index.html';
    } else if (userType == 'admin') {
        location.href = '../form/showAllUsers.html';
    }
}























btnRegister.addEventListener('click', (e) => {
    comprovarFormulario(e);
});