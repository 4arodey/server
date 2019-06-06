const responseHandler = require('../responseHandler');

const usersService = require('../services/users/users.service');

const commentsService = require('../services/comments/comments.service');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const knex = require('../db/knex');

const appConfig = require('../app.config');


function findAll() {
  return usersService.findAll();
}

function findAllComments() {
  return commentsService.findAll();
}

function findById(req) {
  return usersService.findById(req.params.id);
}

function findByIdComment(req) {
  return commentsService.findAllComments(req.params.id);
}

function create(req) {
  return usersService.create(req.body);
}

function createComment(req) {
  console.log(1);
  return commentsService.create(req.body);
}

function update(req) {
  return usersService.update(req.params.id, req.body);
}

function remove(req) {
  return usersService.delete(req.params.id);
}

function sendUserRoutes(app, router) {
  router.get('/all', (req, res) => {
    knex.select().from('comments').then((todos) => {
      res.send(todos);
    });
  });
  router
    .route('/login')
    .post((req, res, next) => passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return responseHandler.handleError(info, req, res, next);
      }

      return req.login(user, { session: false }, (error) => {
        if (error) {
          return responseHandler.handleError(err, req, res, next);
        }
        const token = jwt.sign(user, appConfig.JWT_SECRET);
        return res.json({ user, token });
      });
    })(req, res, next));
  router
    .route('/users')
    .get(responseHandler.handleSuccess(findAll))
    .post(responseHandler.postSuccess(create));
  router
    .route('/comments')
    .get(responseHandler.handleSuccess(findAllComments))
    .post(responseHandler.postSuccess(createComment));
  router
    .route('/comments/:id')
    .get(responseHandler.handleSuccess(findByIdComment));
  router
    .route('/:id')
    .get(passport.authenticate('jwt', { session: false }), responseHandler.handleSuccess(findById))
    .put(responseHandler.handleSuccess(update))
    .post(responseHandler.handleSuccess(create))
    .delete(responseHandler.handleSuccess(remove));
  app.use('/api/v1', router);
}


module.exports = sendUserRoutes;
