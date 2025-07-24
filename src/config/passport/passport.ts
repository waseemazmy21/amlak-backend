import passport from 'passport';
import jwtStrategy from './jwtStrategy';

passport.use('jwt', jwtStrategy);
