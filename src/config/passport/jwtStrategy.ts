import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import User from '../../models/user';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRECT || 'secret',
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err: unknown) {
    return done(err, false);
  }
});

export default jwtStrategy;
