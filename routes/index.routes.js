const usersRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const commentRoutes = require('./comment.routes');
const responseHandler = require('../responseHandler');

function sendRoutes(app, router) {
  usersRoutes(app, router);
  authRoutes(app, router);
  commentRoutes(app, router);
  app.get('/ping', responseHandler.handleSuccess(() => ({})));
}

module.exports = sendRoutes;
