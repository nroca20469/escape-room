//Importar lev1
import lev1 from '../../json/lev1lev1exercici.json' assert { type: 'json' };
import lev1Correccion from '../../json/lev1lev1correccio.json' assert { type: 'json' };

//Importar lev2
import lev2 from '../../json/lev2lev1exercici.json' assert { type: 'json' };
import lev2Correccion from '../../json/lev2lev1correccio.json' assert { type: 'json' };

//Importar lev3
import lev3 from '../../json/lev3lev1exercici.json' assert { type: 'json' };
import lev3Correccion from '../../json/lev3lev1correccio.json' assert { type: 'json' };


export {obtenerSudoku};
function obtenerSudoku(level, index) {
    console.log('HI');
    if(level === 'lev1')  {
        let sud = {jsonSudoku: lev1[index], correccion: lev1Correccion[index]}
        console.log(sud);
        return sud;
    }

    if(level === 'lev2') {
        let sud = {jsonSudoku: lev2[index], correccion: lev2Correccion[index]}
        console.log(sud);
        return sud;
    }

    if(level === 3) {

        return function (quadricula) {
            let sud;
            if(quadricula == null) {
                sud = {jsonSudoku: lev3[index], correccion: lev3Correccion[index]};
            } else {
                sud = {jsonSudoku: lev3[index][quadricula], correccion: lev3Correccion[index]};

            }
            console.log(sud);

            return sud;
        }

        
    }

    

}