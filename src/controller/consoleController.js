import full from "@babel/core/lib/config/full";
import pool from "../configs/connectDB";

let getConsolePage = async (req, res) => {
  try {
    if (req.session.loggedin) {
      const username = req.session.username;
      var user = { "username": username };
      console.log(user);
      return res.render("console", { user: user });
    } else {
      res.redirect("login");
    }
  } catch (error) {
    console.log(error);
    req.session.loggedin = false;
    req.session.username = "";
    return res.render("BUG");
  }
};
let getAllUser = async (req, res) => {
  try {
    const username = req.session.username;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM userB where Admin = ?",
      [username]
    );
    return res.render("allUser.ejs", { dataUser: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getAllVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM vehicle where Admin = ?",
      [username]
    );
    return res.render("allVehicle.ejs", { dataVehicle: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};

let getDetailPageU = async (req, res) => {
  try {
    const username = req.session.username;
    let id = req.params.userId;
    const [row, fields] = await pool.execute(
      "select * from userB where id = ? AND Admin = ?",
      [id, username]
    );
    return res.render("detailU.ejs", { dataUser: row });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getDetailPageV = async (req, res) => {
  try {
    const username = req.session.username;
    let id = req.params.idV;
    const [row, fields] = await pool.execute(
      "select * from vehicle where idV = ? AND Admin = ?",
      [id, username]
    );
    return res.render("detailV.ejs", { dataVehicle: row });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewUser = async (req, res) => {
  try {
    const username = req.session.username;
    let { fullName, tel, addr } = req.body;
    await pool.execute(
      "insert into userB(fullName, inDebt, tel, addr, Admin) values(?, ?, ?, ?, ?);",
      [fullName, 0, tel, addr, username]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    let { typeVehicle, license, id } = req.body;
    await pool.execute(
      "insert into vehicle(license, type, id, Admin) values(?, ?, ?, ?);",
      [license, typeVehicle, id, username]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let addNewTurn = async (req, res) => {
  try {
    const username = req.session.username;
    let priceType1o = await pool.execute("select priceType1 from userAdmin where userA = ?", [username]);
    var tp1 = priceType1o[0][0].priceType1;
    let priceType2o = await pool.execute("select priceType2 from userAdmin where userA = ?", [username]);
    var tp2 = priceType2o[0][0].priceType2;
    let priceType3o = await pool.execute("select priceType3 from userAdmin where userA = ?", [username]);
    var tp3 = priceType3o[0][0].priceType3;
    let priceType4o = await pool.execute("select priceType4 from userAdmin where userA = ?", [username]);
    var tp4 = priceType4o[0][0].priceType4;
    let license = req.body.license;
    const [rows, fields] = await pool.execute(
      "select * from vehicle where license = ? AND Admin = ?",
      [license, username]
    );
    let price =
      rows[0].type === "type1"
        ? tp1
        : rows[0].type === "type2"
          ? tp2
          : rows[0].type === "type3"
            ? tp3
            : tp4;
    const [row, field] = await pool.execute(
      "select * from userB where id = ? AND Admin = ?",
      [rows[0].id, username]
    );
    let inDebt = row[0].inDebt;
    inDebt += price;
    await pool.execute(
      "update userB set inDebt = ? where id = ? AND Admin = ?",
      [inDebt, rows[0].id, username]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let deleteVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    let idV = req.body.idV;
    await pool.execute("delete from vehicle where idV = ? AND Admin = ?", [
      idV,
      username,
    ]);
    return res.redirect("allVehicle");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let deleteUser = async (req, res) => {
  try {
    const username = req.session.username;
    let id = req.body.id;
    await pool.execute("delete from vehicle where id = ? AND Admin = ?", [
      id,
      username,
    ]);
    await pool.execute("delete from userB where id = ? AND Admin = ?", [
      id,
      username,
    ]);
    return res.redirect("allUser");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let editUser = async (req, res) => {
  try {
    const username = req.session.username;
    let id = req.params.id;
    let user = await pool.execute(
      "select * from userB where id = ? AND Admin = ?",
      [id, username]
    );
    return res.render("updateU", { dataUser: user[0][0] });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let updateUser = async (req, res) => {
  try {
    const username = req.session.username;
    let { id, fullName, tel, addr } = req.body;
    await pool.execute(
      "update userB set fullName = ?, tel = ?, addr = ? where id = ? AND Admin = ?",
      [fullName, tel, addr, id, username]
    );
    return res.redirect("allUser");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let editVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    let idV = req.params.idV;
    let vehicle = await pool.execute(
      "select * from vehicle where idV = ? AND Admin = ?",
      [idV, username]
    );
    return res.render("updateV", { dataVehicle: vehicle[0][0] });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let updateVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    let { idV, type, license, id } = req.body;
    await pool.execute(
      "update vehicle set license = ?, type = ?, id = ? where idV = ? AND Admin = ?",
      [license, type, id, idV, username]
    );
    return res.redirect("allVehicle");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let payment = async (req, res) => {
  try {
    const username = req.session.username;
    let { money, id } = req.body;
    let user = await pool.execute(
      "select * from userB where id = ? AND Admin = ?",
      [id, username]
    );
    let newInDebt = user[0][0].inDebt - money;
    await pool.execute(
      "update userB set inDebt = ? where id = ? AND Admin = ?",
      [newInDebt, id, username]
    );
    return res.redirect("console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let searchUser = async (req, res) => {
  try {
    const username = req.session.username;
    let name = req.body.keywordName;
    const [rows, fields] = await pool.execute(
      "select * from userB where fullName like ? AND Admin = ?",
      ["%" + name.toString() + "%", username]
    );
    return res.render("allUser", { dataUser: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let searchVehicle = async (req, res) => {
  try {
    const username = req.session.username;
    let license = req.body.keywordLicense;
    const [rows, fields] = await pool.execute(
      "select * from vehicle where license like ? AND Admin = ?",
      ["%" + license.toString() + "%", username]
    );
    return res.render("allVehicle", { dataVehicle: rows });
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let changePrice = async (req, res) => {
  try {
    const username = req.session.username;
    let { priceType1, priceType2, priceType3, priceType4 } = req.body;
    await pool.execute("update userAdmin set priceType1 = ?, priceType2 = ?, priceType3 = ?, priceType4 =? where userA = ?", [priceType1, priceType2, priceType3, priceType4, username]);
    return res.redirect("/console");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getLoginPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      res.render("./LOG/login");
    }
  } catch (error) {
    return res.redirect("login");
  }
};
let getRegPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      res.render("./REG/register");
    }
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
  changePrice,
  getConsolePage,
  getLoginPage,
  getRegPage
};
