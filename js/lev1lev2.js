const arrayOrdenado = ['cara', 'lacteo', 'castor', 'seto', 'lobo', 'gato', 'nacion', 'amor', 'lapicero', 'blanco'];
const arrayAnagramas = ['arca', 'coleta', 'castro', 'esto', 'bolo', 'toga', 'canino', 'roma', 'copiarle', 'balcon'];
const arrayPistas = ['Pieza donde se guarda el dinero en las tesorerías.', 'Mechón de cabello entretejido o suelto, sujeto con un lazo o goma, que se hace en la cabeza.', 
'Poblado fortificado en la Iberia romana.', 'Lo que está unido o próximo a mí o a nosotros.',
' Juego que consiste en derribar con bolas diez bolos colocados en el suelo.', ' Manto de mucho vuelo que constituía la prenda principal exterior del traje de los antiguos romanos.',
'Del perro o relativo a él.', 'Que carece de punta o filo.',
'Escribir lo que dice otro en un discurso o dictado:', 'Hueco abierto en la fachada de un edifico desde el suelo de la habitación, que se prolonga al exterior y está protegido con una barandilla.']

const divContainer = document.getElementById('container');
let anagramas; //Donde se guardara el json con los anagramas
let intentos = 0;
let correctas = 0;
let puntuacion = 0;
let idJugador; //ID del jugador


const btnCheck = document.getElementById('check');
const btnSave = document.getElementById('save');

function eleccionAnagramas() {
    let nPalabras = 0;
    let rand = Math.floor(Math.random() * arrayOrdenado.length);
    let algo = null;
    let random1 = null; 
    let random2 = null;
    let random3 = null;

    while(nPalabras < 3) {
        rand = Math.floor(Math.random() * arrayOrdenado.length);
        if(nPalabras == 0) {
            algo = "{" + '"palabra1": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
            random1 = arrayOrdenado[rand];
            nPalabras++;
        } else if(nPalabras == 1 && random1 != arrayOrdenado[rand]) {
            algo += ',"palabra2": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
            random2 = arrayOrdenado[rand];
            nPalabras++;
        } else if(random2 != arrayOrdenado[rand] && random1 != arrayOrdenado[rand]){
            algo += ',"palabra3": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]}';
            nPalabras++;
        }
        
    }

    return algo;
}

function colocarPorPantalla(anagrama, namePalabra) {
    // console.log(anagrama);
    let palabra = anagrama[0].split("");
    
    palabra.forEach((letra, index) => {
        const nombre = document.getElementById(namePalabra);
        nombre.innerHTML += '<button id="btnLetra" onclick="comprovarLetra(this)">' + letra + '</button>';
    });
       
}

function comprovarLetra(e) {
    
    if(e.parentNode.id) {
        let divSibling = document.querySelector('.' + e.parentNode.id);
        divSibling.innerHTML += '<button id="btnLetra" onClick="devolverLetra(this);">' + e.innerHTML + '</button>';
    } 
    e.remove();
}

function devolverLetra(e) {
    e.style.display = "none";
    let divSibling = document.getElementById(e.parentNode.className);
    divSibling.innerHTML += '<button id="btnLetra" onclick="comprovarLetra(this);">' + e.innerHTML + '</button>';
    e.remove();
}

function comprovarPalabra(id) {
    let palabra = JSON.parse(anagramas)[id][1];
    let htmlAlgo =  document.getElementsByClassName(id)[0];
    console.log(htmlAlgo);
    let palabraEscrita = "";
    for(let i = 0; i < htmlAlgo.children.length; i++) {
        palabraEscrita += htmlAlgo.children.item(i).innerText;
    }

    return palabraEscrita;
} 

function mostrarPista(pal) {
    let posicion = JSON.parse(anagramas)[pal][2];
    console.log(arrayPistas[posicion]);

    document.getElementById('modal').className = "open";

    document.getElementById('mensaje-modal').innerHTML = arrayPistas[posicion];
    document.getElementById('sure').style.display = "block";
}

function closeModal() {
    document.getElementById('modal').className = "close";
}

function recorrerPalabra(div) {
    let palabra = "";
    div.childNodes.forEach((item) => {
        palabra+=item.innerHTML;
    });
    return palabra;
}

function comprovarPalabra(json) {
    if(json.length > 0) {
        console.log(json);
        json = JSON.parse(json);
        console.log(json.palabra1);
        if(json.palabra1) {
            if(JSON.parse(anagramas).palabra1[1] !== json.palabra1.actual){
                if (document.querySelector('div.pal1').innerHTML.length == 0) {
                    document.querySelector('div.pal1').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra1.actual} </h3>`;
                }else {
                    //Comprovar que las palabras previamente entradas no son las mismas
                    let diferentes = false;
                    document.querySelectorAll('div.pal1 p').forEach((item, index) => {
                        item = item.innerHTML.split("> ")[1];
                        console.log(item);
                        if(item == json.palabra1.actual+" ") {
                            diferentes = true;
                        }
                    });
                    if(!diferentes) {
                        document.querySelector('div.pal1').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra1.actual} </h3>`;
                    }
                }
                intentos++;
            } else {
                document.getElementById('correctas').innerHTML += `<p><img src="../../../iconos/hand-thumbs-up-fill.svg" id="thumbUp"></img> ${json.palabra1.actual} </h3>`;
                document.getElementById('palabra1').parentElement.parentNode.remove();
                correctas++;
            }
            console.log('Palabra1');
        } 
        
        if(json.palabra2) {
            if(JSON.parse(anagramas).palabra2[1] !== json.palabra2.actual){
                if (document.querySelector('div.pal2').innerHTML.length == 0) {
                    document.querySelector('div.pal2').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra2.actual} </h3>`;
                }else {
                    //Comprovar que las palabras previamente entradas no son las mismas
                    let diferentes = false;
                    document.querySelectorAll('div.pal2 p').forEach((item, index) => {
                        item = item.innerHTML.split("> ")[1];
                        console.log(item);
                        if(item == json.palabra2.actual+" ") {
                            diferentes = true;
                        }
                    });
                    if(!diferentes) {
                        document.querySelector('div.pal2').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra2.actual} </h3>`;
                    }
                }
                intentos++;
            } else {
                document.getElementById('correctas').innerHTML += `<p><img src="../../../iconos/hand-thumbs-up-fill.svg" id="thumbUp"></img> ${json.palabra2.actual} </h3>`;
                document.getElementById('palabra2').parentElement.parentNode.remove();
                correctas++;
            }
            console.log('Palabra2');
        } 
        
        if(json.palabra3) {
            if(JSON.parse(anagramas).palabra3[1] !== json.palabra3.actual){
                if (document.querySelector('div.pal3').innerHTML.length == 0) {
                    document.querySelector('div.pal3').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra3.actual} </h3>`;
                }else {
                    //Comprovar que las palabras previamente entradas no son las mismas
                    let diferentes = false;
                    document.querySelectorAll('div.pal3 p').forEach((item, index) => {
                        item = item.innerHTML.split("> ")[1];
                        console.log(item);
                        if(item == json.palabra3.actual+" ") {
                            diferentes = true;
                        }
                    });
                    if(!diferentes) {
                        document.querySelector('div.pal3').innerHTML += `<p><img src="../../../iconos/download.svg"></img> ${json.palabra3.actual} </h3>`;
                    }
                }
                intentos++;
            } else {
                document.getElementById('correctas').innerHTML += `<p><img src="../../../iconos/hand-thumbs-up-fill.svg" id="thumbUp"></img> ${json.palabra3.actual} </h3>`;
                document.getElementById('palabra3').parentElement.parentNode.remove();
                correctas++;
            }
            console.log('Palabra2');
        } 
        if(intentos > 0) {
            document.getElementById('intentos').style.display="block";
        }
        if(correctas> 0) {
            document.getElementById('correcto').style.display="block";
        }
    }
}

function devolverNombreiPalabras(item) {
    let nombre, palabraOriginal, palabraDerecha;

    item.childNodes.forEach((item, index) => {
                
        if(index % 2 == 1) {

            if(item.childNodes[1].id.length > 0) {
                nombre = item.childNodes[1].id;
                palabraOriginal = JSON.parse(anagramas)[nombre][0];
            }
            if(item.childNodes[1].className.length > 0) {
                palabraDerecha = recorrerPalabra(item.childNodes[1]);

            }
        }
    });

    return [{'nombre': nombre}, {'palabraOriginal': palabraOriginal}, {'palabraDerecha': palabraDerecha}];
}

function devolverPalabras(nombre, palabraOriginal, palabraDerecha) {
    let palabras = "";
    if(palabras.length <= 1) {
        palabras = '"' + nombre + '":' + 
            '{"original": "' +  palabraOriginal + '",' +
            '"actual": "' + palabraDerecha + '"}';
    } else {
        palabras =', "' + nombre + '": {"original": "' +  palabraOriginal + '",' +
            '"actual": "' + palabraDerecha + '"}';
    }

    console.log(palabras);
    return palabras;
}

function actualizarFaltas() {
    const inputFaltas = document.querySelector('#faltas a');
    inputFaltas.innerText = +intentos;
    console.log(inputFaltas);
}

function actualizarPuntuacion() {
    const punt = document.querySelector('#puntuacion a');

    puntuacion = (100*correctas) - (20*intentos);

    punt.innerText = puntuacion;
    console.log(punt.innerHTML);
}

function recogerPalabra(palabra) {
    let palabraIzquierda = "", palabraDerecha = "";
    document.getElementById(palabra).childNodes.forEach((item) => {
        palabraIzquierda += item.innerText;
    });

    document.querySelector('.'+palabra).childNodes.forEach((item) => {
        palabraDerecha += item.innerText;
    });

    return [palabraIzquierda, palabraDerecha];
}

function intentosActuales() {
    let intentosPalabra1 = "[";
    document.querySelector('.pal1').childNodes.forEach((items, index) => {
        if(index == 0) {
            let item = items.innerText.split(' ');
            intentosPalabra1 += '"' + item[1] + '"';
        } else {
            let item = items.innerText.split(' ');
            intentosPalabra1 += ", " + '"' + item[1] + '"';
        }
        
    });
    intentosPalabra1 += "]";

    let intentosPalabra2 = "[";
    document.querySelector('.pal2').childNodes.forEach((items, index) => {
        if(index == 0) {
            let item = items.innerText.split(' ');
            intentosPalabra2 += '"' + item[1] + '"';
        } else {
            let item = items.innerText.split(' ');
            intentosPalabra2 += ", " + '"' + item[1] + '"';
        }
    });
    intentosPalabra2 += "]";

    let intentosPalabra3 = "[";
    document.querySelector('.pal3').childNodes.forEach((items, index) => {
        if(index == 0) {
            let item = items.innerText.split(' ');
            intentosPalabra3 += '"' + item[1] + '"';
        } else {
            let item = items.innerText.split(' ');
            intentosPalabra3 += ", " + '"' + item[1] + '"';
        }
    });
    intentosPalabra3 += "]";

    return [intentosPalabra1, intentosPalabra2, intentosPalabra3];
}

function jsonEstadoActual() {

    let [izquierdaP1, derechaP1] = recogerPalabra('palabra1');
    let [izquierdaP2, derechaP2] = recogerPalabra('palabra2');
    let [izquierdaP3, derechaP3] = recogerPalabra('palabra3');

    let [intentosP1, intentosP2, intentosP3] = intentosActuales();

    intentosP1 = (intentosP1.length != 0) ? intentosP1 : null;
    intentosP2 = (intentosP2.length != 0) ? intentosP2 : null;
    intentosP3 = (intentosP3.length != 0) ? intentosP3 : null;

    let jsonActual = {
        "palabra1": {
            "original": JSON.parse(anagramas).palabra1[0],
            "izquierda": izquierdaP1,
            "derecha": derechaP1,
            "intentosActuales": JSON.parse(intentosP1),
            "correctas": JSON.parse(anagramas).palabra1[1]
        },
        "palabra2": {
            "original": JSON.parse(anagramas).palabra2[0],
            "izquierda": izquierdaP2,
            "derecha": derechaP2,
            "intentosActuales": JSON.parse(intentosP2),
            "correctas": JSON.parse(anagramas).palabra2[1]
        },
        "palabra3": {
            "original": JSON.parse(anagramas).palabra3[0],
            "izquierda": izquierdaP3,
            "derecha": derechaP3,
            "intentosActuales": JSON.parse(intentosP3),
            "correctas": JSON.parse(anagramas).palabra3[1]
        },
    };
     
    return (jsonActual);
}

function actualizarEstado(actual) {
   

    let tiempo = document.querySelector('#tiempo a').innerText;
    let intentos = document.querySelector('#faltas a').innerText;
    let puntuacion = document.querySelector('#puntuacion a').innerText;

    let user = JSON.parse(localStorage.getItem(id));
    user.gameEstate[0].map1[0].level2 = {
        'estate': 'intento', 
        'time': tiempo, 
        'faults': intentos,
        'puntuacion': puntuacion,
        'estadoActual': actual
    };

    //Actualizar a localStorage
    localStorage.setItem(idJugador, JSON.stringify(user));
    
    console.log(user);
}

function recogerUsuario() {
    for(let i = 0; i < localStorage.length; i++) {
        console.log(i);
        if(JSON.parse(localStorage.getItem(i))) {
            if(JSON.parse(localStorage.getItem(i)).estate){
                idJugador = i;
            }
        }
    }
}

btnSave.addEventListener('click',  () => {
    let jsonActual = jsonEstadoActual();
    actualizarEstado(jsonActual);
});

btnCheck.addEventListener('click', () => {

    let palabras = "{";

    //Array de palabras 
    document.querySelector('table tbody').childNodes.forEach((item, index) => {
        let nombre = "";
        let palabraOriginal = "";
        let palabraDerecha = "";

        if(document.getElementById('palabra1')) {
            if(index % 2 == 0){
                //Para el 1r valor(nombre del div + palabra)    +   recogemos los valores de las palabras
                [nombre, palabraOriginal, palabraDerecha] = [devolverNombreiPalabras(item)[0].nombre, devolverNombreiPalabras(item)[1].palabraOriginal, devolverNombreiPalabras(item)[2].palabraDerecha]
    
            }

            if(palabraDerecha.length > 0 ) {

                if(palabras.length > 1) {
                    palabras += ", " + devolverPalabras(nombre, palabraOriginal, palabraDerecha);
                } else {
                    palabras += devolverPalabras(nombre, palabraOriginal, palabraDerecha);
                }    
            }

        } else{
            if(item.childNodes.length > 0) {
                //Recogemos los valores de las palabras
                [nombre, palabraOriginal, palabraDerecha] = [devolverNombreiPalabras(item)[0].nombre, devolverNombreiPalabras(item)[1].palabraOriginal, devolverNombreiPalabras(item)[2].palabraDerecha]
            }

            if(palabraDerecha.length > 0 ) {
                if(palabras.length > 1) {
                    palabras += ", " + devolverPalabras(nombre, palabraOriginal, palabraDerecha);
                } else {
                    palabras += devolverPalabras(nombre, palabraOriginal, palabraDerecha);
                }
            }
        }
    }); 
    palabras += '}';

    comprovarPalabra(palabras);

    actualizarFaltas();
    actualizarPuntuacion();
})

window.addEventListener('load', function () {
    recogerUsuario();    

    //Comprovar que el usaurio no tenga partida ya guardada
    let estadoActualNivel = JSON.parse(localStorage.getItem(idJugador)).gameEstate[0].map1[0].level2;
console.log(estadoActualNivel);
    if(estadoActualNivel.estate == 'intento' || estadoActualNivel.estate == 'done') {
        console.log('HI');
        document.querySelector('#faltas a').innerText = estadoActualNivel.faults;
        document.querySelector('#puntuacion a').innerText = estadoActualNivel.puntuacion;
    }
    console.log(estadoActualNivel);


    anagramas = eleccionAnagramas();

    colocarPorPantalla(JSON.parse(anagramas).palabra1, 'palabra1');
    colocarPorPantalla(JSON.parse(anagramas).palabra2, 'palabra2');
    colocarPorPantalla(JSON.parse(anagramas).palabra3, 'palabra3');

    document.getElementById('intentos').style.display= "none";
    document.getElementById('correcto').style.display= "none";

});