const express = require("express");
const axios = require("axios");
const path = require("path");

// const optionsController = require('./controllers/optionsController')
const app = express();
const PORT = process.env.PORT || 3000;

const APIKey = '&apiKey=defaa8ca6e284a7a8f4ab022633fd8f5'



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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
