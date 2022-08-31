const mysql = require("mysql");

const connectionDB = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: "",
  database: process.env.database,
});

module.exports = connectionDB