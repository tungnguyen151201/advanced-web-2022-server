const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('../models');
// Configure the Google strategy for use by Passport.
//

// authentication.
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const newUser = {
            googleId: profile.id,
            username: profile.displayName,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
          };
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            // console.log(user);
            done(null, user);
          }
        } catch (error) {
          throw error;
        }
      }
    )
  );
  passport.serializeUser(
    (user, done) => {
      done(null, user.id);
    }
    // where is this user.id going? Are we supposed to access this anywhere?
  );

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
