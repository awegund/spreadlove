const Sequelize = require('sequelize');
const sequelize = require('./establishPostgreConnection');
/*----------------------------------------------------------------*/ 


const Comments = sequelize.define('commentModel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ipAddress: Sequelize.STRING,
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    comment: Sequelize.STRING
});


/*----------------------------------------------------------------*/ 
module.exports = Comments;