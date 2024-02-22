const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserController = {}

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: []
});
const User = mongoose.model('User', userSchema);

UserController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const user = await User.create({username, password});
        return res.status(200).json({user: user})
    }
    catch(err){
        return next({
            message: 'Error in the userController.createUser',
            log: 'Error'
        });
    }
}

UserController.verifyUser = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        res.cookie("SSID", user._id, { httpOnly: true });
        if(!user) return res.status(404).json({error: 'User not in database'});
        else if(user.password !== password) {
            res.status(404).json({error: 'User password is incorrect'})
        }
        else{
            // Return the username in the response
            return res.status(200).json({username: username});
        }
    } catch (err){
        return next({
            log: 'An Error occurred in the UserController.VerifyUser',
            status: 500,
            message: {err: 'An error occured'},
        })
    }
}

UserController.deleteUser = async(req, res, next) => {
    const { username } = req.params;
    try {
        const user = await User.findOneAndDelete({username: username});
        if(!user){
            return res.status(404).json({error: 'User not found in database'});
        }
        res.status(200).json({response: 'Operation successful'});
    } catch(error){
        return next({
            log: 'An Error occurred in UserController.deleteUser',
            status: 500,
            message: {error: 'Operation Failed'}
        })
    }
}

UserController.loggedIn = async (req, res, next) => {
  const SSID = req.cookies["SSID"];
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
module.exports = UserController;
