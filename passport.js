const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const appConfig = require('./app.config');
const usersService = require('./services/users/users.service');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true,
  },
  (email, password, cb) => usersService
    .findOne({ email, password })
    .select(['id'])
    .then((user) => {
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password' });
      }
      return cb(null, user.toJSON(), { message: 'Logged in successfully' });
    })
));


passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: appConfig.JWT_SECRET,
  },
  (jwtPayload, cb) => usersService.findById(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err)),
));
