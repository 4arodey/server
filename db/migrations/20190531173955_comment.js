
exports.up = knex => knex.schema.createTable('comment', (t) => {
  t.string('id')
    .defaultTo(knex.raw('uuid_generate_v4()'));
  t.string('text')
    .notNullable();
  t.string('user_id')
    .notNullable()
  t.string('news_id')
    .notNullable();
  t.string('status')
    .notNullable();
  t.string('date')
    .notNullable();
});

exports.down = (knex) => {
  knex.schema.drpTable('users')
    .raw('drop extension if exists "uuid-ossp"');
};
