const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  require("./seeders/index").runSeeders();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/language.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});