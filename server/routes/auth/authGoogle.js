const express = require('express');
const router = express.Router();
const passport = require('passport');
const { callbackGoogle } = require('./authGoogleController');
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// GET /auth/google/callback'
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  (req, res) => callbackGoogle(req, res)
);
// router.get('/logout', (req, res) => logoutGoogle(req, res));
module.exports = router;
