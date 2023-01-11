const nodemailer = require('nodemailer');
const generateTokens = require('./generateToken');
const {
  UpdateEmailToken,
  UpdateNewPassword,
} = require('../user/userController');
var crypto = require('crypto');

const hostname = 'http://localhost:3001';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'advancedweb2022.project@gmail.com',
    pass: 'jisykexvjiyjgsna',
  },
});

const sendVerifyEmail = async (email) => {
  const emailToken = await (await generateTokens({ email })).accessToken;
  const hash = crypto.createHash('sha256').update(emailToken).digest('hex');

  const mailOptions = {
    from: 'advancedweb2022.project@gmail.com',
    to: email,
    subject: 'Verify your account',
    html: `Please click this <a href="${hostname}/activation/${hash}">link</a> to activate your account`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      UpdateEmailToken(email, hash);
    }
  });
  return {
    status: true,
    message: 'Send email successful, Please check your email!',
  };
};

const sendInviteEmail = async (email, groupId) => {
  const mailOptions = {
    from: 'advancedweb2022.project@gmail.com',
    to: email,
    subject: 'Join a group',
    html: `Please click this <a href="http://localhost:3000/join/${groupId}">link</a> to join a group`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    return { status: true, message: 'send email successful!' };
  });
  return { status: true, message: 'send email successful!' };
};
const sendEmailResetPassword = async (email) => {
  try {
    const emailToken = await (await generateTokens({ email })).accessToken;
    const hash = crypto
      .createHash('shake256', { outputLength: 5 })
      .update(emailToken)
      .digest('hex');
    const mailOptions = {
      from: 'advancedweb2022.project@gmail.com',
      to: email,
      subject: 'Forgot Password',
      text: `Your new password: ${hash}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        UpdateNewPassword(email, hash);
      }
    });
    return {
      status: true,
      message: 'Send email successful, Please check your email!',
    };
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = {
  sendVerifyEmail,
  sendInviteEmail,
  sendEmailResetPassword,
};
