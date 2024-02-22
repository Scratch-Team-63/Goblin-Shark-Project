const express = require("express");
const axios = require("axios");
const path = require("path");
const UserController = require('./UserController/UserController.js')

const mongoose = require('mongoose');

const apiController = require('./controllers/apiController.js')
const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://josuerole:Josue5573@ronalgarcia.nskkhq5.mongodb.net/?retryWrites=true&w=majority&appName=RonalGarcia'
mongoose.connect(mongoURI);                              

const userRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRouter );
userRouter.post('/signUp', UserController.createUser);
userRouter.post('/signIn', UserController.verifyUser);
// userRouter.post('/', UserController.createUser);
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/output.css", (req, res) => {
  console.log("Request for output.css received");
  res.sendFile(path.join(__dirname, "..", "client", "src", "output.css"), {});
});

app.get("/bundle.js", (req, res) => {
  console.log("Request for bundle.js received");
  res.sendFile(path.join(__dirname, "..", "client", "dist", "bundle.js"), {});
});

app.get("/", (req, res) => {
  console.log("Request for INDEX.HTML received");
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.get('/api/search/:cuisine/:distance/:budget/:latitude/:longitude', apiController.formatRequestData, (req, res) => {
  const {restaurantData} = res.locals
  console.log(restaurantData)
  return res.status(200).json(restaurantData);
});

//added so that routes would work
app.get('*', (req, res) => {
  console.log('Request for index.html recieved');
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"))
})

// app.use('*', (req,res) => {
//   res.status(404).send('Not Found');
// });

app.use((err, req, res, next) => {
  const defaultObj = {
    log:'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultObj, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


