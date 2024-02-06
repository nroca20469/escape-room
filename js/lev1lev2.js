const arrayOrdenado = ['cara', 'lacteo', 'castor', 'seto', 'lobo', 'gato', 'nacion', 'amor', 'lapicero', 'blanco'];
const arrayAnagramas = ['arca', 'coleta', 'castro', 'esto', 'bolo', 'toga', 'canino', 'roma', 'copiarle', 'balcon'];
const arrayPistas = ['Pieza donde se guarda el dinero en las tesorerías.', 'Mechón de cabello entretejido o suelto, sujeto con un lazo o goma, que se hace en la cabeza.', 
'Poblado fortificado en la Iberia romana.', 'Lo que está unido o próximo a mí o a nosotros.',
' Juego que consiste en derribar con bolas diez bolos colocados en el suelo.', ' Manto de mucho vuelo que constituía la prenda principal exterior del traje de los antiguos romanos.',
'Del perro o relativo a él.', 'Que carece de punta o filo.',
'Escribir lo que dice otro en un discurso o dictado:', 'Hueco abierto en la fachada de un edifico desde el suelo de la habitación, que se prolonga al exterior y está protegido con una barandilla.']


const divContainer = document.getElementById('container');

function eleccionAnagramas() {
    let nPalabras = 0;
    let rand = Math.floor(Math.random() * arrayOrdenado.length);
    let algo = null;
    while(nPalabras < 3) {
        rand = Math.floor(Math.random() * arrayOrdenado.length);
        if(nPalabras == 0) {
            algo = "{" + '"palabra1": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
        } else if(nPalabras == 1) {
            algo += ',"palabra2": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]';
        } else {
            algo += ',"palabra3": ["' + arrayOrdenado[rand] + '","' + arrayAnagramas[rand] + '","' + rand + '"]}';
        }
        nPalabras++;
    }

    return algo;
}

function colocarPorPantalla(anagrama, namePalabra) {
    console.log(anagrama);
    let palabra = anagrama[0].split("");
    
    divContainer.innerHTML += `<div id="${namePalabra}"></div><div class="${namePalabra}"></div>`;

    palabra.forEach((letra, index) => {
        const nombre = document.getElementById(namePalabra);
        nombre.innerHTML += '<button id="btnLetra">' + letra + '</button>';
    });
    console.log(palabra);
}

window.addEventListener('load', () => {
    let anagramas = eleccionAnagramas();

    colocarPorPantalla(JSON.parse(anagramas).palabra1, 'palabra1');
    colocarPorPantalla(JSON.parse(anagramas).palabra2, 'palabra2');
    colocarPorPantalla(JSON.parse(anagramas).palabra3, 'palabra3');
})