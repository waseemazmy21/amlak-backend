import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
  Profile,
} from 'passport-google-oauth20';
import User from '../../models/user';

const options: StrategyOptions = {
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRECT!,
  callbackURL: '/auth/google/callback',
};

const googleStrategy = new Strategy(
  options,
  async (
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);

      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value,
      });

      return done(null, newUser);
    } catch (err) {
      return done(err as Error, false);
    }
  },
);

export default googleStrategy;
