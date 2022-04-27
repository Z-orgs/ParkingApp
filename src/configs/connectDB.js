import mysql from "mysql2/promise";
import { host, user, password, database } from "./JSON/database.json";
console.log("Connecting database...");
var pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database
});
export default pool;
