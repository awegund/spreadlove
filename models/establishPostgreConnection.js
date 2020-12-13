// const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');

// Option 1: Establish connection via URI
 const sequelize = new Sequelize(process.env.POSTGRES_URL, { dialect: 'postgres' });


// // Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize({
//     process.env.POSTGRES_DB, 
//     process.env.POSTGRES_USER, 
//     process.env.POSTGRES_PWD, {
//       host: process.env.POSTGRES_HOST,
//       dialect: 'postgres', 
//       SSL: true
// }});

module.exports = sequelize;
