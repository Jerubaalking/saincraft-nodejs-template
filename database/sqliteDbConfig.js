const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize(`sqlite::${__dirname}/mysqlite.db`, {
  logging: true
});
module.exports = { sequelize, Model };