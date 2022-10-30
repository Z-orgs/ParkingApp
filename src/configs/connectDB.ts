import mysql from 'mysql2/promise';
import 'dotenv/config';
var pool = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.NAME,
});
export default pool;
