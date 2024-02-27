const btnsLogReg = document.getElementById('buttonsLogInRegister');  //Div de botones "Log in" i "Register"
const btnLogout = document.getElementById('logout');


//Variables generales
let usuario;
let id;

function recorrerLocalStorage() {
  
    let iniciado = false; //Inicializamos la variable iniciado a false(sin inicio de session)
    for(let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i)))['estate']) {  //Si hay un estate en true
            
            id = localStorage.key(i);   //Guardamos el id para lueo poderlo utilizar cuando querramos cerrar la session
            iniciado = true;            //Passamos el estado de iniciado a true
            
            btnsLogReg.style.display = "none";      //Escondemos el div de botones de registro i login
            btnLogout.style.display = "block";      //I mostramos los botones de logout
            
            if(JSON.parse(localStorage.getItem(localStorage.key(i)))['userType'] == 'admin') {
                document.getElementById('admin').style.display = "inline-block";
            }
        }
    }

    if(!iniciado) {  //Si el usuario no esta inciado
        btnsLogReg.style.display = "block";     //Los botones de login i register se mostraran
        btnLogout.style.display = "none";       //I el de logout se escondera
        if(document.getElementById('admin')) {
            document.getElementById('admin').style.display = "none";
        }
    }
}

function cerrarSession(e) {
    e.preventDefault;
    
    let datosUsuarioLS = JSON.parse(localStorage.getItem(id));  //Recogemos el usuario i lo pasamos a json
    datosUsuarioLS['estate'] = false;           //Cambiamos el estado a falso
    localStorage.setItem(id, JSON.stringify(datosUsuarioLS));   //I lo actualizamos

    location.href = '/index.html';  //Cambaimos la localizacion a index.html(la pagina principal)
}


btnLogout.addEventListener('click', cerrarSession);  //Al clicar al boton de logout, cerraremos session

window.addEventListener('load', recorrerLocalStorage);   //Al cargarse la pagina, comprovaremos que el usuario este o no inicado

