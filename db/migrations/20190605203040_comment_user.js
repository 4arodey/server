
exports.up = knex => knex.schema.createTable('comment_user', (t) => {
  t.string('user_id')
    .notNullable();
  t.string('comment_id')
    .notNullable();
});

exports.down = (knex) => {
  knex.schema.drpTable('comment_user')
    .raw('drop extension if exists "uuid-ossp"');
};
