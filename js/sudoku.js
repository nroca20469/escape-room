
// Importar lev1
import lev1 from '../../json/lev1lev1exercici.json' assert { type: 'json' };
import lev1Correccion from '../../json/lev1lev1correccio.json' assert { type: 'json' };

// Importar lev2
import lev2 from '../../json/lev2lev1exercici.json' assert { type: 'json' };
import lev2Correccion from '../../json/lev2lev1correccio.json' assert { type: 'json' };

// Importar lev3
import lev3 from '../../json/lev3lev1exercici.json' assert { type: 'json' };
import lev3Correccion from '../../json/lev3lev1correccio.json' assert { type: 'json' };

// Exportar la funcion
export {obtenerSudoku};

// Funcion para obtener el sudoku dependiendo del nivel y el indice(con random)
function obtenerSudoku(level, index) {
    
    // Variable del sudoku
    let sud;

    // Si el nivel es lev1
    if(level === 'lev1')  {

        // Rellenamos la variable con el sudoku base y la correccion
        sud = {
            jsonSudoku: lev1[index], 
            correccion: lev1Correccion[index]
        };
    }

    // Si el nivel es lev2(del nivel.innerHTML)
    if(level === 'lev2') {

        // Rellenamos la variable
        sud = {
            jsonSudoku: lev2[index], 
            correccion: lev2Correccion[index]
        };    
    }

    // Si el nivel es lev3(del nivel.innerHTML)
    if(level === 3) {

        return function (quadricula) {
            // Creamos la variable 
            let sud;

            // Si la cuadricula esta vacia
            if(quadricula == null) {

                // Recogemos el sudoku general(con todas las cuadriculas)
                sud = {
                    jsonSudoku: lev3[index], 
                    correccion: lev3Correccion[index]
                };
            } else {

                // Recogemos el sudoku por quadricula
                sud = {
                    jsonSudoku: lev3[index][quadricula], 
                    correccion: lev3Correccion[index]
                };

            }
            
            // Devolvemos la variable(el objeto del sudoku)
            return sud;
        }
    }

    // Devolvemos la variable
    return sud;
}