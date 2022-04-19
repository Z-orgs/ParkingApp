import { query } from "../Dbconnection";

var User = {
  getAllUser: function (callback) {
    return query("Select * from user", callback);
  },
  getUserById: function (id, callback) {
    return query("select * from user where Id=?", [id], callback);
  },
  addUser: function (user, callback) {
    return query(
      "Insert into user(name,class,dob) values(?,?,?)",
      [user.name, user.class, user.dob],
      callback
    );
  },
  deleteUser: function (id, callback) {
    return query("delete from user where Id=?", [id], callback);
  },
  updateUser: function (id, user, callback) {
    return query(
      "update user set name=?,class=?,dob=? where Id=?",
      [user.name, user.class, user.dob, id],
      callback
    );
  },
};
export default User;
