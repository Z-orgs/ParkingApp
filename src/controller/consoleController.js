import full from "@babel/core/lib/config/full";
import pool from "../configs/connectDB";
let getAllUser = async (req, res) => {
  // pool.execute("use bcxvjyobemi2jcorkr23");
  const [rows, fields] = await pool.execute("SELECT * FROM userB");
  return res.render("console.ejs", { dataUser: rows });
};
let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  const [row, fields] = await pool.execute("select * from userB where id = ?", [
    id,
  ]);
  console.log(row);
  return res.render("detail.ejs", { dataUser: row });
};
let addNewUser = async (req, res) => {
  let { typeUser, fullName, tel, addr } = req.body;
  await pool.execute(
    "insert into userB(fullName, inDebt, coefficient, tel, addr, typeUser) values(?, ?, ?, ?, ?, ?);",
    [fullName, 0, typeUser === "Child" ? 1 : 1.3, tel, addr, typeUser]
  );
  return res.redirect("console");
};
let addNewVehicle = async (req, res) => {
  let { typeVehicle, license, id } = req.body;
  await pool.execute(
    "insert into vehicle(license, type, id) values(?, ?, ?);",
    [license, typeVehicle, id]
  );
  return res.redirect("console");
};
module.exports = {
  getAllUser,
  getDetailPage,
  addNewUser,
  addNewVehicle,
};
