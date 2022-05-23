const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////

// database 是 Sequelize class 的實例(實體, instance) 
const database = new Sequelize('new-demo', 'root', 'test02193230', {
    dialect: 'mysql', 
    host: 'localhost'
});

// const database = new Sequelize ('cart-demo', 'admin', 'admin', {
// 	dialect: 'mysql',
// 	host: '130.211.120.155'
// });

module.exports = database;