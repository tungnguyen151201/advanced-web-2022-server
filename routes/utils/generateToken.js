const jwt = require('jsonwebtoken');

async function generateTokens(payload) {
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: 60 * 60 * 24 }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: '30d' }
    );

    // const userToken = await Blacklist.findOne({ userId: user._id });
    // if (userToken) await Blacklist.remove();
    const respone = { accessToken, refreshToken };
    return respone;
  } catch (err) {
    return Promise.reject(err);
  }
}
module.exports = generateTokens;
