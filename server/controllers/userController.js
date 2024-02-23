const User = require('../models/userModels.js')
const bcrypt = require('bcrypt')
const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");



const userController = {};

// Middleware to create User
userController.createUser = async (req, res, next) => {
  console.log('in beginning of userController.createUser, req.body is ', req.body);

  const { firstName, lastName, username, password } = req.body;

  // error handler
  if (!firstName || !lastName || !username || !password || !password.match(regex)) {
    return next({
        log: 'missing user registration parameters',
        message: {err: 'Error occurred in userController.createUser.'},
        status: 400,
    });
  }

  try {
    // check if Username already exist and creates an account if null
    const uniqueUsername = await User.findOne({username: username});

    if (uniqueUsername !== null) {
        return next({
            log: 'userController.createUser error. Username already exists.',
            status: 400,
            message: { err: 'username already exists'}
        });
    }

    //User schema will salt pw
    const userData = await User.create ({ firstName: firstName, lastName: lastName, username: username, password: password });
    console.log('userData: ', userData)
    res.locals.userData = userData.id;
    // console.log('res.locals.userData is ', res.locals.userData);

    return next();

} catch (err) {
    return next({
        log: `userController.createUser: ERROR ${err}`,
        status: 400,
        message: {err: 'Error occurred in controller.createUser. Check server logs for more details.'}
    });
}
}

// Middleware to verify User for Login
userController.verifyUser = async (req, res, next) => {
    console.log('in beginning of userController.verifyUser, req.body is ', req.body);

    const { username, password } = req.body;

       //input error check aka: save money $$$
       if (!username || !password) {
        return next({
            log: 'missing user login parameters',
            message: {err: 'Error occurred in userController.verifyUser.'},
            status: 400,
        });
  }
    try {
      // grab information on UserName/Password
      console.log('in the verifyUser try block')
      const user = await User.findOne({username});

      if (!user) {
        console.log('no such user found');
        return res.status(203).redirect('/signup');
      }

      //checks an encrypted password
      const result = await bcrypt.compare(password, user.password);

      if (!result) return res.redirect('/signup');
      else {
        res.locals.userInfo = user.id;
        console.log('res.locals.userInfo is ', res.locals.userInfo)

        return next();
      }

  } catch (err) {
      return next({
          log: `userController.verifyUser: ERROR ${err}`,
          status: 400,
          message: {err: 'Error occurred in controller.verifyUser. Check server logs for more details.'}
      });
  }
  }

module.exports = userController;