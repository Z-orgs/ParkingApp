class User {
  constructor(name, tel, add) {
    this.type = "User";
    this.name = name;
    this.tel = tel;
    this.inDebt = 0;
    this.add = add;
    this.coefficient = 0;
    this.vehicles = [];
  }
}
export default User;
