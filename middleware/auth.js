const jwt = require('jsonwebtoken');
const { User, Blacklist } = require('../models/');
async function verifyToken(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(401).send('Access Denied');
    // console.log(req.refreshToken);
    const userToken = await Blacklist.findOne({ token: token });
    // console.log(userToken);
    if (userToken) {
      return res.status(401).send('Invalid Token');
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

    const user = await User.findOne({ _id: verified._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.refreshToken = token;
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
}
async function Verifytoken(token) {
  // Check invalid token
  try {
    if (!token) return { status: false, message: 'Invalid Token' };
    // console.log(req.refreshToken);
    const userToken = await Blacklist.findOne({ token: token });
    // console.log(userToken);
    if (userToken) {
      return { status: false, message: 'Invalid Token' };
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

    const user = await User.findOne({ _id: verified._id });
    if (!user) {
      throw new Error();
    }
    return { status: true, message: 'Verify sucessful!', _id: user._id };
  } catch (err) {
    return { status: false, message: 'Invalid Token' };
  }
}
module.exports = {
  verifyToken,
  Verifytoken,
};
