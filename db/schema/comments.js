const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Comments extends Model {
  static get tableName() {
    return 'comment';
  }
}

module.exports = Comments;
