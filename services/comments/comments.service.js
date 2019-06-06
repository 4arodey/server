const Repository = require('../../repository/repository');
const Comments = require('../../db/schema/comments');

const selectAttrs = require('./selectAttributes');


class CommentsService extends Repository {
}

const commentsService = new CommentsService(Comments, selectAttrs.DEFAULT);
console.log(CommentsService);

module.exports = commentsService;
