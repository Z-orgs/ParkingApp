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
  return res.render("detailU.ejs", { dataUser: row });
};
let getDetailPageV = async (req, res) => {
  let id = req.params.idV;
  const [row, fields] = await pool.execute(
    "select * from vehicle where idV = ?",
    [id]
  );
  return res.render("detailV.ejs", { dataVehicle: row });
};
let addNewUser = async (req, res) => {
  let { fullName, tel, addr } = req.body;
  await pool.execute(
    "insert into userB(fullName, inDebt, tel, addr) values(?, ?, ?, ?);",
    [fullName, 0, tel, addr]
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
let addNewTurn = async (req, res) => {
  let license = req.body.license;
  const [rows, fields] = await pool.execute(
    "select * from vehicle where license = ?",
    [license]
  );
  let price =
    rows[0].type === "type1"
      ? 3000
      : rows[0].type === "type2"
      ? 5000
      : rows[0].type === "type3"
      ? 50000
      : 20000;
  const [row, field] = await pool.execute("select * from userB where id = ?", [
    rows[0].id,
  ]);
  let inDebt = row[0].inDebt;
  inDebt += price;
  await pool.execute("update userB set inDebt = ? where id = ?", [
    inDebt,
    rows[0].id,
  ]);
  return res.redirect("console");
};
let deleteVehicle = async (req, res) => {
  let idV = req.body.idV;
  await pool.execute("delete from vehicle where idV = ?", [idV]);
  return res.redirect("allVehicle");
};
let deleteUser = async (req, res) => {
  let id = req.body.id;
  await pool.execute("delete from vehicle where id = ?", [id]);
  await pool.execute("delete from userB where id = ?", [id]);
  return res.redirect("allUser");
};
let editUser = async (req, res) => {
  let id = req.params.id;
  let user = await pool.execute("select * from userB where id = ?", [id]);
  return res.render("updateU", { dataUser: user[0][0] });
};
let updateUser = async (req, res) => {
  let { typeUser, fullName, tel, addr } = req.body;
  // await pool.execute(
  //   "insert into userB(fullName, inDebt, coefficient, tel, addr, typeUser) values(?, ?, ?, ?, ?, ?);",
  //   [fullName, 0, typeUser === "Child" ? 1 : 1.3, tel, addr, typeUser]
  // );
  console.log(req.body);
  return res.redirect("allUser");
};
module.exports = {
  getAllUser,
  getDetailPageU,
  getDetailPageV,
  addNewUser,
  addNewVehicle,
  getAllVehicle,
  addNewTurn,
  deleteVehicle,
  deleteUser,
  editUser,
  updateUser,
};
