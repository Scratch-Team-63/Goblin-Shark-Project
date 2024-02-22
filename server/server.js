const express = require("express");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose")
// const bodyParser = require('body-parser');

const apiController = require('./controllers/apiController.js')
const cookieController = require('./controllers/cookieController.js')
const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = 'mongodb+srv://foodForager:9j78rgBbZ8nh7vTK@foodforager.ip0lgrq.mongodb.net/'
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});



app.use(express.json());
app.use(express.urlencoded());
// Parse URL-encoded bodies (e.g., form data)
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
// app.use(bodyParser.json());


// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/output.css", (req, res) => {
  console.log("Request for output.css received");
  res.sendFile(path.join(__dirname, "..", "client", "src", "output.css"), {});
});

app.get("/bundle.js", cookieController.setCookie, (req, res) => {
  console.log("Request for bundle.js received");
  res.sendFile(path.join(__dirname, "..", "client", "dist", "bundle.js"), {});
});



const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.get("/", (req, res) => {
  console.log("Request for INDEX.HTML received");
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.get('/api/search/:cuisine/:distance/:budget/:latitude/:longitude', apiController.formatRequestData, (req, res) => {
  const {restaurantData} = res.locals
  return res.status(200).json(restaurantData);
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  const defaultObj = {
    log:'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultObj, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);

  // expect().toHaveProperty('err')
  // response.body = {err: 'An error occurred'}
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
