import mysql from "mysql2/promise";
console.log("Creating connection pool...");
var connection = mysql.createPool({
  host: "bcxvjyobemi2jcorkr23-mysql.services.clever-cloud.com",
  user: "uybxzhfo7oy1dnsu",
  password: "ckvObAChMIBZ6cYIc7T5",
  name: "bcxvjyobemi2jcorkr23",
});
export default connection;
