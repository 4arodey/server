const express = require('express');
const createMiddleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const passport = require('passport');

const swaggerDocument = yaml.load('swaggerValidator.yaml');

const responseHandler = require('./responseHandler');
const appConfig = require('./app.config');

const app = express();
const router = express.Router();

const logger = require('./src/logger');

const routeBuilder = require('./routes/index.routes');


require('./passport');

createMiddleware(swaggerDocument, app, (err, middleware) => {
  app.use(passport.initialize());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.post('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.send(req.user.profile);
    });
  app.use(middleware.CORS());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  routeBuilder(app, router);


  responseHandler.handleError(app);
});


const server = app.listen(appConfig.PORT, () => {
  logger.info(`API is started. The port is ${appConfig.PORT}.`);
});

require('./comment/comment.js')(server);
