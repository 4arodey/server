const responseHandler = require('../responseHandler');

const commentsService = require('../services/comments/comments.service');


const knex = require('../db/knex');

const appConfig = require('../app.config');


function findAll() {
  return commentsService.findAll();
}

function findById(req) {
  return commentsService.findById(req.params.id);
}

function create(req) {
  return commentsService.create(req.body);
}

function update(req) {
  return commentsService.update(req.params.id, req.body);
}

function remove(req) {
  return commentsService.delete(req.params.id);
}

function sendCommentRoutes(app, router) {
  router.get('/all', (req, res) => {
    knex.select().from('comments').then((todos) => {
      res.send(todos);
    });
  });
  router
    .route('/comments')
    .get(responseHandler.handleSuccess(findAll))
    .post(responseHandler.postSuccess(create));
  router
    .route('/:id')
    .get(responseHandler.handleSuccess(findById))
    .put(responseHandler.handleSuccess(update))
    .post(responseHandler.handleSuccess(create))
    .delete(responseHandler.handleSuccess(remove));
  app.use('/api/v1', router);
}


module.exports = sendCommentRoutes;
