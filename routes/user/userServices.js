const {
  Register,
  Login,
  Activate,
  Logout,
  MyProfile,
  EditProfile,
  JoinGroup,
  GetUserById,
} = require('./userController');
const {
  sendVerifyEmail,
  sendInviteEmail,
  sendEmailResetPassword,
} = require('../utils/sendEmail');

async function register(req, res) {
  try {
    const registerRes = await Register(req.body);
    res.send(registerRes);
  } catch (error) {
    throw error;
  }
}

async function login(req, res) {
  try {
    const loginRes = await Login(req.body);
    res.header('Authorization', loginRes.token).send(loginRes);
  } catch (error) {
    throw error;
  }
}
async function getHomePage(req, res) {
  try {
    await Login(req.body);
    res.send('home');
  } catch (error) {
    throw error;
  }
}

async function activateUser(req, res) {
  try {
    const { emailToken } = req.params;

    await Activate(emailToken);
    res.send({ status: true, message: 'Activate successful' });
  } catch (error) {
    res.send('Activate failed');
  }
}
async function getProfile(req, res) {
  try {
    const myProfileRes = await MyProfile(req.user._id);
    res.send(myProfileRes);
  } catch (error) {
    res.send('userService - getProfile failed');
  }
}
async function getUserById(req, res) {
  try {
    const myProfileRes = await GetUserById(req.params.id);
    res.send(myProfileRes);
  } catch (error) {
    res.send('userService - getUserById failed');
  }
}
async function editProfile(req, res) {
  try {
    const editProfileRes = await EditProfile(req.user._id, req.body);
    res.send(editProfileRes);
  } catch (error) {
    res.send('userService - editProfile failed');
  }
}
async function logout(req, res) {
  try {
    const logoutRes = await Logout(req.user._id, req.refreshToken);
    res.send(logoutRes);
  } catch (error) {
    res.send('userService - logout failed');
  }
}
async function sendVerifyEmailService(req, res) {
  try {
    const resData = await sendVerifyEmail(req.body.email);
    res.send(resData);
  } catch (error) {
    res.send('userService - sendVerifyEmail failed');
  }
}
async function sendInviteEmailService(req, res) {
  try {
    const msg = await sendInviteEmail(req.body.email, req.params.groupId);
    res.send(msg);
  } catch (error) {
    res.send('userService - sendInviteEmail failed');
  }
}
async function joinGroup(req, res) {
  try {
    const msg = await JoinGroup(req.user.id, req.params.groupId);
    console.log(msg);
    res.send(msg.message);
  } catch (error) {
    res.send('Join failed');
  }
}
async function resetPasswordService(req, res) {
  try {
    const msg = await sendEmailResetPassword(req.body.email);
    res.send(msg);
  } catch (error) {
    res.send(`Renew password failed: ${error}`);
  }
}

module.exports = {
  register,
  login,
  getHomePage,
  activateUser,
  getProfile,
  editProfile,
  logout,
  sendVerifyEmailService,
  sendInviteEmailService,
  resetPasswordService,
  joinGroup,
  getUserById,
};
