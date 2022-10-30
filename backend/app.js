const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost";
var corsOptions = {
  origin: CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/language.routes')(app);
require('./src/routes/sentence.routes')(app);
require('./src/routes/translation.routes')(app);
require('./src/routes/review.routes')(app);
require('./src/routes/alignment.routes')(app);
require('./src/routes/dataset.routes')(app);

module.exports = app;