require('dotenv/config');

exports.PORT = process.env.PORT || 3004;
exports.POSTGRES_PORT = process.env.POSTGRES_PORT || 5433;
exports.NODE_ENV = process.env.NODE_ENV;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.JWT_SECRET = process.env.JWT_SECRET;
