const HTTP_CODES = require('./httpCodes');
const logger = require('./src/logger');
const filter = require('lodash');

// const DEFAULT = ['id', 'email', 'password', 'firstname', 'lastname'];

const appConfig = require('./app.config');

function handleSuccess(actionFn) {
  return (req, res, next) => {
    Promise
      .resolve(actionFn(req, res))
      .then((actionResult) => {
        res.send({
          data: actionResult,
        });
      })
      .catch(next);
  };
}

function response(actionResult) {
  return (({ lastname, firstname }) => ({ lastname, firstname }))(actionResult);
}

function postSuccess(actionFn) {
  return (req, res, next) => {
    Promise
      .resolve(actionFn(req, res))
      .then((actionResult) => {
        res.send({
          data: response(actionResult),
        });
      })
      .catch(next);
  };
}

function handleError(app) {
  app.use((err, req, res, next) => {
    if (!err) {
      next();
    }

    const errObj = {
      messsage: '',
      stackTrace: '',
      code: '',
    };
    errObj.messsage = appConfig.NODE_ENV === 'developer'
      ? err.message
      : 'Internal server error';

    errObj.stackTrace = appConfig.NODE_ENV === 'developer'
      ? err.stack
      : '';

    errObj.code = err.status;


    if (err.status === HTTP_CODES.SERVER_ERROR || err.status === HTTP_CODES.NOT_FOUND_ERR) {
      logger.error(err);
    }

    const httpErrorCode = getErrorCode(err.status);

    res.status(httpErrorCode);

    res.send(filter(errObj));
  });
}

function getErrorCode(errorStatus) {
  let result;

  switch (errorStatus) {
    case HTTP_CODES.CLIENT_ERROR:
      result = HTTP_CODES.CLIENT_ERROR;
      break;

    case HTTP_CODES.NOT_FOUND_ERR:
      result = HTTP_CODES.NOT_FOUND_ERR;
      break;

    default:
      result = HTTP_CODES.SERVER_ERROR;

  }

  return result;
}


module.exports = {
  handleSuccess,
  handleError,
  postSuccess,
};
