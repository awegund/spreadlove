const sequelize = require('./establishPostgreConnection');
/*----------------------------------------------------------------*/ 

// Tabellen zu DB zurück liefern
exports.dbTables = sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`)
                        .then(tablenames => {
                            if (tablenames.length > 0){
                                return tablenames[0];
                            }
                            console.log('Tablenames: ', tablenames);
                            return null;
                        })
                        .catch(err => {
                            console.log('Tablenames could not be fetched: ', err);
                        });


// Tabellen Spalten und Attribute zurück liefern
// exports.colAttributes = sequelize.query(`SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'userModels';`)
//                                .then(colAttr => {
//                                    if(colAttr.length > 0){
//                                        return colAttr[0];
//                                    }
//                                    console.log('keine Spaltenattribute verfügbar: ', colAttr);
//                                    return null;
//                                })
//                                .catch(err => {
//                                     console.log('Es konnten keine Spalten-Attribute geladen werden: ', colAttr);
//                                })
exports.colAttributes = (I_TABLENAME) => {

    // console.log('Input parameter: ', I_TABLENAME);
    // let qw = `SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '` + I_TABLENAME + `';`;
    sequelize.query(`SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '` + I_TABLENAME + `';`)
                .then(colAttr => {
                    if(colAttr.length > 0){
                        return colAttr[0];
                    }
                    console.log('keine Spaltenattribute verfügbar: ', colAttr);
                    return null;
                })
                .catch(err => {
                    console.log('Es konnten keine Spalten-Attribute geladen werden: ', colAttr);
                })
}