const Repository = require('../../repository/repository');
const Users = require('../../db/schema/users');

const selectAttrs = require('./selectAttributes');


class UsersService extends Repository {
}

const usersService = new UsersService(Users, selectAttrs.DEFAULT);


module.exports = usersService;
