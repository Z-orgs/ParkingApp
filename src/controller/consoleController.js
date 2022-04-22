import full from "@babel/core/lib/config/full";
import pool from "../configs/connectDB";
let getAllUser = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute("SELECT * FROM userB;");
    return res.render("allUser.ejs", { dataUser: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getAllVehicle = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute("SELECT * FROM vehicle;");
    return res.render("allVehicle.ejs", { dataVehicle: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};

let getDetailPageU = async (req, res) => {
  try {
    let id = req.params.userId;
    const [row, fields] = await pool.execute(
      "select * from userB where id = ?",
      [id]
    );
    return res.render("detailU.ejs", { dataUser: row });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
    return res.render("BUG");
  }
};
let getDetailPageV = async (req, res) => {
  try {
    let id = req.params.idV;
    const [row, fields] = await pool.execute(
      "select * from vehicle where idV = ?",
      [id]
    );
    return res.render("detailV.ejs", { dataVehicle: row });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewUser = async (req, res) => {
  try {
    let { fullName, tel, addr } = req.body;
    await pool.execute(
      "insert into userB(fullName, inDebt, tel, addr) values(?, ?, ?, ?);",
      [fullName, 0, tel, addr]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewVehicle = async (req, res) => {
  try {
    let { typeVehicle, license, id } = req.body;
    await pool.execute(
      "insert into vehicle(license, type, id) values(?, ?, ?);",
      [license, typeVehicle, id]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewTurn = async (req, res) => {
  try {
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
    const [row, field] = await pool.execute(
      "select * from userB where id = ?",
      [rows[0].id]
    );
    let inDebt = row[0].inDebt;
    inDebt += price;
    await pool.execute("update userB set inDebt = ? where id = ?", [
      inDebt,
      rows[0].id,
    ]);
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let deleteVehicle = async (req, res) => {
  try {
    let idV = req.body.idV;
    await pool.execute("delete from vehicle where idV = ?", [idV]);
    return res.redirect("allVehicle");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let deleteUser = async (req, res) => {
  try {
    let id = req.body.id;
    await pool.execute("delete from vehicle where id = ?", [id]);
    await pool.execute("delete from userB where id = ?", [id]);
    return res.redirect("allUser");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await pool.execute("select * from userB where id = ?", [id]);
    return res.render("updateU", { dataUser: user[0][0] });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let updateUser = async (req, res) => {
  try {
    let { id, fullName, tel, addr } = req.body;
    await pool.execute(
      "update userB set fullName = ?, tel = ?, addr = ? where id = ?",
      [fullName, tel, addr, id]
    );
    return res.redirect("allUser");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let editVehicle = async (req, res) => {
  try {
    let idV = req.params.idV;
    let vehicle = await pool.execute("select * from vehicle where idV = ?", [
      idV,
    ]);
    return res.render("updateV", { dataVehicle: vehicle[0][0] });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let updateVehicle = async (req, res) => {
  try {
    let { idV, type, license, id } = req.body;
    await pool.execute(
      "update vehicle set license = ?, type = ?, id = ? where idV = ?",
      [license, type, id, idV]
    );
    return res.redirect("allVehicle");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let payment = async (req, res) => {
  try {
    let { money, id } = req.body;
    let user = await pool.execute("select * from userB where id = ?", [id]);
    let newInDebt = user[0][0].inDebt - money;
    await pool.execute("update userB set inDebt = ? where id = ?", [
      newInDebt,
      id,
    ]);
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let searchUser = async (req, res) => {
  try {
    let name = req.body.keywordName;
    const [rows, fields] = await pool.execute(
      "select * from userB where fullName like ?",
      ["%" + name.toString() + "%"]
    );
    return res.render("allUser", { dataUser: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let searchVehicle = async (req, res) => {
  try {
    let license = req.body.keywordLicense;
    const [rows, fields] = await pool.execute(
      "select * from vehicle where license like ?",
      ["%" + license.toString() + "%"]
    );
    return res.render("allVehicle", { dataVehicle: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
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
  editVehicle,
  updateVehicle,
  payment,
  searchUser,
  searchVehicle,
};
