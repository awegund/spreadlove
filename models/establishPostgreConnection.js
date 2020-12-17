const Sequelize = require('sequelize').Sequelize;  


// Option 1: Establish connection via URI
 const sequelize = new Sequelize(process.env.POSTGRES_URL, { 
     dialect: 'postgres' , 
     dialectOptions: { 
        // native: true, 
        ssl: {
            require: true,
            rejectUnauthorized: false
        } 
        } 
    });

module.exports = sequelize;
