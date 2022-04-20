import mysql from "mysql2";
var connection = mysql.createConnection({
  host: "bcxvjyobemi2jcorkr23-mysql.services.clever-cloud.com",
  user: "uybxzhfo7oy1dnsu",
  password: "ckvObAChMIBZ6cYIc7T5",
  name: "bcxvjyobemi2jcorkr23",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
export default connection;
