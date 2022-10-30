const app = require("./app");
const db = require("./src/db/models");

db.sequelize.sync()
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});