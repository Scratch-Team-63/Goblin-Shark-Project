const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('FoodForager', 'test', {httpOnly: true});
    res.cookie('secret', Math.floor(Math.random() * 100).toString());
    return next();
}

cookieController.setSSIDCookie = (req, res, next) => {
    console.log("cookie controller hit")
    res.cookie('ssid', res.locals.userInfo, {httpOnly: true, secure: true});
    return next();
}

module.exports = cookieController;