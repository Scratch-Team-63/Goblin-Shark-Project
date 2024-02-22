const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserController = {};

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [],
});
const User = mongoose.model("User", userSchema);

UserController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    return res.status(200).json({ user: user });
  } catch (err) {
    return next({
      message: "Error in the userController.createUser",
      log: "Error",
    });
  }
};

UserController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) return res.status(404).json({ error: "User not in database" });
    else if(user.password !== password){
      res.status(404).json({error: 'User password is incorrect'})
     }else {
      // Return the username in the response
      res.cookie("SSID", user._id, { httpOnly: true });
      return res.status(200).json({ username: user.username });
    }
  } catch (err) {
    return next({
      log: "An Error occurred in the UserController.VerifyUser",
      status: 500,
      message: { err: "An error occured" },
    });
  }
};

UserController.loggedIn = async (req, res, next) => {
  const SSID = req.cookies["SSID"];
  console.log('SSID', SSID)
  try{
    const user = await User.findById(SSID);
    if(!user) res.redirect('/signUp');
    else return next();
  } catch(err){
    return next({
        log: "User  Not Logged in",
        status: 500,
        message: { err: "An error occured in the loggedIn function" },
      });
  }

}

UserController.deleteUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }
    res.status(200).json({ response: "Operation successful" });
  } catch (error) {
    return next({
      log: "An Error occurred in UserController.deleteUser",
      status: 500,
      message: { error: "Operation Failed" },
    });
  }
};

UserController.getFavorites = async (req, res, next) => {
  //mongoose find method to pull all objects from favorites
  console.log('req.cookies', req.cookies['SSID'])
  console.log('req.cookies.SSID', req.cookies.SSID)

  const userId = req.cookies.SSID;
  try {
    const userFavorites = await User.findById(userId);
    if (!userFavorites)
      return res.status(404).json({ error: "Nothing saved in favorites" });
    else {
      console.log("Users Favorites", userFavorites.favorites);
      res.json(userFavorites.favorites);
      return next();
    }
  } catch (err) {
    return next({
      log: "An Error occurred in the UserController.getFavorites",
      status: 500,
      message: { err: "An error occured" },
    });
  }
};

UserController.addFavorites = async (req, res, next) => {
  const userId = req.cookies.SSID;
  // const { userId, itemID } = req.body  // thiss is what is passed in the req body from our post request on the front end
  console.log('req.body',req.body);
  console.log('userId', userId)
  try {
    const userFavorites = await User.findById(userId);
    if (!userFavorites)
      return res.status(404).json({ error: "Nothing saved in favorites" });
    else {

      
      // const {} = req.body; // dont need this here i think

      const newFavorite = req.body;
      // need conditional first to make sure userFavorites.favorites doesnt already include itemId
      userFavorites.favorites.push(newFavorite);
      console.log("Added favorite", userFavorites.favorites);
      // then save userFavorites.favorites
      await userFavorites.save();
      
      //  return res.status(ok).etc or invoke next handler and take care of status message in route handler
      return next();
      // if userFavorites.favorites already has item in array
        // res.status(400) and message displaying that item already exists in the array
    }
  } catch (err) {
    return next({
      log: "An Error occurred in the UserController.getFavorites",
      status: 500,
      message: { err: "An error occured" },
    });
  }
};

module.exports = UserController;



