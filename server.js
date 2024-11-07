const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs=require('fs');

const environment = process.env.NODE_ENV || 'development';
console.log(`Node.js environment: ${environment}`);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

//routes
const directoryPath = './routes';
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath =directoryPath+'/'+ file;
    const routes=require(filePath);
    
    //routes middlewares
    app.use('/api', routes);
    console.log('imported routes',filePath);
  });
});

app.get('/api/test', (req, res) => {
  // Logic for handling the GET request goes here
  res.send('GET request received'); // Example response
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Submit Jokes Microservice running on ${port}`);
});


