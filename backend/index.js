const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:8080";
var corsOptions = {
  origin: CORS_ORIGIN
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({force:true}).then(() => {
  console.log('Sync DB completed');
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/language.routes')(app);
require('./routes/sentence.routes')(app);
require('./routes/translation.routes')(app);
require('./routes/review.routes')(app);
require('./routes/alignment.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});