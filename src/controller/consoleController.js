import pool from "../configs/connectDB";
let getAllUser = async (req, res) => {
  // pool.execute("use bcxvjyobemi2jcorkr23");
  const [rows, fields] = await pool.execute("SELECT * FROM userB");
  return res.render("console.ejs", { dataUser: rows });
};
module.exports = {
  getAllUser,
};
