require('dotenv/config');
const appConfig = require('../app.config');

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: appConfig.DB_NAME,
    user: appConfig.DB_USER,
    password: appConfig.DB_PASS,
    port: appConfig.POSTGRES_PORT,
  },
});

module.exports = knex;
