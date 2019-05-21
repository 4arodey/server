const responseHandler = require('../responseHandler');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const appConfig = require('../app.config');


function sendUserRoutes(app, router) {
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
  app.use('/api/v1/auth', router);
}


module.exports = sendUserRoutes;
