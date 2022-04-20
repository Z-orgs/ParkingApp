import full from "@babel/core/lib/config/full";
import pool from "../configs/connectDB";
let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM userB;");
  return res.render("allUser.ejs", { dataUser: rows });
};
let getAllVehicle = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM vehicle;");
  return res.render("allVehicle.ejs", { dataVehicle: rows });
};
let getDetailPageU = async (req, res) => {
  let id = req.params.userId;
  const [row, fields] = await pool.execute("select * from userB where id = ?", [
    id,
  ]);
  console.log(row);
  return res.render("detailU.ejs", { dataUser: row });
};
let getDetailPageV = async (req, res) => {
  let id = req.params.idV;
  const [row, fields] = await pool.execute(
    "select * from vehicle where idV = ?",
    [id]
  );
  console.log(row);
  return res.render("detailV.ejs", { dataVehicle: row });
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
  getDetailPageU,
  getDetailPageV,
  addNewUser,
  addNewVehicle,
  getAllVehicle,
};
