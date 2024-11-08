const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');

const connectDB = require("./mongoDb/db");

const environment = process.env.NODE_ENV || 'development';
console.log(`Node.js environment: ${environment}`);

connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
console.log('allowedOrigins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
};

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors(corsOptions));

// Routes
const directoryPath = './routes';
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = directoryPath + '/' + file;
    const routes = require(filePath);

    app.use('/api', routes);
    console.log('imported routes', filePath);
  });
});

app.get('/api/test', (req, res) => {
  res.send('GET request received');
});

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Moderate Jokes Microservice running on ${port}`);
});