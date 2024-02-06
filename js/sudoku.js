import lev1 from '../../json/lev1lev1exercici.json' assert { type: 'json' };
import lev1Correccion from '../../json/lev1lev1correccio.json' assert { type: 'json' };

// import lev2 from '../../json/lev3lev1exericis.json' assert { type: 'json' };
import lev3 from '../../json/lev3lev1exercici.json' assert { type: 'json' };
import lev3Correccion from '../../json/lev3lev1correccio.json' assert { type: 'json' };


export {obtenerSudoku};
function obtenerSudoku(level, index) {
    console.log('HI');
    if(level === 1)  {
        let sud = {jsonSudoku: lev1[index], correccion: lev1Correccion[index]}
        console.log(sud);
        return sud;
    // } else if(level === 3) {
    //     console.log(lev2);
    //     let sud = {jsonSudoku: lev1[index], correccion: lev1Correccion[index]}
    //     return sud;
        
    // } else if(level === 3) {
    //     console.log(lev3);
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