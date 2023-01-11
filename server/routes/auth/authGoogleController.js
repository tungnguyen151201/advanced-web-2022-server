const generateTokens = require('../utils/generateToken');
async function callbackGoogle(req, res) {
  const userId = req.session.passport.user;
  const { accessToken, refreshToken } = await generateTokens({
    _id: userId,
  });
  // res.redirect('http://localhost:3000/myGroup');
  res.status(200).send({
    status: true,
    message: 'login success!',
    accessToken,
    refreshToken,
  });
}

module.exports = {
  callbackGoogle,
};
