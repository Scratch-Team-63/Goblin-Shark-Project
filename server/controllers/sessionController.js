const Session = require('../models/sessionModels.js');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.userInfo }, (err, session) => {
    if(err) return next({
        log: 'Error occured in sessionController.startSession',
        message: {err: 'Session could not be started'},
        status: 500
    });
    else return next();
  })
}

sessionController.isLoggedIn = async (req, res, next) => {
    const { ssid } = req.cookies;

    try {
      const session = await Session.findOne({ cookieId: ssid});
      if (!session) return res.redirect('/login');
    } catch (err) {
        return next ( {
            log: 'Error occured in sessionController.isLoggedIn',
            message: {err: 'Not in Session. Please sign in'},
            status: 500
        })
    }
}

module.exports = sessionController;