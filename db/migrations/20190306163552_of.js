//
// exports.up = knex => knex.schema.createTable('users', (t) => {
//   t.string('id')
//     .defaultTo(knex.raw('uuid_generate_v4()'));
//   t.string('email')
//     .unique()
//     .notNullable();
//   t.string('password')
//     .notNullable();
//   t.string('firstname')
//     .notNullable();
//   t.string('lastname')
//     .notNullable();
// });
//
// exports.down = (knex) => {
//   knex.schema.drpTable('users')
//     .raw('drop extension if exists "uuid-ossp"');
// };

exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
