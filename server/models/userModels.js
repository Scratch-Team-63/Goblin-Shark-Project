const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10


// const MONGO_URI = 'mongodb+srv://foodForager:9j78rgBbZ8nh7vTK@foodforager.ip0lgrq.mongodb.net/'

// // Connect to MongoDB
// mongoose.connect(MONGO_URI);
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });

const userSchema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // email: String,
  // Favorites: Array
})

userSchema.pre("save", function (next) {
  //checkif pw is entered
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  })
})


const User = mongoose.model('user', userSchema);

module.exports = User;

