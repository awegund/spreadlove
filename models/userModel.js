const Sequelize = require('sequelize');
const sequelize = require('./establishPostgreConnection');
/*----------------------------------------------------------------*/ 


const User = sequelize.define('userModel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
    },
    name: Sequelize.STRING,
    locked: Sequelize.BOOLEAN
});


/*----------------------------------------------------------------*/ 
module.exports = User;