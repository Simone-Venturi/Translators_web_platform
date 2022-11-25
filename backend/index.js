const app = require("./app");
const db = require("./src/db/models");
const swaggerDocs = require("./src/config/swagger.config");

db.sequelize.sync()
// set port, listen for requests
const PORT = process.env.PORT || 3000;
const HOST = process.env.CORS_ORIGIN || "http://localhost";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  swaggerDocs(app, HOST, PORT);
});