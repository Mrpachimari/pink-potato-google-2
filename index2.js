const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['some_random_key']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '604169960417-thh2v5bofv789eo7fklkjho4u48g5j0g.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home2.html'));
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/?failure=true' }),
  (req, res) => {
    res.redirect('/?success=true');
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});











