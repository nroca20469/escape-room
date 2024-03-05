const btnHow = document.getElementById('howToPlay');

function sudoku() {
    let instrucciones = '<h3> How to play? Instrucciones: </h3><br> '+
                        '<h5> 1.- Utiliza los números del 1 al 9' +
                        '<br> 2.- No repetir ningún número' + 
                        '<br> 3.- No adivines(cada numero tiene su sitio, este juego es de razonamiento y logoca) ' +
                        '<br> 4.- Utilizar el prozeso de eliminiacion </h5> ' ;
    return instrucciones;
}

function anagramas() {
    let instrucciones = '<h3> How to play? Instrucciones: </h3><br>' +
                        '<h5> Consigue la palabra desordenada clicando sobre las letras de la izquierda, estas se colocaran en el cuadrado de la derecha <br>' +
                        'Para comprovar si una palabra es correcta, clique en "Check" <br>' + 
                        'Si no sabe cual puede ser la palabra, clique en la bombillita/luz de la derecha de esa palabra. </h5>';
    return instrucciones;
}

function matematicos() {
    let instrucciones = '<h3> How to play? Instrucciones: </h3><br>' +
                        '<h5> Encuentra la solucion es estas operaciones de imagenes, cada imagen tiene su valor propio <br>' +
                        ' Clica en "Check" para comprovar si sus soluciones son correctas, para tener pistas, clicar en el boton de "Pista" <br>'
                        'Cada valor correcto valo 100 puntos, mientras que las incorrectas quitan 30 puntos </h5>';

    return instrucciones;
}

function advinanzasMatematicas() {
    let instrucciones = '<h3> How to play? Instrucciones: </h3><br>' +
                        '<h5> Leer la pregunta, pensar y buscar la respuesta correcta. Las respuestas son de logica matematica. Las pistas, si no se sabe matematicas no serviran de nada, asi que si no se sabe, hacer aleatorio.' +
                        'Las pistas son sencillas en algunas y formulas para resolver en otras. </h5>';

    return instrucciones;
    
}

function laberinto() {
    let instrucciones = '<h3> How to play? Instrucciones: </h3><br>' +
                        '<h5> Hay dos maneras de jugar: <br>' +
                        '    1.- "ASDW": Parte superior izquierda del teclado donde W = arriba, A = izquierda, S = abajo y D = derecha <br>' +
                        '    2.- Flechas de la parte derecha infertior del teclado(moverse con ellas) ' + 
                        ' <br> Para moverse por el tablero, simplemente mover con las flechas/letras indicadas</h5>';
    return instrucciones;
}

function crucigrama() {
    let instrucciones = '<h4> How to play? Instrucciones: </h4><br>' + 
                        '<h5> Ver informacion de palabra: </h5>' + 
                        '<small> Clicar en "Ver", si esta en la 1a columna, se mostrara la definicion de la palabra horizontal propia, si esta en 1a linia, se mostrara la definicion de la palabra horizontal</small>' +
                        '<br><br><h5> Escribir letras en tablero </h5>' + 
                        '<small> Escribir directamaente en los cuadrados en marron(Los grises no son de escritura) </small>' + 
                        '<br><br><h5> Comprovar i guardar partida </h5>' + 
                        '<small> Para poder guardar la partida, debe estar iniciado, si esta iniciado, clicar en el boton "Save", si no esta iniciado y aparece el boton, este no hara nada<br> Para comprovar las palabras/letras, clicar en "Check", entonces se actualizara la puntuacion y las faltas</small><br>';


    return instrucciones;
}

btnHow.addEventListener('click', ()=> {
    document.getElementById('modal').className = "open";
    let modal =  document.getElementById('contenido-modal');
    let instrucciones;
    modal.innerHMTL = null;

    if(document.getElementById('table1')) {
        instrucciones = sudoku();  //Nivel 1.1, 2.1, 3.1, 3.1.1, 3.1.2, 3.1.3, 3.1.4, 3.1.4
    } else if(document.getElementById('palabras')) {
        instrucciones = anagramas();  //Nivel 1.2
    } else if(document.querySelector('#tabla #fila1')) {
        instrucciones = matematicos();   //Nivel 1.3
    } else if(document.querySelector('#juego1 #titulo')) {
        instrucciones = advinanzasMatematicas();  //Nivel 2.2
    } else if(document.getElementById('laberinto')) {
        instrucciones = laberinto();  //Nivel 2.3 y 3.3
    } else if(document.getElementById('tablero')) {
        instrucciones = crucigrama();
    }

    // Rellenar modal
    modal.innerHTML = '<div>' + instrucciones + '<br><button id="modalClose"> Close </button></div>';

    // Para cerrar el modal
    const btnClose = document.getElementById('modalClose');  //Recogemos el boton de close
    btnClose.addEventListener('click', () => {
        document.getElementById('modal').className = "close";  //Cambiamos clase a close(ccerrara el modal con css)
    })

});