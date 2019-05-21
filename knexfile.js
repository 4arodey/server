const appConfig = require('./app.config');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: appConfig.DB_NAME,
      user: appConfig.DB_USER,
      port: appConfig.POSTGRES_PORT,
      password: appConfig.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
