require('express-async-errors');
const express = require('express');
const sequelize = require('./config/connection');
const router = require('./routes');
const errorHandler = require('./utils/error-handler');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

(async function () {
  await sequelize.sync({ force: false });
  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
})();