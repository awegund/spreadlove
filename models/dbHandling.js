const sequelize = require('./establishPostgreConnection');
/*----------------------------------------------------------------*/ 

/*========================================================================================
                     ALLE TABELLEN AUS DB ZURÜCKLIEFERN                                 */
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


/*========================================================================================
                     TABELLEN ATTRIBUTE ZURÜCKLIEFERN                                   */
exports.colAttributes = (I_TABLENAME) => {
    return sequelize.query(`SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '` + I_TABLENAME + `';`)
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