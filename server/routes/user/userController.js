const { User, Blacklist, Groups } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateTokens = require('../utils/generateToken');
const { getGroupById } = require('../group/groupsController');

async function Register(req) {
  try {
    if (!req) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const { username, password, firstName, lastName, email } = req;
    if (!username || !password || !firstName || !lastName || !email) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsUser = await User.findOne({ username });
    if (existsUser) {
      return { status: false, message: 'Invalid Username!' };
    }

    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return { status: false, message: 'Invalid Email!' };
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const infoUser = {
      username,
      password: passwordHash,
      email,
      firstName,
      lastName,
      status: 'Pending',
    };

    const newUser = await User.create(infoUser);

    if (!newUser) {
      return { status: false, message: 'register fail!' };
    }
    return { status: true, message: 'register success!' };
  } catch (error) {
    return { status: false, message: error.message };
  }
}
async function Login({ username, password }) {
  try {
    if (!username || !password) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsUser = await User.findOne({ username });
    if (!existsUser) {
      return { status: false, message: 'Invalid User!' };
    }
    if (existsUser.status !== 'Active') {
      return { status: false, message: 'Invalid Credentials!' };
    }
    const match = await bcrypt.compare(password, existsUser.password);

    if (!match) {
      return { status: false, message: 'Invalid username or password!' };
    }

    const { accessToken, refreshToken } = await generateTokens({
      _id: existsUser._id,
    });
    return {
      status: true,
      message: 'login success!',
      accessToken,
      refreshToken,
      userId: existsUser._id,
      username: existsUser.username,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function Logout(userId, refreshToken) {
  try {
    const userToken = await Blacklist.findOne({ token: refreshToken });
    if (userToken) {
      return { status: false, message: 'Logged Out Sucessfully' };
    }
    await Blacklist.create({ userId: userId, token: refreshToken });
    return { status: true, message: 'Logged Out Sucessfully' };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
async function MyProfile(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Information!' };
    }
    const myProfile = await User.findOne(
      { _id: userId },
      'username createAt firstName lastName status'
    );
    if (!myProfile) {
      return { status: false, message: 'Invalid Information!' };
    }
    return { status: true, message: 'Get Profile successful!', myProfile };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function EditProfile(userId, profileInfo) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Information!' };
    }
    const editProfile = await User.updateOne(
      { _id: userId },
      { ...profileInfo }
    );
    if (!editProfile) {
      return { status: false, message: 'Invalid Information!' };
    }
    return { status: true, message: 'Update Profile successful!' };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function Activate(token) {
  try {
    await User.findOneAndUpdate(
      { emailToken: token },
      { emailToken: '', status: 'Active' }
    );
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
}
async function UpdateEmailToken(email, emailToken) {
  try {
    await User.findOneAndUpdate({ email }, { emailToken });
    return {
      status: true,
      message: 'Verify email successful!',
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function JoinGroup(userId, groupId) {
  try {
    const group = await getGroupById(groupId);
    if (!group) return { message: 'group not found' };
    let { members, owner, coowner } = group;
    members = members.map((member) => member._id.toString());
    coowner = coowner.map((coowner) => coowner._id.toString());

    if (
      owner._id.toString() === userId ||
      members.includes(userId) ||
      coowner.includes(userId)
    ) {
      return { message: 'user already been in this group' };
    }

    members.push(userId);
    await Groups.updateOne(
      { _id: groupId },
      {
        ...group,
        members,
      }
    );
    return { message: 'join success' };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function UpdateNewPassword(email, newPassword) {
  try {
    if (!email || !newPassword) {
      return { status: false, message: 'invalid infomation!' };
    }
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await User.updateOne(
      { email },
      {
        password: passwordHash,
      }
    );
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function GetUserById(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Information!' };
    }
    const user = await User.findById(userId);
    if (!user) {
      return { status: false, message: 'Not found' };
    }
    return { status: true, message: 'Get Profile successful!', user };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
module.exports = {
  Register,
  Login,
  Activate,
  Logout,
  MyProfile,
  EditProfile,
  UpdateEmailToken,
  UpdateNewPassword,
  JoinGroup,
  GetUserById,
};
