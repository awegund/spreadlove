const Sequelize = require('sequelize');
const sequelize = require('./establishPostgreConnection');
/*----------------------------------------------------------------*/ 


const News = sequelize.define('newsModel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    newsHeader: Sequelize.STRING,
    newsText: Sequelize.STRING,
    mimetype: Sequelize.STRING,
    picture: Sequelize.BLOB()
});


/*----------------------------------------------------------------*/ 
module.exports = News;