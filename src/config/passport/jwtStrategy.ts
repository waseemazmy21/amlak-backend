import { Strategy, StrategyOptions } from 'passport-jwt';
import User from '../../models/user';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config()

const cookieExtractor = (req: Request): string | null => {
  return req.cookies.accessToken || null;
};

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET || "secret",
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
